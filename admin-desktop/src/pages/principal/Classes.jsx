import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  ArrowLeftRight, 
  Trash2, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  BarChart2,
  BookOpen,
  Mail,
  Phone,
  MoreVertical
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const classes = [
  { id: '1', name: 'Std 10 - Div A', students: 42, teacher: 'Mrs. Sharma' },
  { id: '2', name: 'Std 10 - Div B', students: 38, teacher: 'Mr. Joshi' },
  { id: '3', name: 'Std 9 - Div A', students: 45, teacher: 'Ms. Patil' },
  { id: '4', name: 'Std 9 - Div B', students: 40, teacher: 'Mr. Deshmukh' },
  { id: '5', name: 'Std 8 - Div A', students: 35, teacher: 'Mrs. Kulkarni' },
];

const students = [
  { id: 'ST001', name: 'Aryan Kulkarni', roll: 12, attendance: '96%', performance: 'A+' },
  { id: 'ST002', name: 'Suhani Deshpande', roll: 25, attendance: '92%', performance: 'A' },
  { id: 'ST003', name: 'Rohan Mane', roll: 8, attendance: '88%', performance: 'B+' },
  { id: 'ST004', name: 'Ishita Patil', roll: 15, attendance: '94%', performance: 'A' },
  { id: 'ST005', name: 'Aditya Shinde', roll: 3, attendance: '75%', performance: 'C' },
];

const performanceData = [
  { subject: 'Maths', A: 85, fullMark: 100 },
  { subject: 'Science', A: 78, fullMark: 100 },
  { subject: 'English', A: 92, fullMark: 100 },
  { subject: 'History', A: 88, fullMark: 100 },
  { subject: 'Marathi', A: 95, fullMark: 100 },
  { subject: 'Sanskrit', A: 90, fullMark: 100 },
];

const Classes = () => {
  const [view, setView] = useState('classes'); // 'classes', 'students', 'profile'
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const renderClassList = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Users color="var(--primary)" />
          School Classes
        </h2>
        <div style={{ position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input 
            type="text" 
            placeholder="Search classes..." 
            style={{
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-sidebar)',
              color: 'var(--text-primary)',
              width: '300px'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {classes.map(cls => (
          <div 
            key={cls.id} 
            className="card glass-hover" 
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedClass(cls);
              setView('students');
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{cls.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Class Teacher: {cls.teacher}</p>
              </div>
              <div style={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                color: 'var(--primary)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {cls.students} Students
              </div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avg Attendance: 92%</div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentList = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={() => setView('classes')}
          style={{ background: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{selectedClass.name} - Students</h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input 
            type="text" 
            placeholder="Search students by name or roll..." 
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
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <UserPlus size={18} /> Add Student
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem' }}>Roll No</th>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Attendance</th>
              <th style={{ padding: '1rem' }}>Performance</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(std => (
              <tr 
                key={std.id} 
                className="glass-hover" 
                style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
                onClick={() => {
                  setSelectedStudent(std);
                  setView('profile');
                }}
              >
                <td style={{ padding: '1rem' }}>{std.roll}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{std.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {std.id}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    color: parseInt(std.attendance) > 90 ? 'var(--success)' : 'var(--warning)',
                    fontWeight: 600
                  }}>
                    {std.attendance}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div className="badge badge-info">{std.performance}</div>
                </td>
                <td style={{ padding: '1rem' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button title="Transfer" style={{ padding: '6px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--info)' }}>
                      <ArrowLeftRight size={16} />
                    </button>
                    <button title="Remove" style={{ padding: '6px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudentProfile = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={() => setView('students')}
          style={{ background: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <ArrowLeft size={18} /> Back to List
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left Column: Basic Info & Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: 'white',
              fontWeight: 700
            }}>
              {selectedStudent.name[0]}
            </div>
            <h2 style={{ marginBottom: '0.25rem' }}>{selectedStudent.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Roll No: {selectedStudent.roll} • {selectedClass.name}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ATTENDANCE</div>
                <div style={{ fontWeight: 700, color: 'var(--success)' }}>{selectedStudent.attendance}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>PERFORMANCE</div>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{selectedStudent.performance}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Contact Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={18} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>+91 98765 43210</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Parent Primary No.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={18} color="var(--text-muted)" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>kulkarni.aryan@email.com</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Student Email</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Performance & Attendance Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart2 size={18} color="var(--primary)" />
              Subject Performance
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <Radar
                    name={selectedStudent.name}
                    dataKey="A"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.6}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} color="var(--primary)" />
              Attendance Trend
            </h3>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: 'Jun', attendance: 98 },
                  { month: 'Jul', attendance: 95 },
                  { month: 'Aug', attendance: 92 },
                  { month: 'Sep', attendance: 88 },
                  { month: 'Oct', attendance: 94 },
                  { month: 'Nov', attendance: 96 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Line type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100%' }}>
      {view === 'classes' && renderClassList()}
      {view === 'students' && renderStudentList()}
      {view === 'profile' && renderStudentProfile()}
    </div>
  );
};

export default Classes;
