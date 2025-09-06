import { useState, useEffect } from 'react'
import CreateProjectModal from './CreateProjectModal'
import ProjectCard from './ProjectCard'
import ProjectDetail from './ProjectDetail'

const Dashboard = ({ isDarkTheme, toggleTheme, onLogout }) => {
  const [projects, setProjects] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Mock data for MVP
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        name: 'E-commerce Website',
        description: 'Build a modern e-commerce platform with React and Node.js',
        tasksCompleted: 8,
        totalTasks: 12,
        members: [
          { name: 'John Doe', role: 'Admin', avatar: 'JD' },
          { name: 'Jane Smith', role: 'Member', avatar: 'JS' },
          { name: 'Mike Johnson', role: 'Member', avatar: 'MJ' }
        ],
        createdAt: '2024-01-15',
        status: 'In Progress'
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'iOS and Android app for project management',
        tasksCompleted: 15,
        totalTasks: 20,
        members: [
          { name: 'Sarah Wilson', role: 'Admin', avatar: 'SW' },
          { name: 'Tom Brown', role: 'Member', avatar: 'TB' }
        ],
        createdAt: '2024-01-10',
        status: 'In Progress'
      },
      {
        id: 3,
        name: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for business insights',
        tasksCompleted: 5,
        totalTasks: 8,
        members: [
          { name: 'Alex Chen', role: 'Admin', avatar: 'AC' },
          { name: 'Lisa Davis', role: 'Member', avatar: 'LD' },
          { name: 'David Lee', role: 'Member', avatar: 'DL' }
        ],
        createdAt: '2024-01-20',
        status: 'Planning'
      }
    ]
    setProjects(mockProjects)
  }, [])

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      tasksCompleted: 0,
      totalTasks: 0,
      members: projectData.members || [],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Planning'
    }
    setProjects([...projects, newProject])
    setIsCreateModalOpen(false)
    console.log('New project created:', newProject)
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    console.log('Project selected:', project)
  }

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
    console.log('Project deleted:', projectId)
  }

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
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
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Home
                </a>
                <a href="#" className="text-primary-600 dark:text-primary-400 font-semibold px-3 py-2 text-sm transition-colors duration-200">
                  Projects
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Teams
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Profile
                </a>
              </div>
            </div>

            {/* Theme Toggle & Logout */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
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

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your team projects and collaborate effectively
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              + New Project
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by creating your first project
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
                onDelete={() => handleDeleteProject(project.id)}
                isDarkTheme={isDarkTheme}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-6 right-6 md:hidden bg-primary-600 hover:bg-primary-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
        aria-label="Create new project"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
          isDarkTheme={isDarkTheme}
        />
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  )
}

export default Dashboard
