import { useState } from 'react'

const TaskCard = ({ task, onUpdate, onDelete, isDarkTheme }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const handleSave = () => {
    onUpdate(task.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority
    })
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { status: newStatus })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200 ${
      isOverdue ? 'border-red-300 dark:border-red-700' : ''
    }`}>
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
            placeholder="Task description"
          />
          <div className="flex space-x-2">
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {task.title}
            </h4>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Priority Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            
            {/* Status Dropdown */}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                {task.assignee.avatar}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {task.assignee.name}
              </span>
            </div>
            <div className={`text-xs ${
              isOverdue 
                ? 'text-red-600 dark:text-red-400 font-medium' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {isOverdue && '⚠️ '}
              {formatDate(task.dueDate)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskCard
