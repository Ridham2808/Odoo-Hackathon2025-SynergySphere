import { useState } from 'react'
import AddMemberModal from './AddMemberModal'

const MembersTab = ({ project, isDarkTheme }) => {
  const [members, setMembers] = useState(project.members || [])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Mock available members to add
  const availableMembers = [
    { id: 1, name: 'Alex Chen', email: 'alex@example.com', avatar: 'AC', role: 'Developer' },
    { id: 2, name: 'Lisa Davis', email: 'lisa@example.com', avatar: 'LD', role: 'Designer' },
    { id: 3, name: 'David Lee', email: 'david@example.com', avatar: 'DL', role: 'Manager' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', avatar: 'EW', role: 'Tester' },
    { id: 5, name: 'Ryan Brown', email: 'ryan@example.com', avatar: 'RB', role: 'Developer' }
  ]

  const handleAddMember = (memberData) => {
    const newMember = {
      id: Date.now(),
      name: memberData.name,
      email: memberData.email,
      avatar: memberData.avatar,
      role: memberData.role || 'Member'
    }
    setMembers([...members, newMember])
    setIsAddModalOpen(false)
    console.log('Member added:', newMember)
  }

  const handleRemoveMember = (memberId) => {
    setMembers(members.filter(m => m.id !== memberId))
    console.log('Member removed:', memberId)
  }

  const handleRoleChange = (memberId, newRole) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
    console.log('Member role updated:', memberId, newRole)
  }

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'manager':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'developer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'designer':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'tester':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Team Members
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage project team members and their roles
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add Member</span>
        </button>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {members.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No team members yet
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add team members to start collaborating
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Add First Member
            </button>
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* Role Selector */}
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Tester">Tester</option>
                  </select>
                  
                  {/* Role Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 transition-colors"
                    title="Remove member"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <AddMemberModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddMember}
          availableMembers={availableMembers}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  )
}

export default MembersTab
