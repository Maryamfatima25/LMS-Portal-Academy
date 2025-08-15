// src/pages/teacher/TeacherAnnouncementPage.jsx

import { useState } from 'react';
import { Megaphone, Send, Plus } from 'lucide-react';

const TeacherAnnouncementPage = () => {
  // State for the announcement form
  const [announcementText, setAnnouncementText] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  
  // Mock data for existing announcements
  const existingAnnouncements = [
    { id: 1, class: '10A - Mathematics', text: 'Reminder: The deadline for the Algebra II project has been extended to this Friday.', date: '2 days ago' },
    { id: 2, class: 'All Classes', text: 'Parent-teacher meetings are scheduled for next week. Please sign up for a slot.', date: '4 days ago' },
    { id: 3, class: '9A - Chemistry', text: 'The lab report for the titration experiment is due tomorrow.', date: '1 day ago' },
  ];

  // Mock data for the class selector
  const classes = [
    { id: '10A', name: '10A - Mathematics' },
    { id: '10B', name: '10B - Physics' },
    { id: '9A', name: '9A - Chemistry' },
    { id: 'all', name: 'All Classes' }, // Option to send to all
  ];

  const handleSendAnnouncement = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (announcementText.trim() && selectedClass) {
      // In a real app, you would send this data to your backend API
      console.log('Sending announcement:', { text: announcementText, class: selectedClass });
      alert('Announcement Sent!'); // User feedback
      
      // Reset the form
      setAnnouncementText('');
      setSelectedClass('');
    }
  };

  return (
    // Main content area with padding
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Megaphone size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-500">Communicate with your classes and view past announcements.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Create Announcement Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Plus size={18} />
                Create New Announcement
              </h3>
              <form onSubmit={handleSendAnnouncement} className="space-y-4">
                <div>
                  <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Class
                  </label>
                  <select
                    id="classSelect"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value="" disabled>Choose a class...</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="announcementText" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="announcementText"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    placeholder="Type your announcement here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    rows={5}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!announcementText.trim() || !selectedClass}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                  <span>Send Announcement</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: History of Announcements */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Sent History</h3>
            <div className="space-y-4">
              {existingAnnouncements.map((announcement) => (
                <div key={announcement.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <p className="text-gray-800 text-base">{announcement.text}</p>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{announcement.date}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      To: {announcement.class}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnnouncementPage;