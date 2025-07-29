import { useState } from 'react';
import { ChevronDown, Download, Calendar, Clock, Edit, CheckCircle } from 'lucide-react';

const AssignmentCard = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  // Mock Data
  const assignments = [
    { id: 1, title: 'Calculus Problem Set 3', subject: 'math', type: 'Assignment', dueDate: '2024-01-25', daysLeft: 2 },
    { id: 2, title: 'Physics Lab Report', subject: 'physics', type: 'Assignment', dueDate: '2024-01-26', daysLeft: 3 },
    { id: 3, title: 'Chemistry Quiz 2', subject: 'chemistry', type: 'Quiz', dueDate: '2024-01-27', daysLeft: 4 },
    { id: 4, title: 'Essay on Modern Literature', subject: 'english', type: 'Assignment', dueDate: '2024-01-28', daysLeft: 5 },
    { id: 5, title: 'Final Math Exam', subject: 'math', type: 'Exam', dueDate: '2024-02-15', daysLeft: 23 },
  ];
  
  const subjects = [
    { id: 'all', name: 'All Subjects', count: assignments.length, icon: '📚' },
    { id: 'math', name: 'Mathematics', count: assignments.filter(a => a.subject === 'math').length, icon: '📐' },
    { id: 'physics', name: 'Physics', count: assignments.filter(a => a.subject === 'physics').length, icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', count: assignments.filter(a => a.subject === 'chemistry').length, icon: '🧪' },
    { id: 'english', name: 'English', count: assignments.filter(a => a.subject === 'english').length, icon: '📖' },
  ];

  const filteredAssignments = selectedSubject === 'all' 
    ? assignments 
    : assignments.filter(assignment => assignment.subject === selectedSubject);

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Refined color function for better aesthetics
  const getPriorityInfo = (daysLeft) => {
    if (daysLeft <= 1) return { text: 'Due Today', class: 'bg-red-100 text-red-700' };
    if (daysLeft <= 3) return { text: 'Due Soon', class: 'bg-amber-100 text-amber-700' };
    return { text: `${daysLeft} days left`, class: 'bg-green-100 text-green-700' };
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'assignment': return <Edit size={16} />;
      case 'quiz': return <CheckCircle size={16} />;
      case 'exam': return <Calendar size={16} />;
      default: return <Edit size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col h-full">
      {/* Desktop View - UNCHANGED */}
      <div className="hidden md:block">
        {/* Compact Card Header */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Edit size={16} />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Due Assignments</h3>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {filteredAssignments.length}
          </div>
        </div>
        
        {/* Academic Calendar Style Subject Selector */}
        <div className="relative mb-3 flex-shrink-0">
          <select 
            className="w-full text-sm font-medium text-gray-800 appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 pl-3 pr-8 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.icon} {subject.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Compact Assignments List */}
        <div className="space-y-2 overflow-y-auto pr-1 -mr-1 flex-grow">
          {filteredAssignments.slice(0, 4).map((assignment) => {
            const priority = getPriorityInfo(assignment.daysLeft);
            return (
              <div key={assignment.id} className="border border-gray-200 rounded-lg p-3 hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded-full ${priority.class}`}>
                      {getTypeIcon(assignment.type)}
                    </span>
                    <h4 className="font-medium text-gray-800 text-sm leading-tight">{assignment.title}</h4>
                  </div>
                  <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full ${priority.class}`}>
                    {priority.text}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 pl-7">
                  <span>Due: {formatDate(assignment.dueDate)}</span>
                  <button className="p-1 text-gray-400 hover:text-indigo-600 transition-colors">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Footer */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <button className="w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
            View All Assignments
          </button>
        </div>

        {/* Click outside to close dropdown - Desktop Only */}
        {showSubjectDropdown && (<div className="fixed inset-0 z-5 hidden md:block" onClick={() => setShowSubjectDropdown(false)} />)}
      </div>

      {/* Mobile view - COMPACT STACKED DESIGN */}
      <div className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Due Assignments</h3>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-0.5">
            <span className="text-sm font-bold">{filteredAssignments.length}</span>
          </div>
        </div>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {filteredAssignments.slice(0, 3).map((assignment) => {
            const priority = getPriorityInfo(assignment.daysLeft);
            return (
              <div key={assignment.id} className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className={`p-1 rounded-full ${priority.class}`}>
                  {getTypeIcon(assignment.type)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{assignment.title}</p>
                  <p className="text-xs opacity-90">Due: {formatDate(assignment.dueDate)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full mt-3 text-center text-sm bg-white/20 hover:bg-white/30 font-medium py-2 rounded-lg transition-colors">
          View All Assignments
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;