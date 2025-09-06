import { useState, useRef, useEffect } from 'react'

const DiscussionsTab = ({ project, isDarkTheme }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: { name: 'John Doe', avatar: 'JD' },
      content: 'Welcome to the project! Let\'s start by discussing the initial requirements.',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'message'
    },
    {
      id: 2,
      author: { name: 'Jane Smith', avatar: 'JS' },
      content: 'I\'ve completed the database schema design. Here\'s the ERD:',
      timestamp: '2024-01-15T11:15:00Z',
      type: 'message'
    },
    {
      id: 3,
      author: { name: 'Mike Johnson', avatar: 'MJ' },
      content: 'Great work Jane! The schema looks solid. I\'ll start working on the API endpoints.',
      timestamp: '2024-01-15T11:45:00Z',
      type: 'message'
    },
    {
      id: 4,
      author: { name: 'Sarah Wilson', avatar: 'SW' },
      content: 'I\'ve updated the project timeline. Please check the new deadlines.',
      timestamp: '2024-01-15T14:20:00Z',
      type: 'system'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        author: { name: 'You', avatar: 'YO' },
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        type: 'message'
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Project Discussions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Collaborate and communicate with your team
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-3 ${
              message.type === 'system' ? 'justify-center' : ''
            }`}
          >
            {message.type === 'system' ? (
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-2 rounded-lg text-sm">
                {message.content}
              </div>
            ) : (
              <>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    {message.author.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {message.author.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

export default DiscussionsTab
