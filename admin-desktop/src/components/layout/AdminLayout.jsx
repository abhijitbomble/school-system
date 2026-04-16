import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        overflow: 'hidden',
        backgroundColor: 'var(--bg-main)'
      }}>
        <Header />
        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '2rem',
          backgroundColor: 'var(--bg-main)'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
