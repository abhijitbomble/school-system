import { Outlet } from 'react-router-dom'
import { PrincipalBottomNav } from '../components/shared/BottomNav'

export default function PrincipalLayout() {
  return (
    <div className="layout-container principal-theme">
      <div className="page-scroll">
        <Outlet />
      </div>
      <PrincipalBottomNav />
    </div>
  )
}
