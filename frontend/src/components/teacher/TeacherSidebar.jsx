import { X, LayoutDashboard, Upload, FileText, HelpCircle, UserCheck, FolderOpen, CalendarDays, Megaphone } from 'lucide-react';

const TeacherSidebar = ({ isOpen, toggleSidebar }) => {
  const navigationLinks = [
    { href: '/teacher/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { href: '/teacher/upload-lectures', icon: <Upload size={20} />, label: 'Upload Lectures' },
    { href: '/teacher/create-assignment', icon: <FileText size={20} />, label: 'Create Assignment' },
    { href: '/teacher/create-quiz', icon: <HelpCircle size={20} />, label: 'Create Quiz' },
    { href: '/teacher/mark-attendance', icon: <UserCheck size={20} />, label: 'Mark Attendance' },
    { href: '/teacher/view-submissions', icon: <FolderOpen size={20} />, label: 'View Submissions' },
    { href: '/teacher/academic-calendar', icon: <CalendarDays size={20} />, label: 'Academic Calendar' },
    { href: '/teacher/announcements', icon: <Megaphone size={20} />, label: 'Announcements' },
  ];

  const teacher = { 
    name: 'Dr. Sarah Johnson', 
    profilePic: 'https://i.pravatar.cc/150?u=teacher001' 
  };

  return (
    <>
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full px-4 py-6 flex flex-col">
          {/* Logo and Close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-gray-900 text-lg">Academy</span>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="p-1 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow">
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                      link.active 
                        ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {/* Desktop: Show icon and text */}
                    <span className="md:block">{link.icon}</span>
                    <span className="md:block">{link.label}</span>
                    
                    {/* Mobile: Show only icons when collapsed */}
                    <span className="md:hidden block">{link.icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Teacher Profile */}
          <div className="mt-auto">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img 
                src={teacher.profilePic} 
                alt="Teacher" 
                className="w-10 h-10 rounded-full" 
              />
              <div className="md:block">
                <p className="font-semibold text-sm text-gray-900">{teacher.name}</p>
                <a href="#" className="text-xs text-gray-500 hover:text-indigo-600">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile when Sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default TeacherSidebar;
