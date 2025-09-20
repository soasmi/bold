'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperAirplaneIcon, CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline'
import { CodeGenerationService } from '@/services/CodeGenerationService'
import { MessageBubble } from '@/components/MessageBubble'
import { CodePreview } from '@/components/CodePreview'
import { LivePreview } from '@/components/LivePreview'
import toast from 'react-hot-toast'

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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeView, setActiveView] = useState<'chat' | 'code' | 'preview'>('chat')
  const [generatedCode, setGeneratedCode] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsGenerating(true)

    try {
      const codeGenerationService = new CodeGenerationService()
      const response = await codeGenerationService.generateCode(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.explanation,
        timestamp: new Date(),
        code: response.code
      }

      setMessages(prev => [...prev, assistantMessage])
      setGeneratedCode(response.code)
      toast.success('Code generated successfully!')
    } catch (error) {
      console.error('Error generating code:', error)
      toast.error('Failed to generate code. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const suggestedPrompts = [
    "Build a task management app with user authentication",
    "Create an e-commerce store with product catalog and cart",
    "Make a blog platform with admin dashboard",
    "Build a CRM system for managing customers",
    "Create a real-time chat application",
    "Make a project management dashboard"
  ]

  return (
    <div className="h-[600px] flex flex-col">
      {/* View Toggle */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveView('chat')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeView === 'chat'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <CodeBracketIcon className="w-4 h-4 inline mr-2" />
          Chat
        </button>
        <button
          onClick={() => setActiveView('code')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeView === 'code'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <CodeBracketIcon className="w-4 h-4 inline mr-2" />
          Code
        </button>
        <button
          onClick={() => setActiveView('preview')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeView === 'preview'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <EyeIcon className="w-4 h-4 inline mr-2" />
          Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {activeView === 'chat' && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <CodeBracketIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Start building your app
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Describe what you want to build and I'll generate the code for you.
                  </p>
                  
                  {/* Suggested prompts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                    {suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(prompt)}
                        className="text-left p-3 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500"></div>
                  <span>Generating code...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your app idea..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={!input.trim() || isGenerating}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </>
        )}

        {activeView === 'code' && (
          <CodePreview code={generatedCode} />
        )}

        {activeView === 'preview' && (
          <LivePreview code={generatedCode} />
        )}
      </div>
    </div>
  )
}
