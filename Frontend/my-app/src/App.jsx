import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Footer from './components/Footer'

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)

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

  const switchToSignup = () => {
    setIsLoginForm(false)
  }

  const switchToLogin = () => {
    setIsLoginForm(true)
  }

  return (
    <div className={`app min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme}
        onLoginClick={switchToLogin}
        onSignupClick={switchToSignup}
      />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-black min-h-0">
        <div className="w-full max-w-md">
          {isLoginForm ? (
            <LoginForm onSwitchToSignup={switchToSignup} />
          ) : (
            <SignupForm onSwitchToLogin={switchToLogin} />
          )}
        </div>
      </main>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  )
}

export default App