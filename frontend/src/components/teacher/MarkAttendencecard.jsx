import { useState } from 'react';
import { UserCheck, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarkAttendanceCard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedSubject, setSelectedSubject] = useState('Math');

  // Mock data
  const attendanceData = {
    '10A': { 'Math': { present: 56, absent: 10, leave: 4 }, 'Physics': { present: 52, absent: 12, leave: 6 } },
    '10B': { 'Math': { present: 48, absent: 15, leave: 2 }, 'Physics': { present: 45, absent: 18, leave: 2 } },
  };
  const classes = ['10A', '10B', '9A'];
  const subjects = ['Math', 'Physics', 'Chemistry'];

  const currentAttendance = attendanceData[selectedClass]?.[selectedSubject] || { present: 0, absent: 0, leave: 0 };
  
  // Color scheme to match student card
  const colors = {
    present: '#22c55e', // green-500
    absent: '#ef4444', // red-500
    leave: '#f59e0b' // amber-500
  };

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

      {/* Filters Section */}
      <div className="grid grid-cols-2 gap-3 my-4 flex-shrink-0">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {classes.map((cls) => (<option key={cls} value={cls}>Class {cls}</option>))}
        </select>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {subjects.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}
        </select>
      </div>
      
      {/* MODIFIED: Stats List now perfectly matches the student legend style */}
      <div className="flex-grow space-y-3 flex flex-col justify-center">
        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border-l-4" 
          style={{ borderColor: colors.present }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.present }}></div>
            <span className="text-sm font-medium text-gray-700">Present</span>
          </div>
          <span className="font-bold text-base text-gray-900">{currentAttendance.present}</span>
        </div>

        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border-l-4" 
          style={{ borderColor: colors.absent }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.absent }}></div>
            <span className="text-sm font-medium text-gray-700">Absent</span>
          </div>
          <span className="font-bold text-base text-gray-900">{currentAttendance.absent}</span>
        </div>

        <div 
          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border-l-4" 
          style={{ borderColor: colors.leave }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.leave }}></div>
            <span className="text-sm font-medium text-gray-700">On Leave</span>
          </div>
          <span className="font-bold text-base text-gray-900">{currentAttendance.leave}</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <button
          className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => navigate('/teacher/attendance')}
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
};

export default MarkAttendanceCard;