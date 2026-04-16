import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { teacherHomework } from '../../data/teacherData'
import { SubjectTag } from '../../components/shared/SubjectIcon'

const FILTERS = ['All', 'Open', 'Closed']

function CalIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
}

export default function TeacherHomework() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const counts = {
    All:    teacherHomework.length,
    Open:   teacherHomework.filter(h => h.status === 'open').length,
    Closed: teacherHomework.filter(h => h.status === 'closed').length,
  }

  const visible = filter === 'All' ? teacherHomework
    : teacherHomework.filter(h => h.status === filter.toLowerCase())

  return (
    <>
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/teacher/home')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="page-header-title">Homework</h1>
        {/* Compose button */}
        <button className="page-header-action" title="Assign new homework"
          style={{ background:'var(--primary)', color:'#fff' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}>
            {f}
            <span className="filter-tab-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="hw-list">
        {visible.map(hw => {
          const pct = Math.round((hw.submitted / hw.total) * 100)
          return (
            <div key={hw.id} className="teacher-hw-card">
              <div className="teacher-hw-card-header">
                <div style={{ fontSize:22 }}>{getSubjEmoji(hw.subject)}</div>
                <div className="teacher-hw-card-body-title">{hw.title}</div>
                {hw.status === 'open'
                  ? <span className="status-chip pending">Open</span>
                  : <span className="status-chip submitted">Closed</span>}
              </div>
              <div className="teacher-hw-card-meta">
                <SubjectTag name={hw.subject} />
                <span style={{
                  background:'var(--primary-light)', color:'var(--primary)',
                  borderRadius:20, padding:'3px 10px', fontSize:11, fontWeight:700,
                }}>{hw.classDiv}</span>
              </div>
              <div className="teacher-hw-card-footer">
                <div className="teacher-hw-card-due">
                  <CalIcon /> Due: {hw.due}
                </div>
                <div className="submission-progress">
                  <div style={{
                    width:60, height:5, background:'var(--border)', borderRadius:10, overflow:'hidden',
                  }}>
                    <div style={{ width:`${pct}%`, height:'100%', background:'var(--green)', borderRadius:10 }} />
                  </div>
                  <div>
                    <span className="sub-count">{hw.submitted}</span>
                    <span className="sub-label">/{hw.total} submitted</span>
                  </div>
                </div>
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
  const map = { Mathematics:'🔢', Science:'🧪', English:'📖', Marathi:'🅰️', History:'🏛️', Geography:'🌍' }
  for (const [k,v] of Object.entries(map)) if (subj.toLowerCase().includes(k.toLowerCase())) return v
  return '📚'
}
