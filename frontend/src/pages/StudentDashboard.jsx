import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StudentIntroductionCard from '../components/StudentIntroductionCard';
import AttendanceProgressBar from '../components/AttendanceProgressBar';
import QuizResultsCard from '../components/QuizResultsCard';
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
      <div 
        className={`relative transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        <Navbar onSidebarToggle={toggleSidebar} />
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* Desktop - unchanged */}
            <div className="hidden md:block">
              <StudentIntroductionCard />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-1">
                  <AttendanceProgressBar />
                </div>
                <div className="md:col-span-2">
                  <QuizResultsCard />
                </div>
              </div>
              <div className="mt-6">
                <AcademicCalendar />
              </div>
              <div className="mt-6">
                <LectureRedirectCard />
              </div>
            </div>

            {/* Mobile - NEW COMPACT DESIGN */}
            <div className="md:hidden">
              <StudentIntroductionCard />
              
              {/* Compact Academic Calendar Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">This Week</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Week 1</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Intro to Algebra</p>
                      <p className="text-xs text-gray-500">Mon, Jan 1 • 2 hrs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Motion & Kinematics</p>
                      <p className="text-xs text-gray-500">Tue, Jan 2 • 2 hrs</p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  View Full Calendar
                </button>
              </div>

              {/* Stacked Attendance and Quiz Results Cards */}
              <div className="space-y-4 mt-4">
                {/* Attendance Card - Stacked Design */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">Attendance</h3>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-bold">85%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-lg font-bold">18</div>
                      <div className="text-xs opacity-90">Present</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-lg font-bold">2</div>
                      <div className="text-xs opacity-90">Absent</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center">
                      <div className="text-lg font-bold">1</div>
                      <div className="text-xs opacity-90">Leave</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span>This Month</span>
                      <span className="font-semibold">21 Classes</span>
                    </div>
                  </div>
                </div>

                {/* Quiz Results Card - Stacked Design */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">Quiz Results</h3>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-bold">5</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Math Quiz 1</p>
                        <p className="text-xs opacity-90">85% • 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Math Quiz 2</p>
                        <p className="text-xs opacity-90">92% • 1 week ago</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-center text-sm bg-white/20 hover:bg-white/30 font-medium py-2 rounded-lg transition-colors">
                    View All Results
                  </button>
                </div>
              </div>

              {/* Compact Lecture Card Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Latest Lecture</h3>
                    <p className="text-sm text-gray-600">Advanced Calculus - Derivatives</p>
                    <p className="text-xs text-gray-500">Dr. Alan Turing • Uploaded 2 days ago</p>
                  </div>
                </div>
                <button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all">
                  Watch Lecture
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;