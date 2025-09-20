'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, ArrowTopRightOnSquareIcon, RefreshIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface LivePreviewProps {
  code: {
    frontend: string
    backend: string
    database: string
  } | null
}

export function LivePreview({ code }: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (code) {
      generatePreview()
    }
  }, [code])

  const generatePreview = async () => {
    if (!code) return

    setIsLoading(true)
    setError(null)

    try {
      // Simulate preview generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, this would:
      // 1. Send code to a preview service
      // 2. Build and deploy to a temporary URL
      // 3. Return the preview URL
      
      setPreviewUrl('https://preview.boldai.dev/example-app')
      toast.success('Preview generated successfully!')
    } catch (err) {
      setError('Failed to generate preview. Please try again.')
      toast.error('Failed to generate preview')
    } finally {
      setIsLoading(false)
    }
  }

  if (!code) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <EyeIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No code generated yet. Start a conversation to see live preview.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Preview Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <EyeIcon className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-900">Live Preview</span>
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshIcon className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={generatePreview}
            disabled={isLoading}
            className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors flex items-center"
          >
            <RefreshIcon className="w-4 h-4 mr-1" />
            Refresh
          </button>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
              Open in New Tab
            </a>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Building your app...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a few moments</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center bg-red-50">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-red-700 font-medium">{error}</p>
              <button
                onClick={generatePreview}
                className="mt-4 px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : previewUrl ? (
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <EyeIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">Click "Refresh" to generate preview</p>
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <span className={`ml-2 ${
              isLoading ? 'text-yellow-600' : 
              error ? 'text-red-600' : 
              previewUrl ? 'text-green-600' : 'text-gray-600'
            }`}>
              {isLoading ? 'Building...' : 
               error ? 'Error' : 
               previewUrl ? 'Live' : 'Ready'}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Framework:</span>
            <span className="ml-2 text-gray-600">React + Next.js</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Last Updated:</span>
            <span className="ml-2 text-gray-600">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
