import { Clock, Calendar } from 'lucide-react';

const TeacherTimetableCard = () => {
  const currentDay = 'Monday'; // Hardcoded for consistent demo with many items
  const timetableData = {
    Monday: [
      { time: '09:00 AM', class: 'Class 10-A', subject: 'Math' },
      { time: '10:00 AM', class: 'Class 10-A', subject: 'Physics' },
      { time: '11:30 AM', class: 'Class 9-A', subject: 'Chemistry' },
      { time: '02:00 PM', class: 'Class 10-B', subject: 'Math' },
      { time: '03:00 PM', class: 'Class 9-A', subject: 'Physics' }, // Extra item to ensure scrolling
      { time: '04:00 PM', class: 'Class 10-B', subject: 'Chemistry' }, // Extra item to ensure scrolling
    ],
  };
  const todaySchedule = timetableData[currentDay] || [];

  const getSubjectColor = (subject) => {
    const colors = {
      'Math': 'bg-blue-100 text-blue-700',
      'Physics': 'bg-green-100 text-green-700',
      'Chemistry': 'bg-amber-100 text-amber-700',
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  return (
    // MODIFIED: Added a fixed height and flex layout
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-[320px] flex flex-col">
      {/* Header (will not stretch) */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Timetable</h3>
            <p className="text-sm text-gray-500">{currentDay}</p>
          </div>
        </div>
      </div>

      {/* Timetable List (will stretch and scroll) */}
      {todaySchedule.length > 0 ? (
        // MODIFIED: flex-grow makes this div fill available space, overflow-y-auto enables scrolling
        <div className="mt-4 space-y-3 flex-grow overflow-y-auto pr-2 -mr-2">
          {todaySchedule.map((slot, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-1/3 text-sm font-semibold text-gray-700">
                {slot.time}
              </div>
              <div className="w-px bg-gray-200 h-8 mx-3"></div>
              <div className="flex-grow">
                <p className="font-medium text-gray-900">{slot.class}</p>
                <p className={`mt-1 w-fit px-2 py-0.5 rounded-full text-xs font-semibold ${getSubjectColor(slot.subject)}`}>
                  {slot.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <Calendar size={32} className="text-gray-300 mb-2" />
          <h4 className="font-semibold text-gray-800">All Clear!</h4>
          <p className="text-sm text-gray-500">No classes scheduled.</p>
        </div>
      )}

      {/* Footer (will not stretch) */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <button
          className="w-full bg-indigo-50 text-indigo-700 font-medium py-3 rounded-lg hover:bg-indigo-100 transition-colors"
          onClick={() => window.location.href = '/teacher/timetable'}
        >
          View Full Timetable
        </button>
      </div>
    </div>
  );
};

export default TeacherTimetableCard;