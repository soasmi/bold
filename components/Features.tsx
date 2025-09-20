'use client'

import { motion } from 'framer-motion'
import { 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  CloudIcon, 
  ShieldCheckIcon,
  CpuChipIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: CodeBracketIcon,
    title: 'AI Code Generation',
    description: 'Describe your app in natural language and get production-ready React, Node.js, and database code.',
    color: 'text-blue-500'
  },
  {
    icon: RocketLaunchIcon,
    title: 'One-Click Deployment',
    description: 'Deploy your generated apps instantly to Vercel, Netlify, or AWS with zero configuration.',
    color: 'text-green-500'
  },
  {
    icon: CloudIcon,
    title: 'Real-time Preview',
    description: 'See your app come to life with live preview and drag-and-drop editing capabilities.',
    color: 'text-purple-500'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Production Ready',
    description: 'Generated code follows best practices with authentication, security, and scalability built-in.',
    color: 'text-red-500'
  },
  {
    icon: CpuChipIcon,
    title: 'Smart Templates',
    description: 'Choose from 100+ pre-built templates for common app types like e-commerce, CRM, and dashboards.',
    color: 'text-yellow-500'
  },
  {
    icon: ArrowsPointingOutIcon,
    title: 'Export & Customize',
    description: 'Download clean, well-documented code that you can customize and extend as needed.',
    color: 'text-indigo-500'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to build apps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From idea to production in minutes, not months. Our AI platform handles the complexity 
            so you can focus on your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 flex items-center justify-center ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to build your next app?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of developers and founders who are building faster with AI.
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
