import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const MyTasks = ({ isDarkTheme, toggleTheme, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [filter, setFilter] = useState('all')

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: 'Design user interface mockups',
      description: 'Create wireframes and mockups for the main dashboard',
      project: 'Website Redesign',
      projectId: 1,
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-02-15',
      assignee: { name: 'John Doe', avatar: 'JD' }
    },
    {
      id: 2,
      title: 'Set up database schema',
      description: 'Design and implement the database structure',
      project: 'Mobile App Development',
      projectId: 2,
      status: 'To Do',
      priority: 'High',
      dueDate: '2024-02-10',
      assignee: { name: 'Jane Smith', avatar: 'JS' }
    },
    {
      id: 3,
      title: 'Implement authentication',
      description: 'Add user login and registration functionality',
      project: 'Database Migration',
      projectId: 3,
      status: 'Done',
      priority: 'Medium',
      dueDate: '2024-02-12',
      assignee: { name: 'Mike Johnson', avatar: 'MJ' }
    },
    {
      id: 4,
      title: 'Write API documentation',
      description: 'Document all API endpoints and usage examples',
      project: 'Website Redesign',
      projectId: 1,
      status: 'To Do',
      priority: 'Low',
      dueDate: '2024-02-20',
      assignee: { name: 'Sarah Wilson', avatar: 'SW' }
    },
    {
      id: 5,
      title: 'Review code changes',
      description: 'Review and approve recent code changes',
      project: 'Mobile App Development',
      projectId: 2,
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2024-02-18',
      assignee: { name: 'Tom Brown', avatar: 'TB' }
    }
  ]

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status.toLowerCase().replace(' ', '-') === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const isOverdue = (dueDate, status) => {
    return new Date(dueDate) < new Date() && status !== 'Done'
  }

  return (
    <div className={`min-h-screen flex ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      {/* Sidebar */}
      <Sidebar
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={[]}
        onProjectClick={() => {}}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {/* Navbar */}
        <Navbar
          isDarkTheme={isDarkTheme}
          toggleTheme={toggleTheme}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Tasks
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track and manage your assigned tasks across all projects
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', name: 'All Tasks', count: tasks.length },
                { id: 'to-do', name: 'To Do', count: tasks.filter(t => t.status === 'To Do').length },
                { id: 'in-progress', name: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length },
                { id: 'done', name: 'Done', count: tasks.filter(t => t.status === 'Done').length }
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    filter === filterOption.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {filterOption.name} ({filterOption.count})
                </button>
              ))}
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {task.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <Link
                        to={`/projects/${task.projectId}`}
                        className="flex items-center space-x-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{task.project}</span>
                      </Link>
                      
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={isOverdue(task.dueDate, task.status) ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                          Due {formatDate(task.dueDate)}
                          {isOverdue(task.dueDate, task.status) && ' (Overdue)'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {task.assignee.avatar}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {task.assignee.name}
                      </span>
                    </div>
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'all' 
                  ? "You don't have any tasks assigned yet."
                  : `No tasks with status "${filter.replace('-', ' ')}".`
                }
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default MyTasks
