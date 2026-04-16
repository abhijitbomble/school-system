import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Receipt, 
  UserCircle, 
  Calendar, 
  Wallet, 
  HeartHandshake, 
  FileText, 
  Package, 
  BarChart3, 
  History, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path }) => {
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <Link 
      to={path}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
          active 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          borderRadius: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backgroundColor: active ? 'var(--primary)' : 'transparent',
          color: active ? 'white' : 'var(--text-secondary)'
        }}
      >
        <Icon size={20} className={active ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
        <span style={{ fontWeight: 500, fontSize: '0.925rem' }}>{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div style={{
      width: '280px',
      height: '100vh',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        paddingLeft: '0.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--primary)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: '1.25rem',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
        }}>E</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 0, color: 'var(--text-primary)' }}>EduSync</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, overflowY: 'auto' }}>
        <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" />
        <SidebarItem icon={Users} label="Classes" path="/classes" />
        <SidebarItem icon={UserCircle} label="Staff" path="/staff" />
        <SidebarItem icon={Bell} label="Broadcast" path="/broadcast" />
        <SidebarItem icon={FileText} label="Documents" path="/documents" />
      </div>

      <div style={{ 
        paddingTop: '1rem', 
        marginTop: '1rem', 
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
        <SidebarItem icon={Settings} label="Settings" path="/settings" />
        <div 
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: 'var(--text-secondary)'
          }}
        >
          <LogOut size={20} />
          <span style={{ fontWeight: 500, fontSize: '0.925rem' }}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
