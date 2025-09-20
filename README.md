# Bold AI - No-Code Platform

A powerful no-code/low-code AI platform that allows users to describe apps in natural language and automatically generates production-ready React, Node.js, and database code.

## Features

- 🤖 **AI Code Generation**: Describe your app in natural language
- 🚀 **One-Click Deployment**: Deploy to Vercel, Netlify, or AWS
- 👀 **Real-time Preview**: See your app come to life instantly
- 📱 **Responsive Design**: Mobile-friendly, modern UI
- 🔐 **Authentication**: Built-in user management
- 📊 **Templates**: 100+ pre-built app templates
- 💾 **Database Integration**: MongoDB/PostgreSQL support
- 📦 **Export Code**: Download clean, production-ready code

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   MONGODB_URI=mongodb://localhost:27017/boldai
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_here
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
bold-ai-platform/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ChatInterface.tsx  # Main chat UI
│   ├── CodePreview.tsx    # Code display
│   ├── LivePreview.tsx    # Live preview
│   ├── TemplateGallery.tsx # Template browser
│   └── ...               # Other components
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication
├── services/              # Business logic
│   └── CodeGenerationService.ts # AI code generation
└── ...                   # Config files
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: OpenAI GPT-4 API
- **Database**: MongoDB, PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Vercel, Netlify, AWS

## Usage

1. **Describe your app**: Use natural language to describe what you want to build
2. **AI generates code**: Get production-ready React, Node.js, and database code
3. **Preview live**: See your app running in real-time
4. **Deploy instantly**: One-click deployment to your preferred platform
5. **Export & customize**: Download clean code for further customization

## API Endpoints

- `POST /api/generate` - Generate code from description
- `POST /api/deploy` - Deploy app to cloud
- `GET /api/templates` - Get available templates
- `POST /api/auth/signin` - User authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- 📧 Email: support@boldai.dev
- 💬 Discord: [Join our community](https://discord.gg/boldai)
- 📖 Docs: [docs.boldai.dev](https://docs.boldai.dev)
