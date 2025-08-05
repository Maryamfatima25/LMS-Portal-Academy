import { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherTimetableCard = () => {
  const navigate = useNavigate();
  // Get current day, hardcoded to Monday for consistent demo
  const today = 'Monday';
  const [selectedDay, setSelectedDay] = useState(today);

  // Mock timetable data
  const timetableData = {
    Monday: [
      { time: '09:00 - 10:00', class: '10-A', subject: 'Math', type: 'Lecture' },
      { time: '10:00 - 11:00', class: '10-A', subject: 'Physics', type: 'Lab' },
      { time: '11:30 - 12:30', class: '9-A', subject: 'Chemistry', type: 'Lecture' },
    ],
    Tuesday: [
      { time: '09:00 - 10:00', class: '10-B', subject: 'Physics', type: 'Lecture' },
      { time: '10:00 - 11:00', class: '9-A', subject: 'Math', type: 'Practice' },
    ],
    // Add other days as needed...
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const schedule = timetableData[selectedDay] || [];

  const getSubjectColor = (subject) => {
    const colors = {
      'Math': 'bg-blue-100 text-blue-800',
      'Physics': 'bg-green-100 text-green-800',
      'Chemistry': 'bg-amber-100 text-amber-800',
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  return (
    // Uses flex layout to control scrolling area
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="font-semibold text-gray-900 text-lg">Class Timetable</h3>
        <button 
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          onClick={() => navigate('/teacher/timetable')}
        >
          View Full
        </button>
      </div>
      
      {/* Day selector toggle */}
      <div className="flex justify-between bg-gray-100 rounded-lg p-1 my-4 flex-shrink-0">
        {weekdays.map(day => (
          <button 
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-1 py-1 px-2 text-xs font-bold rounded-md transition-all ${
                selectedDay === day 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {day.substring(0, 3)}
          </button>
        ))}
      </div>

      {/* Scrollable content area */}
      <div className="flex-grow overflow-y-auto -mr-2 pr-2">
        {schedule.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase sticky top-0 bg-white">
              <tr>
                <th className="py-2 px-2">Time</th>
                <th className="py-2 px-2">Subject</th>
                <th className="py-2 px-2">Class</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-none">
                  <td className="py-3 px-2 font-medium text-gray-600 whitespace-nowrap">{item.time}</td>
                  <td className="py-3 px-2">
                    <p className="font-bold text-gray-800">{item.subject}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSubjectColor(item.subject)}`}>
                      {item.class}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <Calendar size={32} className="mb-2" />
            <p className="font-semibold">No classes scheduled!</p>
            <p className="text-xs">Enjoy your day off.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTimetableCard;