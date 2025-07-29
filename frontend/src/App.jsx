import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import StudentDashboard from './pages/StudentDashboard'
import ViewLecturesPage from './pages/ViewLecturesPage'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/lectures" element={<ViewLecturesPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App