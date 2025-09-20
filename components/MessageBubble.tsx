'use client'

import { motion } from 'framer-motion'
import { UserIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  code?: {
    frontend: string
    backend: string
    database: string
  }
}

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {isUser ? (
              <UserIcon className="w-5 h-5" />
            ) : (
              <CodeBracketIcon className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Message content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-primary-500 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-900 rounded-bl-md'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {/* Code preview if available */}
          {message.code && (
            <div className="mt-2 w-full max-w-2xl">
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs font-mono overflow-x-auto">
                <div className="text-green-400 mb-2">// Generated Code Preview</div>
                <div className="text-blue-400">Frontend: React components</div>
                <div className="text-yellow-400">Backend: Node.js API</div>
                <div className="text-purple-400">Database: Schema & migrations</div>
              </div>
            </div>
          )}

          <span className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
