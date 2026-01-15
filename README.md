# 🌌 AlgoVerse - Unified Algorithm Intelligence Platform

> A premium, interactive platform for exploring, visualizing, and mastering 1000+ algorithms across 11 computer science domains with multi-language support and AI-powered features.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green)](https://nodejs.org/)

---

## 🚀 Features

### 🎯 Core Capabilities
- **1000+ Algorithms** organized across 11 domains (DSA, DAA, AI, ML, Networks, Security, Systems, Graphics, Optimization, Emerging, Theory)
- **Interactive Visualizations** with real-time step-by-step execution
- **In-Platform Code Compiler** supporting Python, JavaScript, TypeScript, Java, and C++
- **Performance Benchmarking** with complexity analysis and comparison tools
- **AI-Powered Recommendations** using Google Gemini for personalized learning paths
- **Multi-Language Support** (English, Tamil தமிழ், Hindi हिन्दी)

### 🛡️ Architecture Highlights
- **Backend API Gateway** - Secure Supabase proxy preventing client-side key exposure
- **Express Backend** - RESTful API for all database operations
- **Type-Safe Frontend** - Full TypeScript implementation with strict mode
- **Responsive Design** - Optimized for desktop, tablet, and mobile

### 🎓 Learning Ecosystem
- **Skill Graph** - Visual knowledge mapping with prerequisite tracking
- **Algorithm Battle** - Real-time performance comparisons
- **Daily Protocol** - Gamified daily challenges with streak tracking
- **Flashcards** - 3D flip-based active recall system
- **Practice Problems** - Integrated LeetCode/Codeforces problem solver

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Environment Setup](#-environment-setup)
- [Development](#-development)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Internationalization](#-internationalization)
- [Contributing](#-contributing)

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** 20.x or higher
- **npm** or **pnpm**
- **Supabase Account** (optional, falls back to mock data)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/algoverse.git
cd algoverse

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Running the Application

```bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🏗️ Architecture

### Backend API Gateway Pattern

AlgoVerse implements a secure **Backend API Gateway** architecture where the frontend never communicates directly with Supabase:

```
┌─────────────┐      HTTP/REST      ┌──────────────┐      Supabase SDK      ┌──────────────┐
│   Frontend  │ ───────────────────> │   Express    │ ───────────────────────> │   Supabase   │
│  (React)    │ <─────────────────── │   Backend    │ <─────────────────────── │   Database   │
└─────────────┘      JSON Response   └──────────────┘      Query Results      └──────────────┘
```

**Benefits:**
- 🔒 API keys never exposed to the client
- 🛡️ Centralized authentication and authorization
- 📊 Request logging and rate limiting
- 🔄 Easy migration to other databases

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing-fast builds
- Framer Motion for animations
- TailwindCSS + shadcn/ui for styling
- i18next for internationalization
- Monaco Editor for code editing

**Backend:**
- Express.js with TypeScript
- Supabase (PostgreSQL) for database
- CORS-enabled RESTful API
- dotenv for environment management

**AI Integration:**
- Google Gemini API for code generation and recommendations

---

## 📁 Project Structure

```
algoverse/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── OnlineCompiler.tsx    # Code editor and runner
│   │   ├── SkillGraph.tsx        # Knowledge map visualization
│   │   ├── AlgorithmBattle.tsx   # Performance comparison
│   │   ├── Flashcard.tsx         # Active recall cards
│   │   └── LanguageSwitcher.tsx  # i18n language selector
│   ├── pages/                    # Route components
│   │   ├── Landing.tsx           # Homepage
│   │   ├── Dashboard.tsx         # Algorithm browser
│   │   ├── AlgorithmDetail.tsx   # Individual algorithm page
│   │   ├── Learn.tsx             # Learning hub
│   │   ├── Visualize.tsx         # Visualization playground
│   │   └── Benchmark.tsx         # Performance testing
│   ├── lib/                      # Utilities and data
│   │   ├── supabase.ts           # Backend proxy adapter
│   │   ├── all-algorithms.ts     # 1000 algorithm dataset
│   │   ├── algorithms-data.ts    # Domain categorization
│   │   └── gemini-ai.ts          # AI integration
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-algorithms.ts     # Algorithm data fetching
│   │   ├── use-auth.ts           # Authentication logic
│   │   └── use-mastery.ts        # Progress tracking
│   ├── i18n.ts                   # Internationalization config
│   └── main.tsx                  # Application entry point
├── server/                       # Backend API server
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   ├── algorithmController.ts
│   │   │   └── userController.ts
│   │   ├── routes/               # API route definitions
│   │   │   ├── algorithms.ts
│   │   │   └── users.ts
│   │   ├── lib/
│   │   │   └── supabase.ts       # Supabase client (server-side)
│   │   └── server.ts             # Express app configuration
│   ├── .env                      # Backend environment variables
│   └── package.json
├── public/                       # Static assets
├── .env                          # Frontend environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Environment Setup

### Frontend (.env)

```env
# Optional: Only needed if using Gemini AI features
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Backend (server/.env)

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

> **Note:** If Supabase credentials are not provided, the application will fall back to mock data stored in `src/lib/all-algorithms.ts`.

---

## 💻 Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend:**
```bash
cd server
npm run dev          # Start with nodemon (auto-reload)
npm run build        # Compile TypeScript
npm start            # Run production build
```

### Code Style

- **TypeScript Strict Mode** enabled
- **ESLint** for code quality
- **Prettier** for formatting (optional)
- **Component Structure**: Functional components with hooks
- **Naming Conventions**: 
  - Components: PascalCase
  - Files: kebab-case or PascalCase
  - Functions: camelCase

---

## 🌍 Internationalization

AlgoVerse supports **3 languages** out of the box:

| Language | Code | Status |
|----------|------|--------|
| English  | `en` | ✅ Complete |
| Tamil    | `ta` | ✅ Complete |
| Hindi    | `hi` | ✅ Complete |

### Adding a New Language

1. Edit `src/i18n.ts`:
```typescript
resources: {
  // ... existing languages
  fr: {
    translation: {
      "nav": { "browse": "Parcourir", ... },
      "learn": { ... }
    }
  }
}
```

2. The `LanguageSwitcher` component will automatically detect the new language.

### Usage in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('landing.hero_title')}</h1>;
}
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Algorithms

**GET /api/algorithms**
- Returns all algorithms
- Response: `{ success: true, data: Algorithm[] }`

**GET /api/algorithms/:slug**
- Returns a single algorithm by slug
- Response: `{ success: true, data: Algorithm }`

#### Users

**GET /api/users**
- Returns all users
- Response: `{ success: true, data: User[] }`

**POST /api/users**
- Creates a new user
- Body: `{ email: string, name: string }`
- Response: `{ success: true, data: User }`

#### Health Check

**GET /api/health**
- Server health status
- Response: `{ status: "ok", timestamp: string }`

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Render/Heroku)

```bash
cd server
npm run build
# Deploy with start command: npm start
```

### Environment Variables
Ensure all production environment variables are set in your hosting platform's dashboard.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Supabase** for the backend infrastructure
- **Google Gemini** for AI capabilities
- **shadcn/ui** for beautiful UI components
- **Framer Motion** for smooth animations
- **LeetCode & Codeforces** for practice problem inspiration

---

## 📞 Support

For issues, questions, or suggestions:
- 📧 Email: support@algoverse.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/algoverse/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/algoverse/discussions)

---

<div align="center">
  <strong>Built with ❤️ for the algorithm learning community</strong>
  <br />
  <sub>© 2026 AlgoVerse. All rights reserved.</sub>
</div>
