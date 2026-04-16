import React from 'react';
import { Bell, Search, User, Globe } from 'lucide-react';

const Header = () => {
  return (
    <div style={{
      height: '74px',
      backgroundColor: 'var(--bg-main)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backdropFilter: 'blur(10px)',
      background: 'rgba(15, 23, 42, 0.8)'
    }}>
      <div style={{ position: 'relative', width: '400px' }}>
        <Search size={18} style={{ 
          position: 'absolute', 
          left: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)'
        }} />
        <input 
          type="text" 
          placeholder="Search students, staff or records..."
          style={{
            width: '100%',
            height: '42px',
            backgroundColor: 'var(--bg-sidebar)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '0 12px 0 40px',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <Globe size={18} />
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>English</span>
        </div>
        
        <div style={{ 
          width: '42px', 
          height: '42px', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={20} />
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--error)',
            borderRadius: '50%',
            border: '2px solid var(--bg-main)'
          }}></div>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '0.35rem',
          paddingLeft: '0.75rem',
          borderRadius: '14px',
          border: '1px solid var(--border-color)',
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.03)'
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Rajesh Patil</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Principal</div>
          </div>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <User size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
