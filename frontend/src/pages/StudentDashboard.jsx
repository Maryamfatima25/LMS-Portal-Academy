import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StudentIntroductionCard from '../components/StudentIntroductionCard';
import AttendanceProgressBar from '../components/AttendanceProgressBar';
import AssignmentCard from '../components/AssignmentCard';
import AcademicCalendar from '../components/AcademicCalendar';
import LectureRedirectCard from '../components/LectureRedirectCard';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      {/* MODIFIED: The left margin now changes based on sidebar state, creating a "push" effect on desktop */}
      <div 
        className={`relative transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        <Navbar onSidebarToggle={toggleSidebar} />
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <StudentIntroductionCard />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1"><AttendanceProgressBar /></div>
              <div className="md:col-span-2"><AssignmentCard /></div>
            </div>
            <AcademicCalendar />
            <LectureRedirectCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;