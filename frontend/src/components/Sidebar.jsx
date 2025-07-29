import { X, LayoutDashboard, BookCopy, GraduationCap, CalendarDays, Settings } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigationLinks = [
    { href: '#', icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { href: '#', icon: <BookCopy size={20} />, label: 'Courses' },
    { href: '#', icon: <GraduationCap size={20} />, label: 'Grades' },
    { href: '#', icon: <CalendarDays size={20} />, label: 'Calendar' },
    { href: '#', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const user = { name: 'John Doe', profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' };

  return (
    <>
      {/* MODIFIED: Sidebar now hides off-screen on ALL devices by default */}
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
            <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-gray-100">
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          <nav className="flex-grow">
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      link.active 
                        ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img src={user.profilePic} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-sm text-gray-900">{user.name}</p>
                <a href="#" className="text-xs text-gray-500 hover:text-indigo-600">View Profile</a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Overlay for Mobile when Sidebar is open --- */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;