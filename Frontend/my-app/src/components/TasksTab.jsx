import { useState } from 'react'
import TaskCard from './TaskCard'
import CreateTaskModal from './CreateTaskModal'

const TasksTab = ({ project, isDarkTheme }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design user interface mockups',
      description: 'Create wireframes and mockups for the main dashboard',
      assignee: { name: 'John Doe', avatar: 'JD' },
      dueDate: '2024-02-15',
      status: 'todo',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Set up database schema',
      description: 'Design and implement the database structure',
      assignee: { name: 'Jane Smith', avatar: 'JS' },
      dueDate: '2024-02-10',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Implement authentication',
      description: 'Add user login and registration functionality',
      assignee: { name: 'Mike Johnson', avatar: 'MJ' },
      dueDate: '2024-02-12',
      status: 'done',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Write API documentation',
      description: 'Document all API endpoints and usage examples',
      assignee: { name: 'Sarah Wilson', avatar: 'SW' },
      dueDate: '2024-02-20',
      status: 'todo',
      priority: 'low'
    }
  ])

  const columns = [
    { id: 'todo', title: 'To Do', color: 'gray' },
    { id: 'in-progress', title: 'In Progress', color: 'blue' },
    { id: 'done', title: 'Done', color: 'green' }
  ]

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'todo'
    }
    setTasks([...tasks, newTask])
    setIsCreateModalOpen(false)
    console.log('New task created:', newTask)
  }

  const handleUpdateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ))
    console.log('Task updated:', taskId, updates)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    console.log('Task deleted:', taskId)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Project Tasks
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage and track your project tasks
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h4 className={`font-medium text-sm px-3 py-1 rounded-full ${
                column.color === 'gray' 
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  : column.color === 'blue'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {column.title}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-[400px]">
              {getTasksByStatus(column.id).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  isDarkTheme={isDarkTheme}
                />
              ))}
              
              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-sm">No tasks yet</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateTask}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  )
}

export default TasksTab
