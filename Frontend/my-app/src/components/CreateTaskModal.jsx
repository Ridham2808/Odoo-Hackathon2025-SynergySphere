import { useState } from 'react'

const CreateTaskModal = ({ isOpen, onClose, onSubmit, isDarkTheme }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    assignee: ''
  })

  // Mock team members
  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', avatar: 'MJ' },
    { id: 4, name: 'Sarah Wilson', avatar: 'SW' },
    { id: 5, name: 'Tom Brown', avatar: 'TB' },
    { id: 6, name: 'Alex Chen', avatar: 'AC' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      const selectedMember = teamMembers.find(m => m.id === parseInt(formData.assignee))
      onSubmit({
        ...formData,
        assignee: selectedMember || teamMembers[0]
      })
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        assignee: ''
      })
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      assignee: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden ${
        window.innerWidth < 768 ? 'mx-4' : ''
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Task
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="form-input resize-none"
              placeholder="Describe the task..."
            />
          </div>

          {/* Due Date and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assign to
            </label>
            <select
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select a team member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTaskModal
