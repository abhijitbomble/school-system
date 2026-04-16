import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  UserPlus, 
  Info, 
  Send, 
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Trash2,
  ArrowLeftRight,
  Mail,
  Phone,
  BarChart2,
  Calendar,
  MoreVertical,
  X
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const BackButton = ({ onClick }) => (
  <button className="page-header-back" onClick={onClick}>
    <ChevronLeft size={20} />
  </button>
);

// --- Mock Data ---
const classList = [
  { id: '10A', teacher: 'Mrs. S. Sharma', room: 'Room 302', students: 42, performance: '92%' },
  { id: '10B', teacher: 'Mr. R. Joshi', room: 'Lab 2', students: 40, performance: '88%' },
  { id: '9A',  teacher: 'Ms. A. Patil', room: 'Room 201', students: 45, performance: '74%' },
];

const studentList = [
  { id: 'ST001', name: 'Aryan Kulkarni', roll: 12, attendance: '96%', grade: 'A+', recent: '92%' },
  { id: 'ST002', name: 'Suhani Deshpande', roll: 25, attendance: '92%', grade: 'A', recent: '88%' },
  { id: 'ST003', name: 'Rohan Mane', roll: 8, attendance: '88%', grade: 'B+', recent: '85%' },
];

const performanceData = [
  { subject: 'Math', val: 85 }, { subject: 'Sci', val: 78 }, { subject: 'Eng', val: 92 },
  { subject: 'His', val: 88 }, { subject: 'Mar', val: 95 },
];

const staffList = [
  { id: 'EMP102', name: 'Mrs. Sunita Sharma', role: 'Sr. Teacher', status: 'In Class (10A)', color: 'green' },
  { id: 'EMP088', name: 'Mr. Rahul Joshi', role: 'Head of Science', status: 'In Class (10B)', color: 'green' },
  { id: 'EMP145', name: 'Ms. Anjali Patil', role: 'Marathi Teacher', status: 'On Leave', color: 'red' },
];

// --- Sub-Module: Classes ---
export const Classes = () => {
  const [view, setView] = useState('classes'); // 'classes', 'students', 'profile'
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  if (view === 'profile' && selectedStudent) {
    return (
      <>
        <div className="page-header">
          <BackButton onClick={() => setView('students')} />
          <h1 className="page-header-title">Student Profile</h1>
        </div>
        
        <div className="results-header-card">
          <div className="results-header-meta">Roll No: {selectedStudent.roll} • Std {selectedClass.id}</div>
          <div className="results-header-title">{selectedStudent.name}</div>
          <div className="results-stats">
            <div>
              <div className="results-stat-val">{selectedStudent.attendance}</div>
              <div className="results-stat-label">Attendance</div>
            </div>
            <div>
              <div className="results-stat-val">{selectedStudent.grade}</div>
              <div className="results-stat-label">Current Grade</div>
            </div>
          </div>
          <div className="results-progress"><div className="results-progress-fill" style={{ width: '92%' }}></div></div>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>Performing better than 88% of same-grade students.</div>
        </div>

        <div className="section">
          <div className="section-header"><span className="section-title">Academic Strength</span></div>
          <div style={{ height: '220px', background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-2)', border: '1.5px solid var(--border)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-2)', fontSize: 10 }} />
                <Radar name="Performance" dataKey="val" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="section">
          <div className="section-header"><span className="section-title">Attendance Trend (6 Months)</span></div>
          <div style={{ height: '140px', background: 'var(--surface)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-2)', border: '1.5px solid var(--border)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{m:'Jun',v:98},{m:'Jul',v:95},{m:'Aug',v:92},{m:'Sep',v:88},{m:'Oct',v:94},{m:'Nov',v:96}]}>
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" fill="var(--primary-light)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="gap-section" />
      </>
    );
  }

  if (view === 'students' && selectedClass) {
    return (
      <>
        <div className="page-header">
          <BackButton onClick={() => setView('classes')} />
          <h1 className="page-header-title">{selectedClass.id} Students</h1>
          <button className="page-header-action"><UserPlus size={18} /></button>
        </div>
        
        <div style={{ padding: '0 var(--sp-5) var(--sp-4)' }}>
          <div className="form-field">
            <input type="text" placeholder="Filter student list..." />
          </div>
        </div>

        <div className="hw-list">
          {studentList.map(s => (
            <div key={s.id} className="hw-card pending" onClick={() => { setSelectedStudent(s); setView('profile'); }}>
              <div className="student-att-avatar" style={{ background: 'var(--bg)' }}>{s.name[0]}</div>
              <div className="hw-card-body">
                <div className="hw-card-title">{s.name}</div>
                <div className="hw-card-due">
                  Roll: {s.roll} • Att: <span style={{ color: 'var(--green)', fontWeight: 700 }}>{s.attendance}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignSelf: 'center' }}>
                <button className="page-header-back" style={{ width: 32, height: 32, background: 'var(--bg)' }} onClick={(e) => { e.stopPropagation(); /* transfer logic */ }}>
                  <ArrowLeftRight size={14} color="var(--primary)" />
                </button>
                <button className="page-header-back" style={{ width: 32, height: 32, background: 'var(--red-light)' }} onClick={(e) => { e.stopPropagation(); /* remove logic */ }}>
                  <Trash2 size={14} color="var(--red)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <BackButton onClick={() => navigate('/principal/home')} />
        <h1 className="page-header-title">Class Analytics</h1>
        <button className="page-header-action"><Search size={18} /></button>
      </div>

      <div className="periods-list">
        {classList.map(c => (
          <div key={c.id} className="period-card" onClick={() => { setSelectedClass(c); setView('students'); }}>
            <div className="period-num-col">
              <div className="period-num-circle">{c.id}</div>
              <div className="period-time">{c.students}<br/>Students</div>
            </div>
            <div className="period-divider" />
            <div className="period-body">
              <div className="period-subject-row"><span className="period-subj-name">{c.teacher}</span></div>
              <div className="period-meta-row">
                <span className="period-meta-item"><Info size={12} /> {c.room}</span>
                <span className="period-meta-item"><TrendingUp size={12} /> {c.performance} avg.</span>
              </div>
            </div>
            <ChevronRight size={18} color="var(--muted)" />
          </div>
        ))}
      </div>
    </>
  );
};

// --- Sub-Module: Staff ---
export const Staff = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [view, setView] = useState('list');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const navigate = useNavigate();

  if (view === 'detail' && selectedStaff) {
    return (
      <>
        <div className="page-header">
          <BackButton onClick={() => setView('list')} />
          <h1 className="page-header-title">Staff Detail</h1>
        </div>
        
        <div className="section">
          <div className="hw-card" style={{ borderLeft: 'none', background: 'var(--primary)', color: '#fff' }}>
             <div className="student-att-avatar" style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>{selectedStaff.name[0]}</div>
             <div className="hw-card-body" style={{ marginLeft: '12px' }}>
                <div className="hw-card-title" style={{ fontSize: '18px' }}>{selectedStaff.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>{selectedStaff.role} • {selectedStaff.id}</div>
             </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header"><span className="section-title">Today's Schedule</span></div>
          <div className="periods-list">
            {[
              { time: '08:00 - 08:50', class: '10A', sub: 'Math' },
              { time: '09:00 - 09:50', class: '10B', sub: 'Math' },
              { time: '11:00 - 11:50', class: '9A', sub: 'Calculus' },
            ].map((p, i) => (
              <div key={i} className="list-item-card" style={{ marginBottom: '8px' }}>
                <div className="item-details">
                  <span className="item-name">{p.sub} - Std {p.class}</span>
                  <span className="item-subtext">{p.time}</span>
                </div>
                <Clock size={16} color="var(--muted)" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <BackButton onClick={() => navigate('/principal/home')} />
        <h1 className="page-header-title">Staff Directory</h1>
        <button className="page-header-action"><UserPlus size={18} /></button>
      </div>

      <div className="filter-tabs">
        {['All', 'In Class', 'On Leave'].map(f => (
          <button key={f} className={`filter-tab ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="hw-list">
        {staffList.filter(s => activeFilter === 'All' || s.status.includes(activeFilter)).map((s, i) => (
          <div key={i} className="hw-card" style={{ borderLeftColor: `var(--${s.color})` }} onClick={() => { setSelectedStaff(s); setView('detail'); }}>
            <div className="student-att-avatar" style={{ width: 44, height: 44 }}>{s.name[0]}</div>
            <div className="hw-card-body">
              <div className="hw-card-title">{s.name}</div>
              <div className="hw-card-tags">
                <span className="hw-tag" style={{ background: 'var(--bg)', color: 'var(--text-2)' }}>{s.role}</span>
              </div>
              <div className="hw-card-due" style={{ color: `var(--${s.color})` }}>
                <CheckCircle2 size={12} /> {s.status}
              </div>
            </div>
            <ChevronRight size={18} color="var(--muted)" style={{ alignSelf: 'center' }} />
          </div>
        ))}
      </div>
    </>
  );
};

// --- Sub-Module: Broadcast ---
export const Broadcast = () => {
  const [target, setTarget] = useState('All Classes');
  const navigate = useNavigate();

  return (
    <>
      <div className="page-header">
        <BackButton onClick={() => navigate('/principal/home')} />
        <h1 className="page-header-title">Broadcast</h1>
      </div>

      <div className="section" style={{ padding: '0 var(--sp-5)' }}>
        <div className="login-form">
          <div className="form-field">
            <label>Recipient Group</label>
            <select 
              value={target} 
              onChange={(e) => setTarget(e.target.value)}
              className="mobile-input"
              style={{ padding: '12px', width: '100%', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'var(--surface)' }}
            >
              <option>All Classes</option>
              <option>Std 10 only</option>
              <option>Std 9 only</option>
              <option>All Teachers</option>
              <option>Primary Teachers</option>
            </select>
          </div>
          <div className="form-field">
            <label>Message Content</label>
            <textarea 
              style={{ width: '100%', padding: 'var(--sp-4)', borderRadius: 'var(--r-lg)', border: '1.5px solid var(--border)', minHeight: '150px', fontFamily: 'inherit' }} 
              placeholder="Type your official announcement..."
            ></textarea>
          </div>
          <button className="login-btn">
            Send Broadcast Now <Send size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
      </div>
    </>
  );
};

// --- Sub-Module: Documents ---
export const Documents = () => {
  const [docs, setDocs] = useState([
    { id: 1, student: 'Aryan Kulkarni', doc: 'Bonafide Certificate', date: 'Today', status: 'Pending', color: 'amber' },
    { id: 2, student: 'Suhani Deshpande', doc: 'Leaving Certificate', date: '2 days ago', status: 'Pending', color: 'amber' },
  ]);
  const navigate = useNavigate();

  const handleAction = (id, newStatus, color) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status: newStatus, color } : d));
  };

  return (
    <>
      <div className="page-header">
        <BackButton onClick={() => navigate('/principal/home')} />
        <h1 className="page-header-title">Doc Approvals</h1>
      </div>

      <div className="hw-list">
        {docs.map((d) => (
          <div key={d.id} className="hw-card" style={{ borderLeftColor: `var(--${d.color})` }}>
            <div className="hw-card-body">
              <div className="hw-card-title">{d.student}</div>
              <div className="hw-card-tags"><span className="hw-tag" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>{d.doc}</span></div>
              <div className="hw-card-due"><Clock size={12} /> Requested {d.date}</div>
              {d.status !== 'Pending' && <div style={{ fontSize: '11px', fontWeight: 700, marginTop: '8px', color: `var(--${d.color})` }}>{d.status}</div>}
            </div>
            {d.status === 'Pending' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'center' }}>
                <button className="section-link" style={{ background: 'var(--primary)', color: '#fff', padding: '6px 12px', borderRadius: '8px' }} onClick={() => handleAction(d.id, 'Approved', 'green')}>Approve</button>
                <button className="section-link" style={{ color: 'var(--red)' }} onClick={() => handleAction(d.id, 'Rejected', 'red')}>Reject</button>
              </div>
            ) : <CheckCircle2 color={`var(--${d.color})`} />}
          </div>
        ))}
      </div>
    </>
  );
};
