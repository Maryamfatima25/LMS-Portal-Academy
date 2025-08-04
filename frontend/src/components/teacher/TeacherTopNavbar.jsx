import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, LogOut, Settings, UserCircle, Plus, Send } from 'lucide-react';

const TeacherTopNavbar = ({ onSidebarToggle }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  const handleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    if (dropdownName !== 'notifications') {
      setShowAnnouncementForm(false);
    }
  };

  const handleCreateAnnouncement = () => {
    setShowAnnouncementForm(true);
    setActiveDropdown('notifications');
  };

  const handleSendAnnouncement = () => {
    if (announcementText.trim() && selectedClass) {
      // Here you would send the announcement to the backend
      console.log('Sending announcement:', { text: announcementText, class: selectedClass });
      setAnnouncementText('');
      setSelectedClass('');
      setShowAnnouncementForm(false);
      setActiveDropdown(null);
    }
  };

  const notifications = [
    { id: 1, type: 'admin', message: 'New semester schedule released.', time: '2h ago' },
    { id: 2, type: 'admin', message: 'Faculty meeting scheduled for tomorrow.', time: '5h ago' },
    { id: 3, type: 'system', message: 'Grade submission deadline approaching.', time: '1d ago' },
  ];

  const classes = [
    { id: '10A', name: '10A - Mathematics' },
    { id: '10B', name: '10B - Physics' },
    { id: '9A', name: '9A - Chemistry' },
    { id: '11A', name: '11A - Biology' },
  ];
  
  const teacher = { 
    name: 'Dr. Sarah Johnson', 
    teacherId: 'T001', 
    profilePic: 'https://i.pravatar.cc/150?u=teacher001' 
  };

  return (
    <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg hidden sm:block">Academy</span>
          </div>
        </div>

        {/* Right side - Buttons */}
        <div className="flex items-center space-x-2">
          {/* Logout Button */}
          <button className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-red-100 transition-colors duration-300">
            <LogOut size={18} className="text-gray-600 group-hover:text-red-600 transition-colors" />
            <span className="text-sm font-medium text-red-600 whitespace-nowrap overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-xs hidden sm:block">
              Logout
            </span>
          </button>
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => handleDropdown('notifications')} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative" 
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            </button>
            
            {activeDropdown === 'notifications' && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                {!showAnnouncementForm ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button
                        onClick={handleCreateAnnouncement}
                        className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus size={14} />
                        <span className="hidden sm:inline">Create</span>
                      </button>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              notification.type === 'admin' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Create Announcement</h3>
                      <button
                        onClick={() => setShowAnnouncementForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Class
                        </label>
                        <select
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        >
                          <option value="">Choose class...</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Announcement
                        </label>
                        <textarea
                          value={announcementText}
                          onChange={(e) => setAnnouncementText(e.target.value)}
                          placeholder="Type your announcement here..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          rows={3}
                        />
                      </div>
                      <button
                        onClick={handleSendAnnouncement}
                        disabled={!announcementText.trim() || !selectedClass}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send size={16} />
                        Send Announcement
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => handleDropdown('profile')} 
              className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" 
              aria-label="Profile"
            >
              <img 
                src={teacher.profilePic} 
                alt="Teacher Profile" 
                className="w-full h-full rounded-full object-cover" 
              />
            </button>
            {activeDropdown === 'profile' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-2">
                <div className="p-2 border-b border-gray-200 mb-2">
                  <p className="font-semibold text-gray-900">{teacher.name}</p>
                  <p className="text-sm text-gray-500">ID: {teacher.teacherId}</p>
                </div>
                <button className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <UserCircle size={16} /> 
                  View Profile
                </button>
                <button className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <Settings size={16} /> 
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setActiveDropdown(null);
            setShowAnnouncementForm(false);
          }} 
        />
      )}
    </nav>
  );
};

export default TeacherTopNavbar;
