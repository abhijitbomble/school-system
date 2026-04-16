import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceTrends = {
  Today: [
    { time: '8AM', val: 92 }, { time: '10AM', val: 96 }, { time: '12PM', val: 94 }, { time: '2PM', val: 91 }
  ],
  Week: [
    { time: 'Mon', val: 94 }, { time: 'Tue', val: 92 }, { time: 'Wed', val: 96 }, { time: 'Thu', val: 95 }, { time: 'Fri', val: 94 }
  ],
  Month: [
    { time: 'W1', val: 91 }, { time: 'W2', val: 94 }, { time: 'W3', val: 93 }, { time: 'W4', val: 95 }
  ]
};

const PrincipalHome = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');
  
  return (
    <>
      {/* Header - High Fidelity (Image 2 Pattern) */}
      <div className="home-header">
        <div className="home-header-avatar">RP</div>
        <div className="home-header-greeting">Good afternoon, Principal</div>
        <div className="home-header-name">Rajesh Patil</div>
        <div className="home-header-meta">
          <span className="home-header-badge">Leadership Mode</span>
          <span className="home-header-badge">Academic Year 2026-27</span>
        </div>
        <div className="home-header-tagline">School performance is currently at 94%. Keep it up!</div>
      </div>

      {/* Today's School Overview */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Live Class Monitor</span>
          <span className="section-tag">Period 4 · Now</span>
          <button className="section-link" onClick={() => navigate('/principal/classes')}>View all</button>
        </div>
      </div>

      {/* Live Classes Row - High Fidelity (Image 1 Pattern) */}
      <div className="timetable-scroll">
        {[
          { id: 1, class: '10A', subject: 'Math', teacher: 'Mrs. Sharma', status: 'in-progress' },
          { id: 2, class: '10B', subject: 'Sci', teacher: 'Mr. Joshi', status: 'normal' },
          { id: 3, class: '9A',  subject: 'Eng', teacher: 'Ms. Patil', status: 'normal' },
          { id: 4, class: '8C',  subject: 'His', teacher: 'Mr. Desai', status: 'normal' },
        ].map(lc => {
          const active = lc.status === 'in-progress';
          return (
            <div key={lc.id} className={`period-mini-card ${active ? 'active-period' : ''}`}
                 onClick={() => navigate('/principal/classes')}>
              <div className="period-mini-icon" style={{ background: active ? 'transparent' : 'var(--bg)' }}>
                {lc.subject === 'Math' ? '🔢' : lc.subject === 'Sci' ? '🧪' : '📖'}
              </div>
              <div className="period-mini-name">Std {lc.class}</div>
              <div className="period-mini-time">{lc.teacher}</div>
              {active && <div className="period-mini-now">LIVE</div>}
            </div>
          );
        })}
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-title">School Attendance Trends</span>
        </div>
      </div>

      {/* Time Filters - Shared UI pattern */}
      <div className="filter-tabs">
        {['Today', 'Week', 'Month'].map(f => (
          <button 
            key={f} 
            className={`filter-tab ${timeFilter === f ? 'active' : ''}`}
            onClick={() => setTimeFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Simple Attendance Chart */}
      <div style={{ padding: '0 var(--sp-5)', height: '140px', marginBottom: 'var(--sp-4)' }}>
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-3)', border: '1.5px solid var(--border)', height: '100%', boxSizing: 'border-box' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={attendanceTrends[timeFilter]}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="val" stroke="var(--primary)" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Grid - High Fidelity (Image 2 Pattern) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-dot" />
          <div className="stat-card-icon" style={{ background: 'var(--teal-light)' }}>👥</div>
          <div className="stat-card-value" style={{ color: 'var(--teal)' }}>
            {timeFilter === 'Today' ? '94%' : timeFilter === 'Week' ? '93.5%' : '94.2%'}
          </div>
          <div className="stat-card-label">Avg. Attendance</div>
          <div className="stat-card-sub">{timeFilter.toLowerCase()} status</div>
        </div>
        <div className="stat-card" onClick={() => navigate('/principal/staff')}>
          <div className="stat-card-icon" style={{ background: 'var(--orange-light)' }}>🧑‍🏫</div>
          <div className="stat-card-value" style={{ color: 'var(--orange)' }}>82/86</div>
          <div className="stat-card-label">Staff Present</div>
          <div className="stat-card-sub">4 on leave</div>
        </div>
      </div>

      <div className="gap-section" />

      {/* Actionable Alerts - High Fidelity (Image 2/5 Pattern) */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Urgent Actions</span>
        </div>
      </div>

      <div className="hw-list" style={{ paddingBottom: '20px' }}>
        <div className="hw-card overdue" onClick={() => navigate('/principal/documents')}>
          <div className="hw-card-icon" style={{ background: 'var(--red-light)' }}>⚠️</div>
          <div className="hw-card-body">
            <div className="hw-card-title">Pending Document Clearances</div>
            <div className="hw-card-tags">
              <span className="hw-tag" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>URGENT</span>
              <span className="hw-tag" style={{ background: 'var(--bg)', color: 'var(--muted)' }}>4 Students</span>
            </div>
            <div className="hw-card-due overdue-text">
              <Clock size={12} /> Awaiting principal signature
            </div>
          </div>
          <ChevronRight size={18} color="var(--muted)" />
        </div>

        <div className="hw-card pending" style={{ marginTop: '12px' }}>
          <div className="hw-card-icon" style={{ background: 'var(--amber-light)' }}>💼</div>
          <div className="hw-card-body">
            <div className="hw-card-title">Staff Shift Substitution</div>
            <div className="hw-card-tags">
              <span className="hw-tag" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>PENDING</span>
            </div>
            <div className="hw-card-due">
              <ShieldCheck size={12} /> Auto-substitution failed for 10B
            </div>
          </div>
          <ChevronRight size={18} color="var(--muted)" />
        </div>
      </div>
    </>
  );
};

export default PrincipalHome;
