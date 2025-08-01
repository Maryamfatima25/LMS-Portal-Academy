import { useState } from 'react';
import { UserCheck, Calendar } from 'lucide-react';

const MarkAttendanceCard = () => {
  const [selectedClass, setSelectedClass] = useState('10A');

  // Mock data
  const attendanceData = {
    '10A': { present: 56, absent: 10, leave: 4, lastMarked: '2024-01-23' },
    '10B': { present: 48, absent: 15, leave: 2, lastMarked: '2024-01-23' },
  };
  const classes = ['10A', '10B', '9A'];
  const currentAttendance = attendanceData[selectedClass];
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <UserCheck size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Attendance</h3>
            <p className="text-sm text-gray-500">Class Overview</p>
          </div>
        </div>
      </div>

      {/* Class Selector */}
      <div className="my-4 flex-shrink-0">
        <label className="block text-xs font-medium text-gray-500 mb-1">Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {classes.map((cls) => (<option key={cls} value={cls}>Class {cls}</option>))}
        </select>
      </div>
      
      {/* Stats - flex-grow makes this section take all remaining space */}
      <div className="flex-grow space-y-3">
        <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
          <span className="font-medium text-green-700">Present</span>
          <span className="font-bold text-lg text-green-800">{currentAttendance?.present || 0}</span>
        </div>
        <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
          <span className="font-medium text-red-700">Absent</span>
          <span className="font-bold text-lg text-red-800">{currentAttendance?.absent || 0}</span>
        </div>
        <div className="flex justify-between items-center bg-amber-50 p-3 rounded-lg">
          <span className="font-medium text-amber-700">On Leave</span>
          <span className="font-bold text-lg text-amber-800">{currentAttendance?.leave || 0}</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <button
          className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => window.location.href = '/teacher/mark-attendance'}
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceCard;