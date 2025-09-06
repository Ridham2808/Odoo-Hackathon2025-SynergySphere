import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPassword from './pages/ForgotPassword'
import ProjectsDashboard from './pages/ProjectsDashboard'
import ProjectDetail from './pages/ProjectDetail'
import MyTasks from './pages/MyTasks'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppContent() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const { logout } = useAuth()

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  // Apply dark class to document body and root element
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      document.getElementById('root')?.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      document.getElementById('root')?.classList.remove('dark')
    }
  }, [isDarkTheme])

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark')
    }
  }, [])

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  const handleLogout = () => {
    logout()
    console.log('User logged out')
  }

  return (
    <Router>
      <div className={`app min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <HomePage 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme}
              />
            } 
          />
          <Route 
            path="/login" 
            element={
              <LoginPage 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme}
              />
            } 
          />
          <Route 
            path="/signup" 
            element={
              <SignupPage 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme}
              />
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <ForgotPassword 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme}
              />
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/projects" 
            element={
              <ProtectedRoute>
                <ProjectsDashboard 
                  isDarkTheme={isDarkTheme} 
                  toggleTheme={toggleTheme}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projects/:id" 
            element={
              <ProtectedRoute>
                <ProjectDetail 
                  isDarkTheme={isDarkTheme} 
                  toggleTheme={toggleTheme}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <MyTasks 
                  isDarkTheme={isDarkTheme} 
                  toggleTheme={toggleTheme}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile 
                  isDarkTheme={isDarkTheme} 
                  toggleTheme={toggleTheme}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route 
            path="/404" 
            element={
              <NotFound 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme}
              />
            } 
          />
          <Route 
            path="*" 
            element={
              <NotFound 
                isDarkTheme={isDarkTheme} 
                toggleTheme={toggleTheme}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App