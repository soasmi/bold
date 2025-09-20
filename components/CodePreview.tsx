'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CodeBracketIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'

interface CodePreviewProps {
  code: {
    frontend: string
    backend: string
    database: string
  } | null
}

export function CodePreview({ code }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database'>('frontend')
  const [copied, setCopied] = useState(false)

  if (!code) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <CodeBracketIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No code generated yet. Start a conversation to see generated code.</p>
        </div>
      </div>
    )
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const getLanguage = (tab: string) => {
    switch (tab) {
      case 'frontend':
        return 'jsx'
      case 'backend':
        return 'javascript'
      case 'database':
        return 'sql'
      default:
        return 'javascript'
    }
  }

  const getTabIcon = (tab: string) => {
    return <CodeBracketIcon className="w-4 h-4" />
  }

  const tabs = [
    { id: 'frontend', label: 'Frontend', content: code.frontend },
    { id: 'backend', label: 'Backend', content: code.backend },
    { id: 'database', label: 'Database', content: code.database },
  ] as const

  return (
    <div className="flex-1 flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center ${
              activeTab === tab.id
                ? 'text-primary-600 border-b-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {getTabIcon(tab.id)}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => copyToClipboard(tabs.find(t => t.id === activeTab)?.content || '')}
            className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <ClipboardDocumentIcon className="w-4 h-4" />
            )}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          <SyntaxHighlighter
            language={getLanguage(activeTab)}
            style={tomorrow}
            customStyle={{
              margin: 0,
              height: '100%',
              borderRadius: '0.5rem',
              fontSize: '14px',
            }}
            showLineNumbers
            wrapLines
          >
            {tabs.find(t => t.id === activeTab)?.content || ''}
          </SyntaxHighlighter>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Generated {new Date().toLocaleString()}
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Download ZIP
          </button>
          <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Deploy App
          </button>
        </div>
      </div>
    </div>
  )
}
