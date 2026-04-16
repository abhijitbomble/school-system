import { useNavigate } from 'react-router-dom'
import { teacher, teacherTimetable, teacherHomework, teacherInboxItems } from '../../data/teacherData'

const TODAY = 'Fri'
const todayPeriods = teacherTimetable[TODAY].filter(p => !p.break)

export default function TeacherHome() {
  const navigate = useNavigate()
  const currentPeriod = todayPeriods.find(p => p.status === 'in-progress')
  const upcoming      = todayPeriods.filter(p => p.status === 'upcoming')
  const unread        = teacherInboxItems.filter(n => n.unread).length
  const openHw        = teacherHomework.filter(h => h.status === 'open').length

  return (
    <>
      {/* Teacher Header */}
      <div className="teacher-header">
        <div className="teacher-header-avatar">{teacher.initials}</div>
        <div className="teacher-header-role">{teacher.role}</div>
        <div className="teacher-header-name">{teacher.name}</div>
        <div className="teacher-header-class">{teacher.subject} · {teacher.assignedClass}</div>
      </div>

      <div className="gap-section" />

      {/* Attendance Alert */}
      <div className="attendance-alert-card" onClick={() => navigate('/teacher/attendance')}>
        <div className="attendance-alert-icon">📋</div>
        <div className="attendance-alert-body">
          <div className="attendance-alert-title">Attendance Pending</div>
          <div className="attendance-alert-sub">Std 8 Div A · 20 students · Mark now</div>
        </div>
        <button className="attendance-alert-btn">Mark Now</button>
      </div>

      <div className="gap-section" />

      {/* Today's Periods */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Today's Periods</span>
          <button className="section-link" onClick={() => navigate('/teacher/timetable')}>View all</button>
        </div>
      </div>
      <div className="teacher-period-list">
        {todayPeriods.map(p => {
          const active = p.status === 'in-progress'
          return (
            <div key={p.id} className={`teacher-period-row ${active ? 'active' : ''}`}>
              <div className="tp-time">{p.start}</div>
              <div className="tp-dot" />
              <div className="tp-body">
                <div className="tp-subject">{p.subject}</div>
                <div className="tp-class">{p.classDiv} · {p.room}</div>
              </div>
              {active ? (
                <button className="tp-action" onClick={() => navigate('/teacher/attendance')}>Mark Att.</button>
              ) : p.status === 'upcoming' ? (
                <button className="tp-action" onClick={() => navigate('/teacher/homework')}>Add HW</button>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="gap-section" />

      {/* Quick Stats */}
      <div style={{ padding:'0 20px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          <div className="stat-card" onClick={() => navigate('/teacher/homework')}>
            <div className="stat-card-icon" style={{ background:'#ccfbf1' }}>📝</div>
            <div className="stat-card-value" style={{ color:'var(--teal)' }}>{openHw}</div>
            <div className="stat-card-label">Open Tasks</div>
            <div className="stat-card-sub">assignments active</div>
          </div>
          <div className="stat-card" onClick={() => navigate('/teacher/inbox')}>
            <div className="stat-card-dot" style={{ background: 'var(--primary)' }} />
            <div className="stat-card-icon" style={{ background:'#e8eff8' }}>📬</div>
            <div className="stat-card-value" style={{ color:'var(--primary)' }}>{unread}</div>
            <div className="stat-card-label">Unread</div>
            <div className="stat-card-sub">inbox messages</div>
          </div>
        </div>
      </div>

      <div className="gap-section" />

      {/* Latest Inbox Item */}
      {teacherInboxItems[0] && (
        <div className="notice-card" onClick={() => navigate('/teacher/inbox')}>
          <div className="notice-card-icon">{teacherInboxItems[0].icon}</div>
          <div className="notice-card-content">
            <div className="notice-card-header">
              <span className="notice-card-title">{teacherInboxItems[0].title}</span>
              {teacherInboxItems[0].unread && <span className="new-badge">NEW</span>}
            </div>
            <div className="notice-card-body">{teacherInboxItems[0].preview}</div>
            <div className="notice-card-meta">{teacherInboxItems[0].time} · {teacherInboxItems[0].sender}</div>
          </div>
          <div className="notice-card-arrow">›</div>
        </div>
      )}

      <div className="gap-section" />
    </>
  )
}
