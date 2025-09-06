import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showOTPForm, setShowOTPForm] = useState(false)
  const [otp, setOtp] = useState('')

  const { register, verifyEmail, resendVerification, clearError } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    if (error) clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Use & Privacy Policy')
      return
    }
    
    setIsLoading(true)
    setError('')

    try {
      const result = await register(formData)
      if (result.success) {
        setShowOTPForm(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await verifyEmail(formData.email, otp)
      if (result.success) {
        // Email verified successfully
        console.log('Email verified successfully')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError('')

    try {
      const result = await resendVerification(formData.email)
      if (result.success) {
        alert('OTP sent successfully!')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  if (showOTPForm) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black p-8 w-full border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We've sent a 6-digit verification code to <strong>{formData.email}</strong>
          </p>
        </div>

        <form onSubmit={handleOTPSubmit} className="space-y-6">
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

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="form-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Didn't receive the code?
            </p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading}
              className="form-link font-medium"
            >
              Resend Code
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black p-8 w-full border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create an account
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Join SynergySphere and start collaborating with your team.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="form-input disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Create a password"
            minLength="6"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Must contain at least 6 characters with uppercase, lowercase, and number
          </p>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="form-link">
                Terms of Use
              </a>{' '}
              &{' '}
              <a href="#" className="form-link">
                Privacy Policy
              </a>
            </label>
          </div>
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
              Creating account...
            </>
          ) : (
            'Create an account'
          )}
        </button>

        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="form-link font-medium"
          >
            Login instead
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm