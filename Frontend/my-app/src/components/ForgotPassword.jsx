import { useState } from 'react'

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Forgot password form submitted:', { email })
    setIsSubmitted(true)
    // Here you would typically handle the forgot password logic
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
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setEmail('')
            }}
            className="form-link font-medium mb-4"
          >
            Try again
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
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="Enter your email address"
          />
        </div>

        <button
          type="submit"
          className="form-button"
        >
          Send Reset Instructions
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