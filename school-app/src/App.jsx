import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import StudentLayout from './layouts/StudentLayout'
import TeacherLayout from './layouts/TeacherLayout'

// Student Pages
import StudentHome       from './pages/student/Home'
import StudentTimetable  from './pages/student/Timetable'
import StudentHomework   from './pages/student/Homework'
import StudentResults    from './pages/student/Results'
import StudentInbox      from './pages/student/Inbox'
import StudentEduTutor   from './pages/student/EduTutor'

// Teacher Pages
import TeacherHome       from './pages/teacher/Home'
import TeacherTimetable  from './pages/teacher/Timetable'
import TeacherAttendance from './pages/teacher/Attendance'
import TeacherHomework   from './pages/teacher/Homework'
import TeacherInbox      from './pages/teacher/Inbox'

// Principal Pages
import PrincipalLayout   from './layouts/PrincipalLayout'
import PrincipalHome     from './pages/principal/Home'
import { Classes, Staff, Broadcast, Documents } from './pages/principal/Modules'

export default function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Student */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home"      element={<StudentHome />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="homework"  element={<StudentHomework />} />
            <Route path="edututor"  element={<StudentEduTutor />} />
            <Route path="results"   element={<StudentResults />} />
            <Route path="inbox"     element={<StudentInbox />} />
          </Route>

          {/* Teacher */}
          <Route path="/teacher" element={<TeacherLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home"       element={<TeacherHome />} />
            <Route path="timetable"  element={<TeacherTimetable />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            <Route path="homework"   element={<TeacherHomework />} />
            <Route path="inbox"      element={<TeacherInbox />} />
          </Route>

          {/* Principal */}
          <Route path="/principal" element={<PrincipalLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home"      element={<PrincipalHome />} />
            <Route path="classes"   element={<Classes />} />
            <Route path="staff"     element={<Staff />} />
            <Route path="broadcast" element={<Broadcast />} />
            <Route path="documents" element={<Documents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
