import { useLocation, useNavigate } from 'react-router-dom'

const STUDENT_TABS = [
  { path: '/student/home',      label: 'Home',      icon: HomeIcon },
  { path: '/student/homework',  label: 'Homework',  icon: HomeworkIcon },
  { path: '/student/edututor',  label: 'EduTutor',  icon: SparklesIcon },
  { path: '/student/results',   label: 'Results',   icon: ResultsIcon },
  { path: '/student/inbox',     label: 'Inbox',     icon: InboxIcon },
]

const TEACHER_TABS = [
  { path: '/teacher/home',       label: 'Home',       icon: HomeIcon },
  { path: '/teacher/timetable',  label: 'Timetable',  icon: CalendarIcon },
  { path: '/teacher/attendance', label: 'Attendance', icon: AttendanceIcon },
  { path: '/teacher/homework',   label: 'Homework',   icon: HomeworkIcon },
  { path: '/teacher/inbox',      label: 'Inbox',      icon: InboxIcon },
]

const PRINCIPAL_TABS = [
  { path: '/principal/home',      label: 'Home',      icon: HomeIcon },
  { path: '/principal/classes',   label: 'Classes',   icon: ClassesIcon },
  { path: '/principal/staff',     label: 'Staff',     icon: StaffIcon },
  { path: '/principal/broadcast', label: 'Broadcast', icon: BroadcastIcon },
  { path: '/principal/documents', label: 'Docs',      icon: DocsIcon },
]

export function StudentBottomNav() {
  return <BottomNav tabs={STUDENT_TABS} />
}

export function TeacherBottomNav() {
  return <BottomNav tabs={TEACHER_TABS} />
}

export function PrincipalBottomNav() {
  return <BottomNav tabs={PRINCIPAL_TABS} />
}

function BottomNav({ tabs }) {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        const Icon = tab.icon
        return (
          <button key={tab.path} className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}>
            {active && <span className="nav-active-pill" />}
            <Icon />
            <span className="nav-item-label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

/* ---- SVG Icons ---- */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  )
}
function HomeworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}
function ResultsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  )
}
function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  )
}
function AttendanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

export function ClassesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
export function StaffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
export function BroadcastIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  )
}
export function DocsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4M3 5h4"/>
    </svg>
  )
}

export { HomeIcon, CalendarIcon, HomeworkIcon, ResultsIcon, InboxIcon, AttendanceIcon, SparklesIcon }

