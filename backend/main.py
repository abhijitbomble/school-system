from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

app = FastAPI(title="EduSync MultiModal AI Backend")

# Allow React Frontend (running on localhost:5173 / 5174) to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include AI Routers
from api.routes import student_chat, student_voice, student_proactive

app.include_router(student_chat.router, prefix="/api/student/edututor", tags=["Student AI Chat"])
app.include_router(student_voice.router, prefix="/api/student/edututor", tags=["Student AI Voice"])
app.include_router(student_proactive.router, prefix="/api/student/edututor", tags=["Student AI Proactive"])

@app.get("/")
async def root():
    return {"message": "EduSync AI Backend is running."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
