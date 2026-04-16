import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Initializing mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#2563eb',
    lineColor: '#94a3b8',
    secondaryColor: '#f8fafc',
    tertiaryColor: '#fff'
  }
});

const DynamicWhiteboard = ({ moments, currentMomentIndex }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    // Re-initialize mermaid for all diagrams on the board
    mermaid.init(undefined, ".mermaid");
  }, [currentMomentIndex, moments]);

  if (!moments || moments.length === 0) return null;

  // We want to show all moments processed so far
  const activeMoments = moments.slice(0, currentMomentIndex + 1);

  return (
    <div className="dynamic-whiteboard" style={{ width: '100%', padding: '0 8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px dashed var(--border)', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--muted)', letterSpacing: '0.1em', margin: 0 }}>LIVE TEACHING BOARD</h3>
        <div style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 700, background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '12px' }}>SYNCED SESSION</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {activeMoments.map((moment, idx) => (
          <div key={idx} className={`teaching-moment-enter`} style={{ 
            animation: 'fadeIn 0.6s ease-out forwards',
            borderLeft: '2px solid var(--primary-light)',
            paddingLeft: '24px',
            position: 'relative'
          }}>
            {/* Connector Dot */}
            <div style={{ position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', border: '2px solid #fff' }} />

            {moment.visual_action === 'TEXT' && (
              <div style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.6, fontWeight: 500 }}>
                 {Array.isArray(moment.visual_content) ? (
                   <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'circle' }}>
                     {moment.visual_content.map((point, i) => <li key={i} style={{ marginBottom: '8px' }}>{point}</li>)}
                   </ul>
                 ) : moment.visual_content}
              </div>
            )}

            {moment.visual_action === 'MATH' && (
              <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)', margin: '12px 0' }}>
                <div style={{ fontSize: '22px', color: 'var(--primary)' }}>
                  <BlockMath math={moment.visual_content} />
                </div>
              </div>
            )}

            {moment.visual_action === 'DIAGRAM' && (
              <div className="mermaid" ref={mermaidRef} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1.5px solid var(--border)', overflowX: 'auto', boxShadow: 'var(--shadow-sm)', margin: '12px 0' }}>
                {moment.visual_content}
              </div>
            )}

            {moment.visual_action === 'IMAGE' && (
              <div style={{ margin: '16px 0', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-md)', background: '#fff' }}>
                <img 
                  src={moment.visual_content} 
                  alt="Textbook Illustration" 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div style={{ padding: '12px', fontSize: '12px', color: 'var(--muted)', textAlign: 'center', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
                   HIGH FIDELITY VISUAL REFERENCE
                </div>
              </div>
            )}

            {moment.visual_action === 'ANIMATION' && moment.visual_content && (
              <div style={{ margin: '16px 0', background: 'var(--surface)', borderRadius: '16px', border: '1.5px solid var(--primary-light)', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                <div 
                  dangerouslySetInnerHTML={{ __html: moment.visual_content }} 
                  style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mermaid svg {
          max-width: 100% !important;
          height: auto !important;
        }
      `}</style>
    </div>
  );
};

export default DynamicWhiteboard;
