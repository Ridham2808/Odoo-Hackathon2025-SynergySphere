import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = ({ isDarkTheme, toggleTheme }) => {
  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  )
}

export default NotFound
