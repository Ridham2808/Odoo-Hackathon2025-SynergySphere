import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import CreateProjectModal from '../components/CreateProjectModal'

const ProjectsDashboard = ({ isDarkTheme, toggleTheme, onLogout }) => {
  const [projects, setProjects] = useState([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  // Mock data for MVP
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        name: 'Website Redesign',
        description: 'Complete overhaul of the company website with modern design and improved UX',
        status: 'In Progress',
        progress: 65,
        tasksCompleted: 13,
        totalTasks: 20,
        members: [
          { name: 'John Doe', avatar: 'JD' },
          { name: 'Jane Smith', avatar: 'JS' },
          { name: 'Mike Johnson', avatar: 'MJ' }
        ],
        dueDate: '2024-03-15',
        priority: 'High'
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'Building a cross-platform mobile application for iOS and Android',
        status: 'Planning',
        progress: 25,
        tasksCompleted: 5,
        totalTasks: 20,
        members: [
          { name: 'Sarah Wilson', avatar: 'SW' },
          { name: 'Tom Brown', avatar: 'TB' }
        ],
        dueDate: '2024-04-30',
        priority: 'Medium'
      },
      {
        id: 3,
        name: 'Database Migration',
        description: 'Migrating legacy database to new cloud infrastructure',
        status: 'Completed',
        progress: 100,
        tasksCompleted: 8,
        totalTasks: 8,
        members: [
          { name: 'Alex Chen', avatar: 'AC' },
          { name: 'Lisa Davis', avatar: 'LD' }
        ],
        dueDate: '2024-02-28',
        priority: 'High'
      }
    ]
    setProjects(mockProjects)
  }, [])

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      status: 'Planning',
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 0,
      members: projectData.members || []
    }
    setProjects([...projects, newProject])
    setIsCreateModalOpen(false)
    console.log('New project created:', newProject)
    // Navigate to the new project
    navigate(`/projects/${newProject.id}`)
  }

  const handleEditProject = (projectId) => {
    console.log('Edit project:', projectId)
    // TODO: Implement edit functionality
  }

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
    console.log('Project deleted:', projectId)
  }

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`)
  }

  return (
    <div className={`min-h-screen flex ${isDarkTheme ? 'dark' : ''} bg-gray-50 dark:bg-black`}>
      {/* Sidebar */}
      <Sidebar
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        projects={projects}
        onProjectClick={handleProjectClick}
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

        {/* Main Dashboard */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Projects
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage and track your team's projects
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>New Project</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {projects.filter(p => p.status === 'Completed').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {projects.filter(p => p.status === 'In Progress').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Members</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.max(...projects.map(p => p.members.length), 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onClick={() => handleProjectClick(project.id)}
                isDarkTheme={isDarkTheme}
              />
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
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
          )}
        </main>
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  )
}

export default ProjectsDashboard
