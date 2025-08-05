import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  Upload, 
  FileText, 
  HelpCircle, 
  UserCheck, 
  FolderOpen, 
  CalendarDays, 
  Megaphone,
  Menu,
  LogOut,
  UserCircle as ProfileIcon // Renamed to avoid conflict
} from 'lucide-react';

const TeacherSidebar = ({ onExpandChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationLinks = [
    { href: '/teacher/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { href: '/teacher/upload-lecture', icon: <Upload size={20} />, label: 'Upload Lectures' },
    { href: '/teacher/create-assignment', icon: <FileText size={20} />, label: 'Assignments' },
    { href: '/teacher/create-quiz', icon: <HelpCircle size={20} />, label: 'Quizzes' },
    { href: '/teacher/attendance', icon: <UserCheck size={20} />, label: 'Attendance' },
    { href: '/teacher/submissions', icon: <FolderOpen size={20} />, label: 'Submissions' },
    { href: '/teacher/calendar', icon: <CalendarDays size={20} />, label: 'Calendar' },
    { href: '/teacher/announcements', icon: <Megaphone size={20} />, label: 'Announcements' },
  ];

  const teacher = { 
    name: 'Dr. Sarah Johnson', 
    profilePic: 'https://i.pravatar.cc/150?u=teacher001',
    employeeId: 'T-98765'
  };

  // Notify parent component about expansion state
  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, [isExpanded, onExpandChange]);

  const handleNavigation = (href) => {
    navigate(href);
  };
  
  const isActive = (href) => location.pathname === href;

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-blue-600 to-indigo-700 shadow-lg`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            {isExpanded && (
              <span className="font-semibold text-white text-lg">Academy</span>
            )}
          </div>
          {!isExpanded && (
            <div className="w-8 h-8 flex items-center justify-center">
              <Menu size={20} className="text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavigation(link.href)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive(link.href) 
                      ? 'bg-white/20 text-white' 
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex-shrink-0">{link.icon}</div>
                  <span className={`transition-all duration-300 whitespace-nowrap ${isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-500/30">
          <div className="flex items-center gap-3">
            <img src={teacher.profilePic} alt="User" className="w-10 h-10 rounded-full border-2 border-white/30" />
            {isExpanded && (
              <div className="transition-all duration-300">
                <p className="font-semibold text-white text-sm truncate">{teacher.name}</p>
                <p className="text-blue-200 text-xs truncate">ID: {teacher.employeeId}</p>
              </div>
            )}
          </div>
          
          {isExpanded && (
            <div className="mt-3 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-blue-100 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                <ProfileIcon size={16} />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-red-200 hover:bg-red-500/20 hover:text-red-100 rounded-lg transition-colors">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default TeacherSidebar;