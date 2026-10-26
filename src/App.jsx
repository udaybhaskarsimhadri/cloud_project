import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AIProvider } from './context/AIContext';
import { ToastProvider } from './context/ToastContext';
import AIChatWidget from './components/ai/AIChatWidget';
import OfflineBanner from './components/common/OfflineBanner';
import ErrorBoundary from './components/common/ErrorBoundary';
import useSessionTimeout from './hooks/useSessionTimeout';
import AppRoutes from './routes/AppRoutes';

function AppContent() {
  useSessionTimeout();
  return (
    <>
      <OfflineBanner />
      <AppRoutes />
      <AIChatWidget />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <AIProvider>
                <AppContent />
              </AIProvider>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
