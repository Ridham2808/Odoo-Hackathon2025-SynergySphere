import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ForgotPasswordForm from '../components/ForgotPassword'

const ForgotPassword = ({ isDarkTheme, toggleTheme }) => {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
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
          <ForgotPasswordForm 
            onBackToLogin={handleBackToLogin}
          />
        </div>
      </main>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  )
}

export default ForgotPassword