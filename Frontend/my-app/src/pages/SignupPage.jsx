import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SignupForm from '../components/SignupForm'

const SignupPage = ({ isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate()

  const handleSwitchToLogin = () => {
    navigate('/login')
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-black min-h-0">
        <div className="w-full max-w-md">
          <SignupForm 
            onSwitchToLogin={handleSwitchToLogin}
          />
        </div>
      </main>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  )
}

export default SignupPage
