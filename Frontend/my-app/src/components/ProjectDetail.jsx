import { useState } from 'react'
import TasksTab from './TasksTab'
import DiscussionsTab from './DiscussionsTab'
import MembersTab from './MembersTab'

const ProjectDetail = ({ project, onClose, isDarkTheme }) => {
  const [activeTab, setActiveTab] = useState('tasks')

  const tabs = [
    { id: 'tasks', name: 'Tasks', icon: '📋' },
    { id: 'discussions', name: 'Discussions', icon: '💬' },
    { id: 'members', name: 'Members', icon: '👥' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TasksTab project={project} isDarkTheme={isDarkTheme} />
      case 'discussions':
        return <DiscussionsTab project={project} isDarkTheme={isDarkTheme} />
      case 'members':
        return <MembersTab project={project} isDarkTheme={isDarkTheme} />
      default:
        return <TasksTab project={project} isDarkTheme={isDarkTheme} />
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden ${
        window.innerWidth < 768 ? 'mx-4' : ''
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              
              {/* Project Stats */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">Progress:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">Members:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {project.members.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Planning' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : project.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
