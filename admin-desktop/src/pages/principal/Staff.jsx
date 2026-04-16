import React, { useState } from 'react';
import { 
  UserCircle, 
  Search, 
  UserPlus, 
  Shield, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  BookOpen
} from 'lucide-react';

const staffMembers = [
  { id: 'T001', name: 'Mrs. S. Sharma', subject: 'Mathematics', role: 'Class Teacher (10A)', status: 'Active', workload: 22 },
  { id: 'T002', name: 'Mr. R. Joshi', subject: 'Science', role: 'HOD Science', status: 'Active', workload: 18 },
  { id: 'T003', name: 'Ms. A. Patil', subject: 'English', role: 'Staff', status: 'On Leave', workload: 20 },
  { id: 'T004', name: 'Mr. V. Deshmukh', subject: 'Social Studies', role: 'Exam Head', status: 'Active', workload: 24 },
  { id: 'T005', name: 'Mrs. P. Kulkarni', subject: 'Marathi', role: 'Class Teacher (8A)', status: 'Active', workload: 21 },
];

const Staff = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <UserCircle color="var(--primary)" />
            Staff & Teacher Management
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>Manage teacher roles, monitoring schedules, and onboarding.</p>
        </div>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '0.75rem 1.25rem',
          borderRadius: '12px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
        }}>
          <UserPlus size={18} /> Add Teacher
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1.5rem' }}>
        {/* Left: Quick Stats & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Staff Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Staff</span>
                <span style={{ fontWeight: 700 }}>86</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Present Today</span>
                <span style={{ fontWeight: 700, color: 'var(--success)' }}>82</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>On Leave</span>
                <span style={{ fontWeight: 700, color: 'var(--warning)' }}>4</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Teacher Permissions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Class Teachers', 'Exam Admins', 'Clerical Staff', 'Subject Heads'].map((role, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '0.85rem' }}>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Staff Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search by name, subject, or ID..." 
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
                  <th style={{ padding: '1rem' }}>Teacher</th>
                  <th style={{ padding: '1rem' }}>Subject & Role</th>
                  <th style={{ padding: '1rem' }}>Workload</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Permissions</th>
                  <th style={{ padding: '1rem' }}></th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map(staff => (
                  <tr key={staff.id} style={{ borderBottom: '1px solid var(--border-color)' }} className="glass-hover">
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{staff.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {staff.id}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{staff.subject}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{staff.role}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '40px', height: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                          <div style={{ width: `${(staff.workload / 30) * 100}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.75rem' }}>{staff.workload} hrs/wk</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge ${staff.status === 'Active' ? 'badge-info' : 'badge-error'}`} style={{ 
                        backgroundColor: staff.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: staff.status === 'Active' ? 'var(--success)' : 'var(--error)'
                      }}>
                        {staff.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Shield size={18} />
                      </button>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button style={{ background: 'none', color: 'var(--text-muted)' }}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Teacher Schedule Monitoring */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--primary)" />
              Today's Live Monitoring
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { time: '10:00 - 10:45', teacher: 'Mrs. Sharma', class: '10A', status: 'In Class' },
                { time: '10:00 - 10:45', teacher: 'Mr. Joshi', class: '10B', status: 'In Class' },
                { time: '10:00 - 10:45', teacher: 'Ms. Patil', class: '8C', status: 'Free' },
                { time: '10:00 - 10:45', teacher: 'Mr. Deshmukh', class: '9A', status: 'In Class' },
              ].map((slot, i) => (
                <div key={i} style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(255,255,255,0.02)', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{slot.time}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{slot.teacher}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Class {slot.class}</div>
                  </div>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    padding: '2px 8px', 
                    borderRadius: '4px',
                    fontWeight: 700,
                    backgroundColor: slot.status === 'In Class' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.05)',
                    color: slot.status === 'In Class' ? 'var(--primary)' : 'var(--text-muted)'
                  }}>
                    {slot.status}
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

export default Staff;
