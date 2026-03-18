import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login-page'
import MainPage from './pages/main-page'

function getUsername() {
  return localStorage.getItem('codeleap_username') ?? ''
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!getUsername()) return <Navigate to="/login" replace />
  return <>{children}</>
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  if (getUsername()) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
