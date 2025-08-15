import React, { useState, useEffect, useRef } from 'react';
import { Edit } from 'lucide-react';

const TeacherAcademicCalendarCard = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedClass, setSelectedClass] = useState('math');
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredWeekId, setHoveredWeekId] = useState(null); // For hover animation state
  const weekScrollRef = useRef(null);

  // Correct date generation function
  const getWeekDateRange = (weekNumber) => {
    // This start date is a fixed point. The function calculates all future weeks from here.
    const startDate = new Date(2024, 0, 1);
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const formatDate = (d) => d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  };

  // --- MOCK DATA ---
  const calendarData = {
    weeks: Array.from({ length: 16 }, (_, i) => ({ id: i + 1, label: `Week ${i + 1}`, dateRange: getWeekDateRange(i + 1) })),
    subjects: [
      { id: 'math', name: '10A - Mathematics', icon: '📐' },
      { id: 'physics', name: '10B - Physics', icon: '⚛️' },
      { id: 'chemistry', name: '9A - Chemistry', icon: '🧪' },
    ],
    topics: {
      math: { 1: [{ id: 1, title: 'Quadratic Equations', day: 'Day 1', date: 'Monday, Jan 1', notes: 'Intro to solving with factoring.', duration: '2 hours', type: 'lecture' }, { id: 2, title: 'Graphing Parabolas', day: 'Day 3', date: 'Wednesday, Jan 3', notes: 'Understanding the graph of functions.', duration: '1.5 hours', type: 'practice' }] },
      physics: { 1: [{ id: 4, title: 'Motion and Kinematics', day: 'Day 2', date: 'Tuesday, Jan 2', notes: 'Understanding velocity.', duration: '2 hours', type: 'lecture' }] },
    }
  };
  const selectedClassData = calendarData.subjects.find(s => s.id === selectedClass);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const classTopics = calendarData.topics[selectedClass] || {};
      setTopics(classTopics[selectedWeek] || []);
      setLoading(false);
    }, 300);
  }, [selectedWeek, selectedClass]);

  // --- Helper Functions ---
  const scrollWeeks = (direction) => {
    if (weekScrollRef.current) { weekScrollRef.current.scrollBy({ left: 200 * (direction === 'left' ? -1 : 1), behavior: 'smooth' }); }
  };
  const handleSubjectCycle = (direction) => {
    const currentIndex = calendarData.subjects.findIndex(c => c.id === selectedClass);
    const totalClasses = calendarData.subjects.length;
    const nextIndex = direction === 'next' ? (currentIndex + 1) % totalClasses : (currentIndex - 1 + totalClasses) % totalClasses;
    setSelectedClass(calendarData.subjects[nextIndex].id);
  };
  const getTypeIcon = (type) => ({ lecture: '🎓', practice: '✏️', lab: '🔬', quiz: '📝' }[type] || '📖');
  const getTypeColor = (type) => ({ lecture: '#3b82f6', practice: '#10b981', lab: '#f59e0b', quiz: '#ef4444' }[type] || '#6b7280');
  const handleCardClick = () => { window.location.href = '/teacher/academic-calendar'; };

  // --- INLINE STYLES ---
  const styles = {
    academicCalendar: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)', padding: '24px', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', cursor: 'pointer' },
    calendarHeader: { textAlign: 'center', marginBottom: '24px', flexShrink: 0 },
    calendarTitle: { fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: 0 },
    calendarSubtitle: { color: '#64748b', fontSize: '16px', marginTop: '4px' },
    weekSelectorContainer: { marginBottom: '24px', flexShrink: 0 },
    weekSelectorBar: { display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '8px' },
    scrollButton: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#475569' },
    weekSelector: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px', flex: 1, scrollbarWidth: 'none' },
    weekButton: (isActive, isHovered) => ({
      background: isActive ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#fff',
      border: `1px solid ${isActive ? '#1d4ed8' : (isHovered ? '#6366f1' : '#e5e7eb')}`,
      borderRadius: '12px', padding: '10px 16px', cursor: 'pointer', transition: 'all 0.2s ease', minWidth: '140px',
      textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px',
      transform: isActive ? 'scale(1.05) translateY(-2px)' : (isHovered ? 'translateY(-2px)' : 'none'),
      boxShadow: isActive ? '0 8px 25px rgba(59, 130, 246, 0.3)' : (isHovered ? '0 4px 12px rgba(99, 102, 241, 0.1)' : 'none'),
    }),
    weekButtonShine: (isHovered) => ({
      position: 'absolute', top: 0, width: '100%', height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
      transition: 'left 0.6s ease',
      left: isHovered ? '150%' : '-150%',
    }),
    weekLabel: (isActive) => ({ fontWeight: '600', fontSize: '14px', color: isActive ? '#fff' : '#334155', position: 'relative' }),
    weekDate: (isActive) => ({ fontSize: '12px', color: isActive ? '#fff' : '#64748b', position: 'relative' }),
    subjectSelectWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '24px', flexShrink: 0 },
    subjectSelect: { width: '100%', maxWidth: '320px', fontSize: '15px', padding: '12px 1rem', borderRadius: '12px', border: '1px solid #d1d5db' },
    topicsContainer: { overflowY: 'auto', flexGrow: 1, minHeight: '150px' }, // minHeight ensures space for empty state
    topicsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '16px' },
    topicCard: (accentColor) => ({ background: '#fff', border: '1px solid #e5e7eb', borderLeft: `5px solid ${accentColor}`, borderRadius: '12px', padding: '16px 20px' }),
    topicCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    topicCardTitleSection: { display: 'flex', alignItems: 'center', gap: '12px' },
    topicCardTypeIcon: (bgColor) => ({ fontSize: '16px', width: '32px', height: '32px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', backgroundColor: bgColor }),
    topicCardTitle: { fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 },
    topicCardDetails: { display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' },
    detailItem: { fontSize: '13px', color: '#475569' },
    notesPreview: { fontSize: '14px', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '16px', flexGrow: 1 },
    editButton: { backgroundColor: '#f3f4f6', color: '#374151', fontSize: '14px', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 },
    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' },
    emptyIcon: { fontSize: '40px', opacity: 0.5, marginBottom: '12px' },
    emptyStateH3: { fontSize: '18px', fontWeight: '600', margin: 0, color: '#1e293b' },
    // Mobile
    mobileControls: { display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: '12px', marginBottom: '20px' },
    mobileWeekDisplay: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px', width: '80px', textAlign: 'center' },
    mobileWeekLabel: { fontSize: '11px', color: '#64748b' },
    mobileWeekNumber: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
    mobileSubjectSelector: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', flexGrow: 1 },
    subjectArrowButton: { fontSize: '22px', color: '#334155', background: 'none', border: 'none', padding: '0 10px', cursor: 'pointer' },
    mobileSubjectInfo: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    mobileSubjectIcon: { fontSize: '20px' },
    mobileSubjectName: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  };

  return (
    <div style={styles.academicCalendar} onClick={handleCardClick}>
      <div style={styles.calendarHeader}>
        <h2 style={styles.calendarTitle}>Academic Calendar</h2>
        <p style={styles.calendarSubtitle}>Manage your weekly topic schedule</p>
      </div>
      
      {/* --- Desktop Viewport --- */}
      <div className="hidden md:block">
        <div style={styles.weekSelectorContainer}>
          <div style={styles.weekSelectorBar}>
            <button style={styles.scrollButton} onClick={(e) => { e.stopPropagation(); scrollWeeks('left'); }}>←</button>
            <div style={styles.weekSelector} ref={weekScrollRef}>
              {calendarData.weeks.slice(0, 8).map((week) => (
                <button 
                  key={week.id} 
                  style={styles.weekButton(selectedWeek === week.id, hoveredWeekId === week.id)}
                  onClick={(e) => { e.stopPropagation(); setSelectedWeek(week.id); }}
                  onMouseEnter={() => setHoveredWeekId(week.id)}
                  onMouseLeave={() => setHoveredWeekId(null)}
                >
                  <span style={styles.weekButtonShine(hoveredWeekId === week.id)}></span>
                  <span style={styles.weekLabel(selectedWeek === week.id)}>{week.label}</span>
                  <span style={styles.weekDate(selectedWeek === week.id)}>{week.dateRange}</span>
                </button>
              ))}
            </div>
            <button style={styles.scrollButton} onClick={(e) => { e.stopPropagation(); scrollWeeks('right'); }}>→</button>
          </div>
        </div>
        <div style={styles.subjectSelectWrapper}>
          <select style={styles.subjectSelect} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} onClick={(e) => e.stopPropagation()}>
            {calendarData.subjects.map((subject) => (<option key={subject.id} value={subject.id}>{subject.icon} {subject.name}</option>))}
          </select>
        </div>
      </div>

      {/* --- Mobile Viewport (Restored) --- */}
      <div className="md:hidden">
        <div style={styles.mobileControls}>
          <div style={styles.mobileWeekDisplay}>
            <span style={styles.mobileWeekLabel}>Current</span>
            <span style={styles.mobileWeekNumber}>Week {selectedWeek}</span>
          </div>
          <div style={styles.mobileSubjectSelector}>
            <button style={styles.subjectArrowButton} onClick={(e) => { e.stopPropagation(); handleSubjectCycle('prev'); }}>‹</button>
            <div style={styles.mobileSubjectInfo}>
              <span style={styles.mobileSubjectIcon}>{selectedClassData?.icon}</span>
              <span style={styles.mobileSubjectName}>{selectedClassData?.name}</span>
            </div>
            <button style={styles.subjectArrowButton} onClick={(e) => { e.stopPropagation(); handleSubjectCycle('next'); }}>›</button>
          </div>
        </div>
      </div>

      {/* Topics Display (Restored) */}
      <div style={styles.topicsContainer}>
        {loading ? ( <div style={{textAlign: 'center', padding: '20px'}}>Loading...</div> ) : topics.length > 0 ? (
          <div style={styles.topicsGrid}>
            {topics.map((topic) => (
              <div key={topic.id} style={styles.topicCard(getTypeColor(topic.type))}>
                <div style={styles.topicCardHeader}>
                  <div style={styles.topicCardTitleSection}>
                    <span style={styles.topicCardTypeIcon(getTypeColor(topic.type))}>{getTypeIcon(topic.type)}</span>
                    <h4 style={styles.topicCardTitle}>{topic.title}</h4>
                  </div>
                  <button style={styles.editButton} onClick={(e) => { e.stopPropagation(); alert(`Editing ${topic.id}`); }}>
                    <Edit size={16} />
                  </button>
                </div>
                <div style={styles.topicCardDetails}>
                  <span style={styles.detailItem}>📅 {topic.date}</span>
                  <span style={styles.detailItem}>📍 {topic.day}</span>
                  <span style={styles.detailItem}>⏱️ {topic.duration}</span>
                </div>
                {topic.notes && <p style={styles.notesPreview}>{topic.notes}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <h3 style={styles.emptyStateH3}>No Topics This Week</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAcademicCalendarCard;