import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Download,
  Filter,
  MoreVertical,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

const docRequests = [
  { id: 'REQ001', student: 'Aryan Kulkarni', type: 'Bonafide Certificate', status: 'Pending', date: '2026-04-10', library: 'Clear', accounts: 'Clear' },
  { id: 'REQ002', student: 'Suhani Deshpande', type: 'Transfer Certificate (TC)', status: 'Pending Approval', date: '2026-04-11', library: 'Pending (2 books)', accounts: 'Clear' },
  { id: 'REQ003', student: 'Rohan Mane', type: 'Migration Certificate', status: 'Approved', date: '2026-04-08', library: 'Clear', accounts: 'Clear' },
  { id: 'REQ004', student: 'Ishita Patil', type: 'Bonafide Certificate', status: 'Pending', date: '2026-04-11', library: 'Clear', accounts: 'Pending (₹1,500)' },
];

const Documents = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText color="var(--primary)" />
            Document Approvals
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Review and issue official school certificates and documents.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{
            backgroundColor: 'var(--bg-sidebar)',
            color: 'var(--text-primary)',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 500
          }}>
            <Download size={18} /> Export List
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem' }}>
        {/* Left: Filters & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Request Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    backgroundColor: filter === f ? 'var(--primary)' : 'transparent',
                    color: filter === f ? 'white' : 'var(--text-secondary)',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                  {f === 'Pending' && <span style={{ backgroundColor: 'var(--error)', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>4</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--warning)' }}>
              <AlertTriangle size={18} />
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Clearance Alerts</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              2 Transfer Certificate requests are pending due to outstanding library books or fee dues.
            </p>
          </div>
        </div>

        {/* Right: Request Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search by student name or request ID..." 
              style={{
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-sidebar)',
                color: 'var(--text-primary)',
                width: '100%'
              }}
            />
          </div>

          <div className="card" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem' }}>Request Info</th>
                  <th style={{ padding: '1rem' }}>Student Name</th>
                  <th style={{ padding: '1rem' }}>Clearance Status</th>
                  <th style={{ padding: '1rem' }}>Request Date</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {docRequests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="glass-hover">
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{req.type}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {req.id}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 500 }}>{req.student}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                          {req.library === 'Clear' ? <CheckCircle2 size={12} color="var(--success)" /> : <Clock size={12} color="var(--warning)" />}
                          <span style={{ color: req.library === 'Clear' ? 'var(--text-muted)' : 'var(--warning)' }}>Library: {req.library}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                          {req.accounts === 'Clear' ? <CheckCircle2 size={12} color="var(--success)" /> : <Clock size={12} color="var(--warning)" />}
                          <span style={{ color: req.accounts === 'Clear' ? 'var(--text-muted)' : 'var(--warning)' }}>Accounts: {req.accounts}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {req.date}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-info" style={{ 
                        backgroundColor: req.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                        color: req.status === 'Approved' ? 'var(--success)' : 'var(--info)'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button title="Approve & Sign" style={{ 
                          padding: '8px', 
                          borderRadius: '8px', 
                          background: 'rgba(59, 130, 246, 0.1)', 
                          color: 'var(--primary)',
                          border: 'none',
                          cursor: 'pointer'
                        }}>
                          <ShieldCheck size={18} />
                        </button>
                        <button title="Reject" style={{ 
                          padding: '8px', 
                          borderRadius: '8px', 
                          background: 'rgba(239, 68, 68, 0.1)', 
                          color: 'var(--error)',
                          border: 'none',
                          cursor: 'pointer'
                        }}>
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ 
            marginTop: '0.5rem',
            padding: '1.25rem',
            borderRadius: '16px',
            backgroundColor: 'var(--bg-sidebar)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Quick Tip</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You can batch-approve Bonafide requests for students with full clearance.</div>
              </div>
            </div>
            <button style={{ 
              backgroundColor: 'var(--primary)', 
              color: 'white', 
              padding: '0.6rem 1.25rem', 
              borderRadius: '10px', 
              fontSize: '0.85rem', 
              fontWeight: 600,
              border: 'none'
            }}>
              Batch Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
