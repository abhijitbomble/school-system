import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { teacherTimetable } from '../../data/teacherData'

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat']
const DATES = ['7','8','9','10','11','12']
const TODAY_IDX = 4

function PersonIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function RoomIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function CheckIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
}

export default function TeacherTimetable() {
  const navigate = useNavigate()
  const [activeDay, setActiveDay] = useState(TODAY_IDX)
  const periods = teacherTimetable[DAYS[activeDay]] || []

  return (
    <>
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/teacher/home')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="page-header-title">My Schedule</h1>
        <button className="page-header-action">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        </button>
      </div>

      <div className="week-selector">
        {DAYS.map((d, i) => (
          <button key={d} className={`day-pill ${i === activeDay ? 'active' : ''}`}
            onClick={() => setActiveDay(i)}>
            <span className="day-pill-label">{d}</span>
            <span className="day-pill-num">{DATES[i]}</span>
          </button>
        ))}
      </div>

      <div className="periods-list">
        {periods.map(p => {
          if (p.break) {
            return (
              <div key={p.id} className="break-row">
                ☕ {p.label} · {p.time}
              </div>
            )
          }
          const active = p.status === 'in-progress'
          const done   = p.status === 'done'
          return (
            <div key={p.id} className={`period-card ${active ? 'in-progress' : ''} ${done ? 'done' : ''}`}>
              <div className="period-num-col">
                <div className="period-num-circle">{p.period}</div>
                <div className="period-time">{p.start}<br/>{p.end}</div>
              </div>
              <div className="period-divider" />
              <div className="period-body">
                <div className="period-subject-row">
                  <span className="period-subj-icon">{getSubjEmoji(p.subject)}</span>
                  <span className="period-subj-name">{p.subject}</span>
                </div>
                <div className="period-meta-row">
                  {/* Teacher timetable shows class/division instead of teacher name */}
                  <span className="period-meta-item">
                    <PersonIcon /> {p.classDiv}
                  </span>
                  <span className="period-meta-item">
                    <RoomIcon /> {p.room}
                  </span>
                </div>
              </div>
              {active && <span className="in-progress-badge">In Progress</span>}
              {done && <span className="done-check"><CheckIcon /></span>}
            </div>
          )
        })}
      </div>
      <div className="gap-section" />
    </>
  )
}

function getSubjEmoji(subj = '') {
  const map = { Mathematics:'🔢', Science:'🧪', English:'📖', Marathi:'🅰️', History:'🏛️', Geography:'🌍', Free:'☕' }
  for (const [k,v] of Object.entries(map)) if (subj.toLowerCase().includes(k.toLowerCase())) return v
  return '📚'
}
