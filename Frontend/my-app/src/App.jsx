import { useState } from 'react'
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

  const switchToSignup = () => {
    setIsLoginForm(false)
  }

  const switchToLogin = () => {
    setIsLoginForm(true)
  }

  return (
    <div className={`app min-h-screen ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme}
        onLoginClick={switchToLogin}
        onSignupClick={switchToSignup}
      />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {isLoginForm ? (
            <LoginForm onSwitchToSignup={switchToSignup} />
          ) : (
            <SignupForm onSwitchToLogin={switchToLogin} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App