import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homeworkItems } from '../../data/studentData'
import { SubjectTag } from '../../components/shared/SubjectIcon'

const FILTERS = ['All', 'Pending', 'Submitted', 'Overdue']

function CalIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
}

export default function StudentHomework() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const counts = {
    All: homeworkItems.length,
    Pending: homeworkItems.filter(h => h.status === 'pending' || h.status === 'due-today').length,
    Submitted: homeworkItems.filter(h => h.status === 'submitted').length,
    Overdue: homeworkItems.filter(h => h.status === 'overdue').length,
  }

  const visible = filter === 'All' ? homeworkItems
    : filter === 'Pending'   ? homeworkItems.filter(h => h.status === 'pending' || h.status === 'due-today')
    : filter === 'Submitted' ? homeworkItems.filter(h => h.status === 'submitted')
    : homeworkItems.filter(h => h.status === 'overdue')

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/student/home')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="page-header-title">Homework</h1>
        <button className="page-header-action">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="11" y2="18"/></svg>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}>
            {f}
            <span className="filter-tab-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Homework Cards */}
      <div className="hw-list">
        {visible.map(hw => {
          const statusClass = hw.status === 'due-today' ? 'due-today' : hw.status
          return (
            <div key={hw.id} className={`hw-card ${statusClass}`}>
              <div className="hw-card-icon" style={{ background: getSubjBg(hw.subject) }}>
                {getSubjEmoji(hw.subject)}
              </div>
              <div className="hw-card-body">
                <div className="hw-card-title">{hw.title}</div>
                <div className="hw-card-tags">
                  <SubjectTag name={hw.subject} />
                  <span style={{ fontSize: 12, color: 'var(--muted)', display:'flex', alignItems:'center', gap:3 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {hw.teacher}
                  </span>
                </div>
                <div className={`hw-card-due ${hw.status === 'overdue' ? 'overdue-text' : ''}`}>
                  <CalIcon />
                  Due: {hw.due}
                  {(hw.status === 'due-today') && <span className="due-today-badge">Due Today</span>}
                </div>
              </div>
              <div className="hw-card-status">
                {hw.status === 'submitted' && (
                  <span className="status-chip submitted">✓ Submitted</span>
                )}
                {(hw.status === 'pending' || hw.status === 'due-today') && (
                  <span className="status-chip pending">⏱ Pending</span>
                )}
                {hw.status === 'overdue' && (
                  <span className="status-chip overdue">⚠ Overdue</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="gap-section" />
    </>
  )
}

function getSubjEmoji(subj = '') {
  const map = { Mathematics:'🔢', maths:'🔢', Science:'🧪', English:'📖', Marathi:'🅰️', Hindi:'🔤', History:'🏛️', Geography:'🌍' }
  for (const [k,v] of Object.entries(map)) if (subj.toLowerCase().includes(k.toLowerCase())) return v
  return '📚'
}
function getSubjBg(subj = '') {
  const map = { Mathematics:'#dbeafe', Science:'#ccfbf1', English:'#ede9fe', Marathi:'#ffedd5', Hindi:'#fee2e2', History:'#dcfce7', Geography:'#fef3c7' }
  for (const [k,v] of Object.entries(map)) if (subj.toLowerCase().includes(k.toLowerCase())) return v
  return '#f1f5f9'
}
