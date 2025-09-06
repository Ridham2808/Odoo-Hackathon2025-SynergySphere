import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showResetForm, setShowResetForm] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { forgotPassword, resetPassword, clearError } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await forgotPassword(email)
      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await resetPassword(email, otp, newPassword)
      if (result.success) {
        alert('Password reset successfully! Please login with your new password.')
        onBackToLogin()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryAgain = () => {
    setIsSubmitted(false)
    setShowResetForm(false)
    setEmail('')
    setError('')
  }

  if (showResetForm) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black p-8 w-full border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Reset Your Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter the OTP sent to <strong>{email}</strong> and your new password
          </p>
        </div>

        <form onSubmit={handleResetSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={isLoading}
              maxLength="6"
              className="form-input disabled:opacity-50 disabled:cursor-not-allowed text-center text-2xl tracking-widest"
              placeholder="000000"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
              className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter new password"
              minLength="6"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Confirm new password"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6 || newPassword !== confirmPassword}
            className="form-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleTryAgain}
              className="form-link font-medium"
            >
              Back to Forgot Password
            </button>
          </div>
        </form>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black p-8 w-full border border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Check your email
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a password reset OTP to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <button
            onClick={() => setShowResetForm(true)}
            className="form-button mb-4"
          >
            Enter OTP & Reset Password
          </button>
          <div className="text-center">
            <button
              onClick={handleTryAgain}
              className="form-link font-medium mb-4"
            >
              Try again
            </button>
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
              </span>
              <button
                type="button"
                onClick={onBackToLogin}
                className="form-link font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black p-8 w-full border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) clearError()
            }}
            required
            disabled={isLoading}
            className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your email address"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="form-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Reset Instructions'
          )}
        </button>

        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
          </span>
          <button
            type="button"
            onClick={onBackToLogin}
            className="form-link font-medium"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword