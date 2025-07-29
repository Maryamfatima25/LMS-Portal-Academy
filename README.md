# Academy Learning Management System

A complete LMS solution built with React (Vite) frontend and Node.js backend, featuring Tailwind CSS for styling.

## 🚀 Features

- **User Authentication** - Login/Register for students, instructors, and admins
- **Course Management** - Create, view, and enroll in courses
- **Dashboard** - Personalized learning dashboard
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - Socket.io integration for live features

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Query for state management
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time features
- Bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd academy-lms
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

### Individual Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Tailwind CSS

Tailwind is pre-configured with:
- Custom color palette
- Responsive design utilities
- Component classes for buttons and cards
- PostCSS integration

## 📁 Project Structure

```
academy-lms/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── index.css       # Tailwind imports
│   ├── tailwind.config.js  # Tailwind configuration
│   └── vite.config.js      # Vite configuration
├── backend/
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Express server
└── package.json            # Root package.json
```

## 🎯 Usage

### For Students
1. Register as a student
2. Browse available courses
3. Enroll in courses
4. Track progress on dashboard

### For Instructors
1. Register as an instructor
2. Create and manage courses
3. Add lessons and content
4. Monitor student enrollment

### For Admins
1. Manage all users and courses
2. System administration
3. Analytics and reporting

## 🚀 Deployment

### Frontend (Vite Build)
```bash
cd frontend
npm run build
```

### Backend (Production)
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@academy-lms.com or create an issue in the repository.