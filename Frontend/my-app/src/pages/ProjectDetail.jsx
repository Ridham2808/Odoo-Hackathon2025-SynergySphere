import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TasksTab from '../components/TasksTab'
import DiscussionsTab from '../components/DiscussionsTab'
import MembersTab from '../components/MembersTab'

const ProjectDetail = ({ isDarkTheme, toggleTheme, onLogout }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [activeTab, setActiveTab] = useState('tasks')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock project data
  useEffect(() => {
    const mockProject = {
      id: parseInt(id),
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'In Progress',
      progress: 65,
      tasksCompleted: 13,
      totalTasks: 20,
      members: [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'JD', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'JS', role: 'Developer' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'MJ', role: 'Designer' }
      ],
      dueDate: '2024-03-15',
      priority: 'High'
    }
    setProject(mockProject)
  }, [id])

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

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      {/* Sidebar */}
      <Sidebar
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={[project]}
        onProjectClick={(projectId) => navigate(`/projects/${projectId}`)}
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

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/projects')}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Back to projects"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Project Stats */}
                <div className="flex items-center space-x-6 text-sm">
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

                {/* Edit Button */}
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-6">
            <nav className="flex space-x-8" aria-label="Tabs">
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
