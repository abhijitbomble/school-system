import { Outlet } from 'react-router-dom'
import { StudentBottomNav } from '../components/shared/BottomNav'

export default function StudentLayout() {
  return (
    <>
      <div className="page-scroll">
        <Outlet />
      </div>
      <StudentBottomNav />
    </>
  )
}
