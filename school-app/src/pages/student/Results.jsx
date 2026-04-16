import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { results } from '../../data/studentData'

function DownloadIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
}

export default function StudentResults() {
  const navigate = useNavigate()
  const [activeExam, setActiveExam] = useState(0)
  const exam = results.current
  const pct = exam.percentage

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/student/home')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="page-header-title">Results</h1>
        <button className="page-header-action"><DownloadIcon /></button>
      </div>

      {/* Student subtitle */}
      <div style={{ padding:'0 20px 16px', fontSize:13, color:'var(--muted)', fontWeight:600 }}>
        Aarav Sharma · Roll No. 14
      </div>

      {/* Exam Selector */}
      <div className="filter-tabs">
        {results.exams.map((ex, i) => (
          <button key={ex} className={`filter-tab ${i === activeExam ? 'active' : ''}`}
            onClick={() => setActiveExam(i)}>
            {ex}
          </button>
        ))}
      </div>

      {/* Overall Performance Card */}
      <div style={{ padding:'0 20px 20px' }}>
        <div className="results-header-card">
          <div className="results-header-meta">{exam.name} · {exam.year}</div>
          <div className="results-header-row">
            <div className="results-header-title">Overall Performance</div>
            <div className="results-class-chip">{exam.standard}</div>
          </div>
          <div className="results-stats">
            <div>
              <div className="results-stat-val">{exam.totalMarks}<span style={{fontSize:14,opacity:0.7}}>/{exam.totalMax}</span></div>
              <div className="results-stat-label">Total Marks</div>
            </div>
            <div>
              <div className="results-stat-val">{exam.percentage}%</div>
              <div className="results-stat-label">Percentage</div>
            </div>
            <div>
              <div className="results-stat-val">#<span>{exam.rank}</span><span style={{fontSize:14,opacity:0.7}}>/{exam.classSize}</span></div>
              <div className="results-stat-label">Class Rank</div>
            </div>
          </div>
          <div className="results-progress">
            <div className="results-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="results-grade-row">
            <span>Grade: {exam.grade}</span>
            <span>Highest: {exam.highest}% · Class Avg: {exam.classAvg}%</span>
          </div>
        </div>
      </div>

      {/* Subject-wise Marks */}
      <div style={{ padding:'0 20px 8px' }}>
        <div className="section-title">Subject-wise Marks</div>
      </div>
      <div className="subject-list">
        {exam.subjects.map(subj => {
          const pct = Math.round((subj.score / subj.max) * 100)
          return (
            <div key={subj.name} className="subject-result-card">
              <div className="subj-icon-circle" style={{ background: subj.bg }}>
                {getSubjEmoji(subj.name)}
              </div>
              <div className="subj-result-body">
                <div className="subj-result-name">{subj.name}</div>
                <div className="subj-result-teacher">{subj.teacher}</div>
                <div className="subj-result-bar-wrap">
                  <div className="subj-result-bar">
                    <div className="subj-result-bar-fill" style={{ width:`${pct}%`, background: subj.color }} />
                  </div>
                  <span className="subj-result-score">{subj.score}/{subj.max}</span>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0 }}>
                <div className="subj-grade-chip" style={{ borderColor: subj.color, color: subj.color, background: subj.bg }}>
                  {subj.grade}
                </div>
                {subj.trend === 'up' && <span className="subj-trend" style={{ color:'var(--green)' }}>↗</span>}
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
  const map = { Mathematics:'🔢', Science:'🧪', English:'📖', Marathi:'🅰️', Hindi:'🔤', History:'🏛️', Geography:'🌍' }
  for (const [k,v] of Object.entries(map)) if (subj.toLowerCase().includes(k.toLowerCase())) return v
  return '📚'
}
