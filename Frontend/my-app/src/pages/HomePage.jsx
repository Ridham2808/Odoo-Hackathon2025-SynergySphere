import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HomePage = ({ isDarkTheme, toggleTheme }) => {
  const features = [
    {
      icon: '📋',
      title: 'Task Management',
      description: 'Organize and track tasks with intuitive kanban boards and project timelines.'
    },
    {
      icon: '💬',
      title: 'Team Communication',
      description: 'Stay connected with real-time discussions and threaded conversations.'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor project progress with visual dashboards and detailed analytics.'
    },
    {
      icon: '🔍',
      title: 'Proactive Insights',
      description: 'Get intelligent recommendations and insights to optimize team performance.'
    }
  ]

  return (
    <div className={`min-h-screen flex flex-col ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      <Navbar 
        isDarkTheme={isDarkTheme} 
        toggleTheme={toggleTheme}
      />
      
      {/* Hero Section */}
      <section className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              SynergySphere
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              Empower Your Team
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Streamline tasks, enhance communication, and track progress with our comprehensive team collaboration platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Login
              </Link>
              <button className="w-full sm:w-auto text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything Your Team Needs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to enhance collaboration and boost productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  )
}

export default HomePage
