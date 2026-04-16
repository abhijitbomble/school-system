import { useNavigate } from 'react-router-dom'
import { student, timetable, homeworkItems, inboxItems } from '../../data/studentData'
import { SubjectIcon } from '../../components/shared/SubjectIcon'

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat']
const TODAY = 'Fri'

const todayPeriods = timetable[TODAY].filter(p => !p.break).slice(0, 4)

export default function StudentHome() {
  const navigate = useNavigate()
  const overdueCount = homeworkItems.filter(h => h.status === 'overdue').length
  const todayCount   = homeworkItems.filter(h => h.status === 'due-today').length
  const totalHwDue   = overdueCount + todayCount
  const unreadCount  = inboxItems.filter(n => n.unread).length
  const latestNotice = inboxItems.find(n => n.type === 'notice')

  return (
    <>
      {/* Header */}
      <div className="home-header">
        <div className="home-header-avatar">{student.initials}</div>
        <div className="home-header-greeting">Good afternoon,</div>
        <div className="home-header-name">{student.name}</div>
        <div className="home-header-meta">
          <span className="home-header-badge">{student.standard} · {student.division}</span>
          <span className="home-header-badge">Roll No. {student.rollNo}</span>
        </div>
        <div className="home-header-tagline">{student.tagline}</div>
      </div>

      {/* Today's Timetable */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Today's Timetable</span>
          <span className="section-tag">Friday</span>
          <button className="section-link" onClick={() => navigate('/student/timetable')}>View all</button>
        </div>
      </div>
      <div className="timetable-scroll">
        {todayPeriods.map(p => {
          const active = p.status === 'in-progress'
          return (
            <div key={p.id} className={`period-mini-card ${active ? 'active-period' : ''}`}
              onClick={() => navigate('/student/timetable')}>
              <div className="period-mini-icon" style={
                active ? {} : { background: getSubjBg(p.subject) }
              }>
                {getSubjEmoji(p.subject)}
              </div>
              <div className="period-mini-name">{shortName(p.subject)}</div>
              <div className="period-mini-time">{p.start}</div>
              {active && <div className="period-mini-now">Now</div>}
            </div>
          )
        })}
      </div>

      <div className="gap-sm" />

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate('/student/homework')}>
          <div className="stat-card-dot" />
          <div className="stat-card-icon" style={{ background: '#fff0e6' }}>📋</div>
          <div className="stat-card-value" style={{ color: 'var(--orange)' }}>{totalHwDue}</div>
          <div className="stat-card-label">Homework Due</div>
          <div className="stat-card-sub">tasks pending</div>
        </div>
        <div className="stat-card" onClick={() => navigate('/student/results')}>
          <div className="stat-card-icon" style={{ background: 'var(--teal-light)' }}>📈</div>
          <div className="stat-card-value" style={{ color: 'var(--teal)' }}>91%</div>
          <div className="stat-card-label">Attendance</div>
          <div className="stat-card-sub">this month</div>
        </div>
      </div>

      <div className="gap-section" />

      {/* Latest Notice */}
      {latestNotice && (
        <div className="notice-card" onClick={() => navigate('/student/inbox')}>
          <div className="notice-card-icon">{latestNotice.icon}</div>
          <div className="notice-card-content">
            <div className="notice-card-header">
              <span className="notice-card-title">New Notice</span>
              <span className="new-badge">NEW</span>
            </div>
            <div className="notice-card-body">{latestNotice.preview}</div>
            <div className="notice-card-meta">{latestNotice.time} · {latestNotice.sender}</div>
          </div>
          <div className="notice-card-arrow">›</div>
        </div>
      )}

      <div className="gap-sm" />

      {/* Fee Card */}
      <div className="fee-card">
        <div className="fee-card-icon">💳</div>
        <div className="fee-card-content">
          <div className="fee-card-label">Fee Due</div>
          <div className="fee-card-body">Next instalment of ₹4,500 due on 15 Jun 2026</div>
        </div>
        <div className="fee-card-days">36 days</div>
      </div>

      <div className="gap-section" />
    </>
  )
}

function shortName(subj) {
  const map = { Mathematics:'Math', Science:'Sci', English:'Eng', Marathi:'Mar', History:'His', Geography:'Geo' }
  return map[subj] || subj.slice(0, 3)
}

function getSubjEmoji(subj) {
  const map = { Mathematics:'🔢', Science:'🧪', English:'📖', Marathi:'🅰️', History:'🏛️', Geography:'🌍' }
  return map[subj] || '📚'
}
function getSubjBg(subj) {
  const map = { Mathematics:'#dbeafe', Science:'#ccfbf1', English:'#ede9fe', Marathi:'#ffedd5', History:'#dcfce7', Geography:'#fef3c7' }
  return map[subj] || '#f1f5f9'
}
