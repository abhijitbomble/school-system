import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { inboxItems } from '../../data/studentData'

const FILTERS = ['All', 'Notices', 'Results', 'Homework']

function MarkReadIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 12 5 16 9 12"/><polyline points="9 12 13 16 23 6"/></svg>
}

const TYPE_LABEL = { notice:'Notice', result:'Result', homework:'Homework', fee:'Fee', admin:'Admin' }
const TYPE_COLORS = {
  notice:   { bg:'#dbeafe', color:'#2563eb' },
  result:   { bg:'#ccfbf1', color:'#0a9396' },
  homework: { bg:'#ede9fe', color:'#7c3aed' },
  fee:      { bg:'#fef3c7', color:'#d97706' },
  admin:    { bg:'#e8eff8', color:'#1d3d6b' },
}

export default function StudentInbox() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const unread = inboxItems.filter(n => n.unread).length

  const visible = filter === 'All' ? inboxItems
    : inboxItems.filter(n => n.type === filter.toLowerCase())

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <button className="page-header-back" onClick={() => navigate('/student/home')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="page-header-title">Inbox {unread > 0 && (
          <span style={{
            background:'var(--primary)', color:'#fff', borderRadius:20,
            fontSize:13, padding:'2px 10px', marginLeft:8,
          }}>{unread}</span>
        )}</h1>
        <button className="page-header-action" title="Mark all read">
          <MarkReadIcon />
        </button>
      </div>

      {/* Unread meta */}
      <div className="inbox-header-meta">
        <span className="inbox-unread-count">{unread} unread messages</span>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* Inbox Cards */}
      <div className="inbox-list">
        {visible.map(item => {
          const tc = TYPE_COLORS[item.type] || TYPE_COLORS.admin
          return (
            <div key={item.id} className={`inbox-card ${item.unread ? 'unread' : ''}`}>
              <div className="inbox-card-icon-wrap">
                <div className="inbox-card-icon" style={{ background: item.iconBg }}>
                  {item.icon}
                </div>
                {item.unread && <div className="inbox-unread-dot" />}
              </div>
              <div className="inbox-card-body">
                <div className="inbox-card-top">
                  <span className="inbox-card-title">{item.title}</span>
                  <span className="inbox-card-time">{item.time}</span>
                </div>
                <div className="inbox-card-preview">{item.preview}</div>
                <div className="inbox-card-tags">
                  <span className="inbox-type-tag" style={{ background: tc.bg, color: tc.color }}>
                    {TYPE_LABEL[item.type] || item.type}
                  </span>
                  <span className="inbox-sender">
                    {item.sender}
                    {item.pinned && ' 📌'}
                  </span>
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
