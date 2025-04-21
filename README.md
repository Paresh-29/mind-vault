# Mind Vault 🧠

A modern web application for organizing and managing your digital content, thoughts, and ideas. Mind Vault allows you to save, categorize, and share various types of content including articles, tweets, and YouTube videos.

[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://mind-vault.vercel.app)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## 🌟 Features

### Content Management
- **Multi-format Support**
  - Save articles with metadata
  - Bookmark tweets
  - Store YouTube videos
  - Add custom notes and tags

- **Organization**
  - Categorize content with tags
  - Create custom collections
  - Quick search and filtering
  - Sort by date, type, or popularity

- **Sharing**
  - Share collections with others
  - Generate shareable links
  - Control access permissions
  - Track shared content views

### User Experience
- **Modern Interface**
  - Clean, intuitive design
  - Responsive layout
  - Smooth animations
  - Keyboard shortcuts

- **Personalization**
  - Dark/Light mode support
  - Customizable dashboard
  - Personalized content feed
  - User preferences

- **Performance**
  - Fast content loading
  - Real-time updates
  - Offline support
  - Optimized search

### Security
- **Authentication**
  - Secure login system
  - Password encryption
  - Session management
  - Social login options

- **Data Protection**
  - End-to-end encryption
  - Secure API endpoints
  - Protected routes
  - Regular security audits

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Recoil
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Icons**: Lucide React, Heroicons
- **UI Components**: Custom components with class-variance-authority
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Zod
- **API Documentation**: Swagger/OpenAPI
- **Error Handling**: Custom middleware
- **Logging**: Winston
- **Testing**: Jest

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/pareshbarick/mind-vault.git
cd mind-vault
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Set up environment variables**
```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development

# Frontend (.env)
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Mind Vault
```

4. **Start the development servers**
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📦 Deployment

### Vercel Deployment
This project is deployed on Vercel. You can access the live version at [https://mind-vault.vercel.app](https://mind-vault.vercel.app)

#### Deploying to Vercel
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the frontend:
```bash
cd frontend
vercel
```

4. Deploy the backend:
```bash
cd backend
vercel
```

The deployment process will automatically:
- Build your application
- Set up environment variables
- Deploy to Vercel's global CDN
- Provide you with a production URL

### Environment Setup
For production deployment, ensure you have the following environment variables set:

```bash
# Production Environment Variables
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

## 📁 Project Structure

```
mind-vault/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   │   ├── ui/     # Base UI components
│   │   │   └── ...     # Feature components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── state/      # State management
│   │   ├── utils/      # Utility functions
│   │   ├── types/      # TypeScript type definitions
│   │   ├── providers/  # Context providers
│   │   └── assets/     # Static assets
│   └── public/         # Public assets
│
└── backend/            # Node.js backend application
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   ├── middleware/  # Custom middleware
    │   ├── utils/       # Utility functions
    │   ├── config/      # Configuration files
    │   └── types/       # TypeScript type definitions
    └── dist/           # Compiled JavaScript
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## 📝 API Documentation

The API documentation is available at `/api-docs` when running the backend server. It includes:
- Authentication endpoints
- Content management endpoints
- User management endpoints
- Error codes and responses

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint for code linting
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Backend framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

Paresh Barick - [@pareshbarick](https://twitter.com/pareshbarick)

Project Link: [https://github.com/pareshbarick/mind-vault](https://github.com/pareshbarick/mind-vault)
Live Demo: [https://mind-vault.vercel.app](https://mind-vault.vercel.app)

## 🔮 Future Plans

- [ ] Mobile app development
- [ ] Browser extension
- [ ] API rate limiting
- [ ] Advanced search features
- [ ] Content recommendations
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] Content export options 