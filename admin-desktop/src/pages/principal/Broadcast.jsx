import React, { useState } from 'react';
import { 
  Send, 
  Users, 
  UserCircle, 
  Layers, 
  History, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Paperclip
} from 'lucide-react';

const broadcastHistory = [
  { id: 1, title: 'Annual Day Postponed', target: 'All Students & Staff', time: '2h ago', status: 'Delivered', sentTo: 1350 },
  { id: 2, title: 'Teacher Training Workshop', target: 'All Teachers', time: 'Yesterday', status: 'Delivered', sentTo: 86 },
  { id: 3, title: 'Std 10 Preliminary Schedule', target: 'Std 10 Students', time: '2 days ago', status: 'Delivered', sentTo: 185 },
];

const Broadcast = () => {
  const [targetType, setTargetType] = useState('all'); // 'all', 'classes', 'teachers'
  const [msgType, setMsgType] = useState('Notice');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Send color="var(--primary)" />
            Broadcast Center
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Send instant notices or alerts to the entire school community.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Left: Compose Broadcast */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Notice', 'Urgent Alert', 'Event', 'Holiday'].map(type => (
              <button 
                key={type}
                onClick={() => setMsgType(type)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  backgroundColor: msgType === type ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                  color: msgType === type ? 'white' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Broadcast Title</label>
              <input 
                type="text" 
                placeholder="e.g., Change in School Timings"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Message Content</label>
              <textarea 
                placeholder="Type your message here..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  color: 'var(--text-primary)',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
                <ImageIcon size={18} /> Add Image
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
                <Paperclip size={18} /> Attach File
              </button>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'none' }}>Save Draft</button>
            <button style={{ 
              padding: '0.75rem 2rem', 
              borderRadius: '12px', 
              backgroundColor: 'var(--primary)', 
              color: 'white', 
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Send size={18} /> Send Now
            </button>
          </div>
        </div>

        {/* Right: Target Selection & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Select Recipients</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  border: `1px solid ${targetType === 'all' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: targetType === 'all' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}
                onClick={() => setTargetType('all')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Layers size={18} color={targetType === 'all' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>All Students & Staff</span>
                </div>
              </div>

              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  border: `1px solid ${targetType === 'classes' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: targetType === 'classes' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}
                onClick={() => setTargetType('classes')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Users size={18} color={targetType === 'classes' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Select Classes</span>
                </div>
                {targetType === 'classes' && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['10A', '10B', '9A', '9B'].map(c => (
                      <span key={c} style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'var(--primary)', borderRadius: '4px' }}>{c}</span>
                    ))}
                  </div>
                )}
              </div>

              <div 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  border: `1px solid ${targetType === 'teachers' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: targetType === 'teachers' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}
                onClick={() => setTargetType('teachers')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <UserCircle size={18} color={targetType === 'teachers' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Select Teachers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <History size={18} color="var(--primary)" />
              Sent History
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {broadcastHistory.map(item => (
                <div key={item.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>{item.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{item.target} • {item.sentTo} users</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;
