import React, { useState, useEffect, useRef } from 'react';
import './AcademicCalendar.css';

const AcademicCalendar = ({ data, onWeekChange, onSubjectChange }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const weekScrollRef = useRef(null);

  // Helper function to generate week date ranges
  const getWeekDateRange = (weekNumber) => {
    const startDate = new Date(2024, 0, 1);
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  };

  // Mock data if none provided
  const defaultData = {
    weeks: Array.from({ length: 16 }, (_, i) => ({ id: i + 1, label: `Week ${i + 1}`, dateRange: getWeekDateRange(i + 1) })),
    subjects: [
      { id: 'math', name: 'Mathematics', color: '#6366f1', icon: '📐' },
      { id: 'physics', name: 'Physics', color: '#10b981', icon: '⚛️' },
      { id: 'chemistry', name: 'Chemistry', color: '#f59e0b', icon: '🧪' },
      { id: 'english', name: 'English', color: '#8b5cf6', icon: '📚' }
    ],
    topics: {
        math: { 1: [{ id: 1, title: 'Introduction to Algebra', day: 'Day 1', date: 'Monday, Jan 1', notes: 'Basic algebraic expressions and equations.', duration: '2 hours', type: 'lecture', progress: 85 }, { id: 2, title: 'Linear Equations', day: 'Day 3', date: 'Wednesday, Jan 3', notes: 'Solving linear equations in one variable.', duration: '1.5 hours', type: 'practice', progress: 60 }, { id: 3, title: 'Graphing Functions', day: 'Day 5', date: 'Friday, Jan 5', notes: 'Plotting linear functions on a coordinate plane.', duration: '2 hours', type: 'lab', progress: 30 }] },
        physics: { 1: [{ id: 4, title: 'Motion and Kinematics', day: 'Day 2', date: 'Tuesday, Jan 2', notes: 'Understanding velocity, acceleration, and displacement.', duration: '2 hours', type: 'lecture', progress: 75 }, { id: 5, title: 'Forces & Newton\'s Laws', day: 'Day 4', date: 'Thursday, Jan 4', notes: 'The three laws of motion and their applications.', duration: '2 hours', type: 'lab', progress: 45 }] }
    }
  };

  const calendarData = data || defaultData;
  const selectedSubjectData = calendarData.subjects.find(s => s.id === selectedSubject);

  useEffect(() => {
    if (!selectedSubject && calendarData.subjects.length > 0) {
      setSelectedSubject(calendarData.subjects[0].id);
    }
  }, [calendarData.subjects, selectedSubject]);

  useEffect(() => {
    if (selectedSubject) fetchTopics();
  }, [selectedWeek, selectedSubject]);

  const fetchTopics = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const subjectTopics = calendarData.topics[selectedSubject] || {};
    setTopics(subjectTopics[selectedWeek] || []);
    setLoading(false);
  };

  const handleWeekChange = (weekId) => {
    setSelectedWeek(weekId);
    onWeekChange?.(weekId);
  };

  const handleSubjectCycle = (direction) => {
    const currentIndex = calendarData.subjects.findIndex(s => s.id === selectedSubject);
    const totalSubjects = calendarData.subjects.length;
    const nextIndex = direction === 'next' ? (currentIndex + 1) % totalSubjects : (currentIndex - 1 + totalSubjects) % totalSubjects;
    const nextSubject = calendarData.subjects[nextIndex];
    setSelectedSubject(nextSubject.id);
    onSubjectChange?.(nextSubject.id);
  };

  const scrollWeeks = (direction) => {
    if (weekScrollRef.current) {
      const scrollAmount = 150;
      weekScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const getTypeIcon = (type) => ({ lecture: '🎓', practice: '✏️', lab: '🔬', quiz: '📝' }[type] || '📖');
  const getTypeColor = (type) => ({ lecture: '#3b82f6', practice: '#10b981', lab: '#f59e0b', quiz: '#ef4444' }[type] || '#6b7280');

  return (
    <div className="academic-calendar">
      <div className="calendar-header">
        <h2 className="calendar-title">Academic Calendar</h2>
        <p className="calendar-subtitle">Your weekly topic schedule</p>
      </div>
      
      {/* --- Desktop Viewport --- */}
      <div className="hidden md:block">
        <div className="week-selector-container">
          <div className="week-selector-bar">
            <button className="scroll-button left" onClick={() => scrollWeeks('left')}>←</button>
            <div className="week-selector" ref={weekScrollRef}>
              {calendarData.weeks.map((week) => (
                <button 
                  key={week.id} 
                  className={`week-button ${selectedWeek === week.id ? 'active' : ''}`} 
                  onClick={() => handleWeekChange(week.id)}
                >
                  <span className="week-label">{week.label}</span>
                  <span className="week-date">{week.dateRange}</span>
                </button>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => scrollWeeks('right')}>→</button>
          </div>
        </div>
        <div className="subject-select-wrapper">
          <select 
            className="subject-select" 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {calendarData.subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.icon} {subject.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Mobile Viewport - COMPACT VERSION --- */}
      <div className="md:hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">This Week</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Week {selectedWeek}</span>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {topics.slice(0, 3).map((topic) => (
              <div key={topic.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: getTypeColor(topic.type) }}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">{topic.title}</p>
                  <p className="text-xs text-gray-500">{topic.date} • {topic.duration}</p>
                </div>
              </div>
            ))}
          </div>
          {topics.length > 3 && (
            <button className="w-full mt-2 text-center text-xs text-blue-600 hover:text-blue-700 font-medium py-1 rounded-lg hover:bg-blue-50 transition-colors">
              +{topics.length - 3} more topics
            </button>
          )}
        </div>
      </div>

      {/* --- Topics Display (Used by both Desktop and Mobile) --- */}
      <div className="topics-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading Topics...</p>
          </div>
        ) : topics.length > 0 ? (
          <div className="topics-grid">
            {topics.map((topic) => (
              <div 
                key={topic.id} 
                className="topic-card" 
                style={{ '--accent-color': getTypeColor(topic.type) }}
              >
                <div className="topic-card-header">
                  <div className="topic-card-title-section">
                    <span 
                      className="topic-card-type-icon" 
                      style={{backgroundColor: getTypeColor(topic.type)}}
                    >
                      {getTypeIcon(topic.type)}
                    </span>
                    <h4 className="topic-card-title">{topic.title}</h4>
                  </div>
                  <span className="topic-card-type-text">{topic.type}</span>
                </div>
                <div className="topic-card-details">
                  <span className="detail-item">📅 {topic.date}</span>
                  <span className="detail-item">📍 {topic.day}</span>
                  <span className="detail-item">⏱️ {topic.duration}</span>
                </div>
                {topic.notes && (
                  <div className="topic-card-notes">
                    <span className="notes-icon">💡</span>
                    <p>{topic.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Topics Scheduled</h3>
            <p>There are no topics scheduled for this week.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicCalendar;