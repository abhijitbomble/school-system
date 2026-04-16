import React, { useState } from 'react';
import { 
  MessageSquare, 
  Wifi, 
  RefreshCw, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Send,
  Globe,
  UserCircle,
  UserPlus,
  Receipt,
  FileText,
  Calendar,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const commData = [
  { name: '08:00', msgs: 45, sync: 98 },
  { name: '10:00', msgs: 320, sync: 95 },
  { name: '12:00', msgs: 450, sync: 99 },
  { name: '14:00', msgs: 280, sync: 97 },
  { name: '16:00', msgs: 150, sync: 100 },
];

const attendanceByClass = [
  { class: 'Std 1', attendance: 98, status: 'excellent' },
  { class: 'Std 2', attendance: 95, status: 'excellent' },
  { class: 'Std 3', attendance: 92, status: 'good' },
  { class: 'Std 4', attendance: 88, status: 'good' },
  { class: 'Std 5', attendance: 94, status: 'excellent' },
  { class: 'Std 6', attendance: 75, status: 'warning' },
  { class: 'Std 7', attendance: 91, status: 'good' },
  { class: 'Std 8', attendance: 84, status: 'warning' },
  { class: 'Std 9', attendance: 96, status: 'excellent' },
  { class: 'Std 10', attendance: 99, status: 'excellent' },
];

const StatCard = ({ title, value, subvalue, icon: Icon, color, trend }) => (
  <div className="card glass-hover" style={{ flex: 1, minWidth: '240px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '14px',
        backgroundColor: `rgba(${color}, 0.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: `rgb(${color})`
      }}>
        <Icon size={24} />
      </div>
      {trend && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px', 
          color: trend > 0 ? 'var(--success)' : 'var(--error)',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          <TrendingUp size={16} style={{ transform: trend < 0 ? 'rotate(180deg)' : 'none' }} />
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{title}</div>
    <div style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>{value}</div>
    {subvalue && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{subvalue}</div>}
  </div>
);

const Dashboard = () => {
  const [filter, setFilter] = useState('Today');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', marginTop: 0 }}>Principal Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Monitoring the school health and academic operations.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ 
            display: 'flex', 
            backgroundColor: 'var(--bg-sidebar)', 
            borderRadius: '12px', 
            padding: '4px',
            border: '1px solid var(--border-color)'
          }}>
            {['Today', 'Week', 'Month'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  backgroundColor: filter === f ? 'var(--primary)' : 'transparent',
                  color: filter === f ? 'white' : 'var(--text-secondary)'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <button style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Broadcast size={18} />
            Quick Broadcast
          </button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <StatCard 
          title="Overall Attendance" 
          value="94.2%" 
          subvalue={`${filter}'s average across all classes`} 
          icon={Users} 
          color="59, 130, 246" 
          trend={2.4} 
        />
        <StatCard 
          title="Teacher Presence" 
          value="82/86" 
          subvalue="4 on approved leave" 
          icon={UserCircle} 
          color="139, 92, 246" 
        />
        <StatCard 
          title="Substitution Alert" 
          value="2 Classes" 
          subvalue="Awaiting teacher allocation" 
          icon={AlertCircle} 
          color="239, 68, 68" 
        />
        <StatCard 
          title="Late Comers" 
          value="14" 
          subvalue="12 Students, 2 Staff" 
          icon={Clock} 
          color="245, 158, 11" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Class-wise Attendance & Visual Monitoring */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="var(--primary)" />
              Class-wise Attendance ({filter})
            </h3>
            <button style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, background: 'none' }}>
              View Detailed Report
            </button>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceByClass}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="class" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="attendance" radius={[4, 4, 0, 0]}>
                  {attendanceByClass.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.status === 'warning' ? 'var(--warning)' : 'var(--primary)'} 
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* School Health - AI Insights */}
          <div style={{ 
            marginTop: '0.5rem',
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <TrendingUp size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>AI Monitoring Insight</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Syllabus progress in <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Std 6 Div B</span> is 15% behind schedule. 
                Consider reviewing the weekly workload for Maths.
              </div>
            </div>
            <button style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              color: 'var(--text-primary)', 
              padding: '0.5rem 1rem', 
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              Take Action
            </button>
          </div>
        </div>

        {/* Syllabus Progress Monitoring */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} color="var(--primary)" />
              Syllabus Completion
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'Primary (Std 1-5)', progress: 78, color: 'var(--success)' },
                { label: 'Middle (Std 6-8)', progress: 62, color: 'var(--primary)' },
                { label: 'Secondary (Std 9-10)', progress: 45, color: 'var(--warning)' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.progress}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.progress}%`, height: '100%', backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ 
              marginTop: '1.5rem', 
              width: '100%', 
              padding: '0.75rem', 
              borderRadius: '10px', 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              border: '1px solid var(--border-color)'
            }}>
              View Syllabus Maps
            </button>
          </div>

          {/* Quick Actions for Principal */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Administrative Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Approve Teacher Leaves', count: 3, icon: UserCircle },
                { label: 'Pending Certificates', count: 12, icon: FileText },
                { label: 'Admission Inquiries', count: 5, icon: UserPlus },
              ].map((action, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '0.75rem', 
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <action.icon size={18} color="var(--text-muted)" />
                    <span style={{ fontSize: '0.85rem' }}>{action.label}</span>
                  </div>
                  <div style={{ 
                    backgroundColor: 'var(--error)', 
                    color: 'white', 
                    fontSize: '0.7rem', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    {action.count}
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

// Mock Broadcast icon if not in lucide-react
const Broadcast = ({ size }) => <Send size={size} />;

export default Dashboard;
