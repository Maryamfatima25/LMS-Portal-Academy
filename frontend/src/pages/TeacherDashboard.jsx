import { useState } from 'react';
import TeacherSidebar from '../components/teacher/TeacherSidebar';
import TeacherTopNavbar from '../components/teacher/TeacherTopNavbar';
import TeacherIntroductionCard from '../components/teacher/TeacherIntroductionCard';
import MarkAttendanceCard from '../components/teacher/MarkAttendanceCard';
import UploadLectureCard from '../components/teacher/UploadLectureCard';
import TeacherAcademicCalendarCard from '../components/teacher/TeacherAcademicCalendarCard';
import TeacherTimetableCard from '../components/teacher/TeacherTimetableCard';
import ViewSubmissionsPageCard from '../components/teacher/ViewSubmissionsPageCard';
// MODIFIED: Import the new unified card
import CreateContentCard from '../components/teacher/CreateContentCard'; 
// REMOVED: No longer need the individual cards
// import CreateAssignmentCard from '../components/teacher/CreateAssignmentCard';
// import CreateQuizCard from '../components/teacher/CreateQuizCard';

const TeacherDashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar onExpandChange={setIsSidebarExpanded} />
      
      <div className={`relative transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <TeacherTopNavbar />
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            <TeacherIntroductionCard />

            <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
              <div className="md:col-span-3"><MarkAttendanceCard /></div>
              <div className="md:col-span-7"><ViewSubmissionsPageCard /></div>
            </div>

            <TeacherAcademicCalendarCard />

            <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
              <div className="md:col-span-7"><UploadLectureCard /></div>
              <div className="md:col-span-3"><TeacherTimetableCard /></div>
            </div>
            
            {/* MODIFIED: Replaced the two-column grid with the single, full-width card */}
            <CreateContentCard />

          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;