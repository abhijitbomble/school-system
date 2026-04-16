/* Subject icon component — returns emoji and background color per subject */

const SUBJECT_MAP = {
  mathematics: { emoji: '🔢', bg: '#dbeafe', color: '#2563eb' },
  maths:       { emoji: '🔢', bg: '#dbeafe', color: '#2563eb' },
  math:        { emoji: '🔢', bg: '#dbeafe', color: '#2563eb' },
  science:     { emoji: '🧪', bg: '#ccfbf1', color: '#0a9396' },
  english:     { emoji: '📖', bg: '#ede9fe', color: '#7c3aed' },
  marathi:     { emoji: '🅰️', bg: '#ffedd5', color: '#ea580c' },
  hindi:       { emoji: '🔤', bg: '#fee2e2', color: '#dc2626' },
  history:     { emoji: '🏛️', bg: '#dcfce7', color: '#16a34a' },
  geography:   { emoji: '🌍', bg: '#fef3c7', color: '#d97706' },
  geo:         { emoji: '🌍', bg: '#fef3c7', color: '#d97706' },
  physics:     { emoji: '⚡', bg: '#dbeafe', color: '#0369a1' },
  chemistry:   { emoji: '⚗️', bg: '#ede9fe', color: '#7c3aed' },
  biology:     { emoji: '🌿', bg: '#dcfce7', color: '#16a34a' },
  sst:         { emoji: '🗺️', bg: '#fef3c7', color: '#ca8a04' },
  pt:          { emoji: '🏃', bg: '#f0fdf4', color: '#16a34a' },
  lunch:       { emoji: '🍱', bg: '#fef9c3', color: '#ca8a04' },
  break:       { emoji: '☕', bg: '#fef9c3', color: '#ca8a04' },
}

export function getSubjectInfo(name = '') {
  const key = name.toLowerCase().trim()
  // exact match
  if (SUBJECT_MAP[key]) return SUBJECT_MAP[key]
  // partial match
  for (const [k, v] of Object.entries(SUBJECT_MAP)) {
    if (key.includes(k)) return v
  }
  return { emoji: '📚', bg: '#f1f5f9', color: '#64748b' }
}

export function SubjectIcon({ name, size = 40 }) {
  const { emoji, bg } = getSubjectInfo(name)
  return (
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, flexShrink: 0,
    }}>
      {emoji}
    </div>
  )
}

export function SubjectTag({ name }) {
  const { bg, color } = getSubjectInfo(name)
  return (
    <span className="hw-tag" style={{ background: bg, color }}>
      {name}
    </span>
  )
}
