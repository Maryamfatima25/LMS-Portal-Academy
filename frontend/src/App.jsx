import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AcademicCalendarPage from './pages/teacher/AcademicCalendarPage'
import MarkAttendancePage from './pages/teacher/MarkAttendancePage'
import ViewSubmissionsPage from './pages/teacher/ViewSubmissionsPage'
import UploadLecturePage from './pages/teacher/UploadLecturePage'
import CreateAssignmentPage from './pages/teacher/CreateAssignmentPage'
import CreateQuizPage from './pages/teacher/CreateQuizPage'
import AnnouncementsPage from './pages/teacher/TeacherAnnouncementPage'; 



function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/calendar" element={<AcademicCalendarPage />} />
            <Route path="/teacher/attendance" element={<MarkAttendancePage />} />
            <Route path="/teacher/submissions" element={<ViewSubmissionsPage />} />
            <Route path="/teacher/upload-lecture" element={<UploadLecturePage />} />
            <Route path="/teacher/create-assignment" element={<CreateAssignmentPage />} />
            <Route path="/teacher/create-quiz" element={<CreateQuizPage />} />
            <Route path="/teacher/announcements" element={<AnnouncementsPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App