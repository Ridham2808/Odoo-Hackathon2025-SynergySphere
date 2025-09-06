import { useState } from 'react'

const Navbar = ({ isDarkTheme, toggleTheme, onLoginClick, onSignupClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Work', href: '#' },
    { name: 'About', href: '#' },
  ]

  return (
    <nav className="bg-white dark:bg-black shadow-sm dark:shadow-gray-900/50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              SynergySphere
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={onLoginClick}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={onSignupClick}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 border dark:border-gray-700"
              aria-label="Toggle theme"
            >
              {isDarkTheme ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="space-y-1">
                <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-900 rounded-lg mt-2 border border-gray-200 dark:border-gray-700">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md dark:hover:bg-gray-800"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onLoginClick()
                  setIsMobileMenuOpen(false)
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left rounded-md dark:hover:bg-gray-800"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onSignupClick()
                  setIsMobileMenuOpen(false)
                }}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 w-full mt-2"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar