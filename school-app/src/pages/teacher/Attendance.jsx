import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { classStudents } from '../../data/teacherData'

export default function TeacherAttendance() {
  const navigate = useNavigate()

  // attendance state: map student id -> 'P' | 'A' | 'L'
  const [attendance, setAttendance] = useState(() => {
    const init = {}
    classStudents.forEach(s => { init[s.id] = 'P' })
    return init
  })

  function mark(id, status) {
    setAttendance(prev => ({ ...prev, [id]: status }))
  }

  const presentCount = Object.values(attendance).filter(v => v === 'P').length
  const absentCount  = Object.values(attendance).filter(v => v === 'A').length
  const lateCount    = Object.values(attendance).filter(v => v === 'L').length

  function handleSubmit() {
    alert(`Attendance submitted!\nPresent: ${presentCount}  Absent: ${absentCount}  Late: ${lateCount}`)
  }

  return (
    <>
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/teacher/home')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="page-header-title">Attendance</h1>
        <div style={{ width:36 }} />
      </div>

      {/* Class info & stats */}
      <div className="attendance-header">
        <div>
          <span className="attendance-class-chip">Std 8 Div A · Fri, 11 Apr</span>
          <div style={{ fontSize:12, color:'var(--muted)', marginTop:8, fontWeight:500 }}>
            {classStudents.length} students · Tap to change status
          </div>
        </div>
        <div className="attendance-stats-row">
          <div className="att-stat present">
            <div className="att-stat-val">{presentCount}</div>
            <div className="att-stat-label">Present</div>
          </div>
          <div className="att-stat absent">
            <div className="att-stat-val">{absentCount}</div>
            <div className="att-stat-label">Absent</div>
          </div>
          <div className="att-stat late">
            <div className="att-stat-val">{lateCount}</div>
            <div className="att-stat-label">Late</div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="student-att-list" style={{ paddingBottom: 130 }}>
        {classStudents.map(s => {
          const status = attendance[s.id]
          return (
            <div key={s.id} className={`student-att-card ${status === 'A' ? 'absent-marked' : status === 'L' ? 'late-marked' : ''}`}>
              <div className="student-att-avatar">{s.initials}</div>
              <div className="student-att-info">
                <div className="student-att-name">{s.name}</div>
                <div className="student-att-roll">Roll No. {s.rollNo}</div>
              </div>
              <div className="att-toggle-group">
                <button className={`att-btn ${status === 'P' ? 'p-active' : ''}`} onClick={() => mark(s.id, 'P')}>P</button>
                <button className={`att-btn ${status === 'A' ? 'a-active' : ''}`} onClick={() => mark(s.id, 'A')}>A</button>
                <button className={`att-btn ${status === 'L' ? 'l-active' : ''}`} onClick={() => mark(s.id, 'L')}>L</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit Bar */}
      <div className="submit-bar">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Attendance · {presentCount} P · {absentCount} A · {lateCount} L
        </button>
      </div>
    </>
  )
}
