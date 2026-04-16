import { Outlet } from 'react-router-dom'
import { TeacherBottomNav } from '../components/shared/BottomNav'

export default function TeacherLayout() {
  return (
    <>
      <div className="page-scroll">
        <Outlet />
      </div>
      <TeacherBottomNav />
    </>
  )
}
