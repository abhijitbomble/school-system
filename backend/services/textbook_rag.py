"""
Textbook RAG Engine — FAISS + OpenAI Embeddings
================================================
Retrieval-Augmented Generation for Maharashtra SSC textbooks.

How it works:
1. On first run, loads textbook chunks from JSON
2. Embeds each chunk using OpenAI text-embedding-3-small
3. Stores vectors in a local FAISS index (persisted to disk)
4. On query, embeds the question and finds top-K similar chunks
5. Returns the most relevant textbook content to inject into the prompt

FAISS runs entirely locally — no cloud DB costs.
"""

import json
import numpy as np
import faiss
from pathlib import Path
from openai import OpenAI
from core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

# Paths
DATA_DIR = Path(__file__).parent.parent / "data" / "textbooks"
CHUNKS_PATH = DATA_DIR / "ssc_chapters.json"
INDEX_PATH = DATA_DIR / "faiss_index.bin"
META_PATH = DATA_DIR / "faiss_meta.json"

# Embedding model
EMBED_MODEL = "text-embedding-3-small"
EMBED_DIM = 1536  # Dimension for text-embedding-3-small


def _get_embedding(text: str) -> list:
    """Get embedding vector for a single text string."""
    response = client.embeddings.create(
        model=EMBED_MODEL,
        input=text
    )
    return response.data[0].embedding


def _get_embeddings_batch(texts: list) -> list:
    """Get embedding vectors for a batch of texts (more efficient)."""
    response = client.embeddings.create(
        model=EMBED_MODEL,
        input=texts
    )
    return [d.embedding for d in response.data]


def build_index(force_rebuild: bool = False) -> tuple:
    """
    Builds (or loads) the FAISS index from textbook chunks.
    
    Returns:
        (faiss.Index, list[dict]) — the index and the chunk metadata
    """
    # If index exists and no force rebuild, load it
    if INDEX_PATH.exists() and META_PATH.exists() and not force_rebuild:
        print("[RAG] Loading existing FAISS index...")
        index = faiss.read_index(str(INDEX_PATH))
        metadata = json.loads(META_PATH.read_text(encoding="utf-8"))
        print(f"[RAG] Loaded index with {index.ntotal} vectors")
        return index, metadata

    # Otherwise, build from scratch
    print("[RAG] Building FAISS index from textbook chunks...")
    
    if not CHUNKS_PATH.exists():
        print("[RAG] ERROR: No textbook data found at", CHUNKS_PATH)
        return None, []

    chunks = json.loads(CHUNKS_PATH.read_text(encoding="utf-8"))
    
    # Prepare texts for embedding
    texts = []
    metadata = []
    for chunk in chunks:
        # Combine fields into a searchable text
        search_text = f"{chunk['subject']} - {chunk['chapter']} - {chunk['topic']}: {chunk['content']}"
        texts.append(search_text)
        metadata.append({
            "subject": chunk["subject"],
            "chapter": chunk["chapter"],
            "standard": chunk["standard"],
            "topic": chunk["topic"],
            "content": chunk["content"],
        })

    # Embed all chunks in one batch
    print(f"[RAG] Embedding {len(texts)} chunks...")
    embeddings = _get_embeddings_batch(texts)
    
    # Convert to numpy array
    vectors = np.array(embeddings, dtype="float32")
    
    # Build FAISS index (L2 distance)
    index = faiss.IndexFlatL2(EMBED_DIM)
    index.add(vectors)
    
    # Save to disk
    faiss.write_index(index, str(INDEX_PATH))
    META_PATH.write_text(json.dumps(metadata, indent=2, ensure_ascii=False), encoding="utf-8")
    
    print(f"[RAG] Index built and saved: {index.ntotal} vectors")
    return index, metadata


def search(query: str, top_k: int = 3) -> list:
    """
    Search the textbook index for chunks relevant to the query.
    
    Args:
        query: The student's question
        top_k: Number of results to return
    
    Returns:
        List of dicts with keys: subject, chapter, topic, content, score
    """
    index, metadata = build_index()
    
    if index is None or index.ntotal == 0:
        print("[RAG] No index available")
        return []

    # Embed the query
    query_vector = np.array([_get_embedding(query)], dtype="float32")
    
    # Search
    distances, indices = index.search(query_vector, top_k)
    
    results = []
    for i, idx in enumerate(indices[0]):
        if idx < len(metadata) and idx >= 0:
            result = metadata[idx].copy()
            result["score"] = float(distances[0][i])
            results.append(result)
    
    return results


def get_relevant_context(query: str, top_k: int = 3) -> str:
    """
    Returns a formatted string of relevant textbook content
    ready to be injected into the LLM system prompt.
    
    This is what the agent orchestrator calls.
    """
    results = search(query, top_k)
    
    if not results:
        return ""
    
    context_parts = ["RELEVANT TEXTBOOK CONTENT (Use this to ground your explanation):"]
    
    for i, r in enumerate(results, 1):
        context_parts.append(
            f"\n📖 Source {i}: {r['subject']} — {r['chapter']} — {r['topic']} ({r['standard']})\n"
            f"{r['content']}"
        )
    
    return "\n".join(context_parts)


# Pre-build index on module load (lazy — only builds once)
_index_cache = None
_meta_cache = None

def _ensure_index():
    """Lazy initialization of the FAISS index."""
    global _index_cache, _meta_cache
    if _index_cache is None:
        _index_cache, _meta_cache = build_index()
    return _index_cache, _meta_cache
