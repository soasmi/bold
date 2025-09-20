#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Deploying Bold AI Platform...')

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory')
  process.exit(1)
}

try {
  // Install dependencies
  console.log('📦 Installing dependencies...')
  execSync('npm install', { stdio: 'inherit' })

  // Build the project
  console.log('🔨 Building project...')
  execSync('npm run build', { stdio: 'inherit' })

  // Check if Vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'pipe' })
    console.log('✅ Vercel CLI found')
  } catch (error) {
    console.log('📥 Installing Vercel CLI...')
    execSync('npm install -g vercel', { stdio: 'inherit' })
  }

  // Deploy to Vercel
  console.log('🌐 Deploying to Vercel...')
  execSync('vercel --prod', { stdio: 'inherit' })

  console.log('✅ Deployment completed successfully!')
  console.log('🔗 Your app is now live on Vercel')

} catch (error) {
  console.error('❌ Deployment failed:', error.message)
  process.exit(1)
}
