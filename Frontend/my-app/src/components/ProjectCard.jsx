import { useState } from 'react'

const ProjectCard = ({ project, onClick, onDelete, isDarkTheme }) => {
  const [showActions, setShowActions] = useState(false)

  const progressPercentage = project.totalTasks > 0 
    ? Math.round((project.tasksCompleted / project.totalTasks) * 100)
    : 0

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-800 group`}
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            {showActions && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300 p-1 rounded transition-colors"
                title="Delete project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {project.tasksCompleted}/{project.totalTasks} tasks
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {progressPercentage}% complete
            </span>
          </div>
        </div>

        {/* Members */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Team Members
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {project.members.length} members
            </span>
          </div>
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((member, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white dark:border-gray-900"
                title={member.name}
              >
                {member.avatar}
              </div>
            ))}
            {project.members.length > 4 && (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white dark:border-gray-900">
                +{project.members.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
