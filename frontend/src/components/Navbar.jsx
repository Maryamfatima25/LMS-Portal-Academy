import { useState } from 'react';
import { Menu, Bell, LogOut, Settings, UserCircle } from 'lucide-react';

const Navbar = ({ onSidebarToggle }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const notifications = [
    { id: 1, type: 'admin', message: 'New semester schedule released.', time: '2h ago' },
    { id: 2, type: 'teacher', message: 'Assignment deadline extended for Math.', time: '5h ago' },
  ];
  
  const user = { name: 'John Doe', studentId: '12345', profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' };

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* MODIFIED: Menu button is now always visible */}
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Right side - Buttons */}
        <div className="flex items-center space-x-3">
          {/* NEW: Animated Logout Button */}
          <button className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-red-100 transition-colors duration-300">
            <LogOut size={18} className="text-gray-600 group-hover:text-red-600 transition-colors" />
            <span className="text-sm font-medium text-red-600 whitespace-nowrap overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-xs">
              Logout
            </span>
          </button>
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('notifications')} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative" aria-label="Notifications">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            {activeDropdown === 'notifications' && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                {/* Notification content here */}
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => handleDropdown('profile')} className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Profile">
              <img src={user.profilePic} alt="User Profile" className="w-full h-full rounded-full object-cover" />
            </button>
            {activeDropdown === 'profile' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-2">
                <div className="p-2 border-b border-gray-200 mb-2">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">ID: {user.studentId}</p>
                </div>
                <button className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"><UserCircle size={16} /> View Profile</button>
                <button className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"><Settings size={16} /> Settings</button>
                {/* NOTE: Logout is now a dedicated button in the navbar */}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeDropdown && (<div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />)}
    </nav>
  );
};

export default Navbar;