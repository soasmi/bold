'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingCartIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<any>
  features: string[]
  complexity: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  preview: string
}

const templates: Template[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Complete online store with product catalog, cart, checkout, and payment integration',
    category: 'Business',
    icon: ShoppingCartIcon,
    features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order management', 'User accounts'],
    complexity: 'Intermediate',
    estimatedTime: '2-3 hours',
    preview: '/templates/ecommerce-preview.png'
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Data visualization dashboard with charts, metrics, and real-time updates',
    category: 'Analytics',
    icon: ChartBarIcon,
    features: ['Interactive charts', 'Real-time data', 'Custom metrics', 'Export reports', 'Responsive design'],
    complexity: 'Advanced',
    estimatedTime: '3-4 hours',
    preview: '/templates/dashboard-preview.png'
  },
  {
    id: 'crm',
    name: 'CRM System',
    description: 'Customer relationship management with contacts, deals, and pipeline tracking',
    category: 'Business',
    icon: UserGroupIcon,
    features: ['Contact management', 'Deal tracking', 'Pipeline views', 'Task management', 'Email integration'],
    complexity: 'Advanced',
    estimatedTime: '4-5 hours',
    preview: '/templates/crm-preview.png'
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    description: 'Content management system for blogs with admin panel and SEO optimization',
    category: 'Content',
    icon: DocumentTextIcon,
    features: ['Article editor', 'SEO optimization', 'Comment system', 'Admin panel', 'Search functionality'],
    complexity: 'Beginner',
    estimatedTime: '1-2 hours',
    preview: '/templates/blog-preview.png'
  },
  {
    id: 'chat',
    name: 'Real-time Chat',
    description: 'Messaging application with real-time communication and file sharing',
    category: 'Communication',
    icon: ChatBubbleLeftRightIcon,
    features: ['Real-time messaging', 'File sharing', 'Group chats', 'Message history', 'Online status'],
    complexity: 'Intermediate',
    estimatedTime: '2-3 hours',
    preview: '/templates/chat-preview.png'
  },
  {
    id: 'saas',
    name: 'SaaS Dashboard',
    description: 'Software as a Service dashboard with subscription management and billing',
    category: 'Business',
    icon: BuildingOfficeIcon,
    features: ['Subscription plans', 'Billing management', 'User onboarding', 'Feature flags', 'Usage analytics'],
    complexity: 'Advanced',
    estimatedTime: '4-6 hours',
    preview: '/templates/saas-preview.png'
  },
  {
    id: 'learning',
    name: 'Learning Platform',
    description: 'Online course platform with video streaming and progress tracking',
    category: 'Education',
    icon: AcademicCapIcon,
    features: ['Video streaming', 'Course progress', 'Quizzes', 'Certificates', 'Discussion forums'],
    complexity: 'Intermediate',
    estimatedTime: '3-4 hours',
    preview: '/templates/learning-preview.png'
  },
  {
    id: 'healthcare',
    name: 'Healthcare App',
    description: 'Patient management system with appointment scheduling and medical records',
    category: 'Healthcare',
    icon: HeartIcon,
    features: ['Patient records', 'Appointment booking', 'Medical history', 'Prescription management', 'Telemedicine'],
    complexity: 'Advanced',
    estimatedTime: '5-6 hours',
    preview: '/templates/healthcare-preview.png'
  }
]

const categories = ['All', 'Business', 'Analytics', 'Content', 'Communication', 'Education', 'Healthcare']

export function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Template Preview */}
            <div className="h-48 bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center">
              <template.icon className="w-16 h-16 text-primary-500" />
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                  {template.complexity}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Features:</span> {template.features.slice(0, 3).join(', ')}
                  {template.features.length > 3 && ` +${template.features.length - 3} more`}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Time:</span> {template.estimatedTime}
                </div>
              </div>

              <button className="w-full mt-4 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium">
                Use Template
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Template Modal */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTemplate(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <selectedTemplate.icon className="w-8 h-8 text-primary-500" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                    <p className="text-gray-600">{selectedTemplate.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-700 mb-6">{selectedTemplate.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
                  <ul className="space-y-1">
                    {selectedTemplate.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Complexity:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(selectedTemplate.complexity)}`}>
                        {selectedTemplate.complexity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Time:</span>
                      <span className="text-gray-900">{selectedTemplate.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-gray-900">{selectedTemplate.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium">
                  Start Building
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
