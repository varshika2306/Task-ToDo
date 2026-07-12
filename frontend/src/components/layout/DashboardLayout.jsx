import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-7)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}