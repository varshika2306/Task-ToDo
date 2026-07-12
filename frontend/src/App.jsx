import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: { fontFamily: 'var(--font-family)', fontSize: '0.875rem', borderRadius: '14px', background: '#ffffff', color: '#2F3E46', border: '1px solid #DAD7CD', boxShadow: '0 4px 12px rgba(47, 62, 70, 0.08)' },
              success: { iconTheme: { primary: '#588157', secondary: '#ffffff' } },
              error: { iconTheme: { primary: '#BC4749', secondary: '#ffffff' } },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
