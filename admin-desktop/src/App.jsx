import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';

// Placeholder components for new modules
import Classes from './pages/principal/Classes';
import Staff from './pages/principal/Staff';
import Broadcast from './pages/principal/Broadcast';
import Documents from './pages/principal/Documents';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
