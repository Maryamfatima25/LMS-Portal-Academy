import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, X, LayoutDashboard, Upload, FileText, HelpCircle, UserCheck, FolderOpen, CalendarDays, Menu, LogOut, UserCircle as ProfileIcon } from 'lucide-react';

// --- Main Page Component ---
const AcademicCalendarPage = () => {
    // --- State Management ---
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedClass, setSelectedClass] = useState('math');
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);
    const [hoveredWeekId, setHoveredWeekId] = useState(null);
    const weekScrollRef = useRef(null);

    // --- MOCK DATA ---
    const getWeekDateRange = (weekNumber) => {
        const startDate = new Date(2024, 0, 1);
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const formatDate = (d) => d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
    };
    const calendarData = {
        weeks: Array.from({ length: 16 }, (_, i) => ({ id: i + 1, label: `Week ${i + 1}`, dateRange: getWeekDateRange(i + 1) })),
        subjects: [{ id: 'math', name: '10A - Mathematics', icon: '📐' }, { id: 'physics', name: '10B - Physics', icon: '⚛️' }, { id: 'chemistry', name: '9A - Chemistry', icon: '🧪' }],
        topics: {
            math: { 1: [{ id: 1, title: 'Quadratic Equations', day: 'Day 1', date: '2024-01-01', notes: 'Intro to solving with factoring.', duration: '2 hours', type: 'lecture' }, { id: 2, title: 'Graphing Parabolas', day: 'Day 3', date: '2024-01-03', notes: 'Understanding the graph of functions.', duration: '1.5 hours', type: 'practice' }] },
            physics: { 1: [{ id: 4, title: 'Motion and Kinematics', day: 'Day 2', date: '2024-01-02', notes: 'Understanding velocity.', duration: '2 hours', type: 'lecture' }] },
        }
    };

    // --- Side Effects & Helpers ---
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const classTopics = calendarData.topics[selectedClass] || {};
            setTopics(classTopics[selectedWeek] || []);
            setLoading(false);
        }, 300);
    }, [selectedWeek, selectedClass]);
    const scrollWeeks = (direction) => { if (weekScrollRef.current) { weekScrollRef.current.scrollBy({ left: 400 * (direction === 'left' ? -1 : 1), behavior: 'smooth' }); } };
    const handleOpenModal = (topic = null) => { setEditingTopic(topic); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setEditingTopic(null); };
    const handleDeleteTopic = (topicId) => { if (window.confirm('Delete this topic?')) { setTopics(p => p.filter(t => t.id !== topicId)); alert(`Topic ${topicId} deleted!`); } };
    const getTypeIcon = (type) => ({ lecture: '🎓', practice: '✏️', lab: '🔬', quiz: '📝' }[type] || '📖');
    const getTypeColor = (type) => ({ lecture: '#3b82f6', practice: '#10b981', lab: '#f59e0b', quiz: '#ef4444' }[type] || '#6b7280');

    // --- INLINE STYLES OBJECT ---
    const styles = {
        // Layout
        pageContainer: { minHeight: '100vh', backgroundColor: '#f8fafc' },
        mainContent: (isExpanded) => ({ position: 'relative', transition: 'margin-left 0.3s ease-in-out', marginLeft: isExpanded ? '256px' : '80px' }),
        pageWrapper: { padding: '32px' },
        contentMaxWidth: { maxWidth: '1280px', margin: '0 auto' },
        // Calendar Card
        academicCalendar: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)', padding: '32px', fontFamily: 'system-ui, sans-serif' },
        calendarHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', marginBottom: '24px' },
        calendarTitle: { fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: 0 },
        calendarSubtitle: { color: '#64748b', fontSize: '16px', marginTop: '4px' },
        addTopicButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', borderRadius: '8px' },
        // Week & Subject Selectors
        weekSelectorContainer: { marginBottom: '24px' },
        weekSelectorBar: { display: 'flex', alignItems: 'center', gap: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '8px' },
        scrollButton: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#475569' },
        weekSelector: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px', flex: 1, scrollbarWidth: 'none' },
        weekButton: (isActive, isHovered) => ({ background: isActive ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : '#fff', border: `1px solid ${isActive ? '#1d4ed8' : (isHovered ? '#6366f1' : '#e5e7eb')}`, borderRadius: '12px', padding: '10px 16px', cursor: 'pointer', transition: 'all 0.2s ease', minWidth: '140px', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '4px', transform: isActive ? 'scale(1.05) translateY(-2px)' : (isHovered ? 'translateY(-2px)' : 'none'), boxShadow: isActive ? '0 8px 25px rgba(59, 130, 246, 0.3)' : (isHovered ? '0 4px 12px rgba(99, 102, 241, 0.1)' : 'none') }),
        weekButtonShine: (isHovered) => ({ position: 'absolute', top: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)', transition: 'left 0.6s ease', left: isHovered ? '150%' : '-150%' }),
        weekLabel: (isActive) => ({ fontWeight: '600', fontSize: '14px', color: isActive ? '#fff' : '#334155' }),
        weekDate: (isActive) => ({ fontSize: '12px', color: isActive ? '#fff' : '#64748b' }),
        subjectSelectWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '24px' },
        subjectSelect: { width: '100%', maxWidth: '320px', fontSize: '15px', padding: '12px 1rem', borderRadius: '12px', border: '1px solid #d1d5db' },
        // Topics List
        topicsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '16px' },
        topicCard: (accentColor) => ({ background: '#fff', border: '1px solid #e5e7eb', borderLeft: `5px solid ${accentColor}`, borderRadius: '12px', padding: '20px' }),
        topicCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
        topicCardTitleSection: { display: 'flex', alignItems: 'center', gap: '12px' },
        topicCardTypeIcon: (bgColor) => ({ fontSize: '16px', width: '32px', height: '32px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fff', backgroundColor: bgColor }),
        topicCardTitle: { fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 },
        topicCardControls: { display: 'flex', alignItems: 'center', gap: '8px' },
        controlButton: { padding: '8px', borderRadius: '9999px' },
        topicCardDetails: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' },
        detailItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569' },
        notesPreview: { fontSize: '14px', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '16px' },
        // Modal
        modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' },
        modalContent: { background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
        modalHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #e5e7eb' },
        modalTitle: { fontSize: '18px', fontWeight: '600' },
        modalBody: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' },
        modalInput: { width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px' },
        modalFooter: { display: 'flex', justifyContent: 'flex-end', padding: '16px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' },
        modalButton: (variant) => ({ padding: '8px 16px', borderRadius: '8px', border: '1px solid', backgroundColor: variant === 'primary' ? '#4f46e5' : 'white', color: variant === 'primary' ? 'white' : '#374151', borderColor: variant === 'primary' ? '#4f46e5' : '#d1d5db', marginLeft: '8px' }),
    };

    // --- SUB-COMPONENTS (for organization) ---

    const TeacherSidebar = ({ onExpandChange }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        useEffect(() => { onExpandChange(isExpanded); }, [isExpanded, onExpandChange]);
        const sidebarStyle = { position: 'fixed', top: 0, left: 0, zIndex: 40, height: '100vh', transition: 'width 0.3s ease-in-out', width: isExpanded ? '256px' : '80px', background: 'linear-gradient(to bottom, #1e3a8a, #3b82f6)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
        return <aside style={sidebarStyle} onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>{/* ... Sidebar content ... */}</aside>;
    };

    const TeacherTopNavbar = () => {
        const navbarStyle = { position: 'sticky', top: 0, zIndex: 20, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderBottom: '1px solid #e5e7eb', padding: '12px 16px' };
        return <nav style={navbarStyle}>{/* ... Navbar content ... */}</nav>;
    };

    const TopicModal = () => (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>{editingTopic ? 'Edit Topic' : 'Add New Topic'}</h3>
                    <button onClick={handleCloseModal}><X size={20} /></button>
                </div>
                <div style={styles.modalBody}>
                    <input type="text" placeholder="Topic Title" defaultValue={editingTopic?.title} style={styles.modalInput} />
                    <textarea placeholder="Notes..." defaultValue={editingTopic?.notes} style={styles.modalInput} rows="3"></textarea>
                    <input type="text" placeholder="Duration" defaultValue={editingTopic?.duration} style={styles.modalInput} />
                    <select defaultValue={editingTopic?.type} style={styles.modalInput}>
                        <option>lecture</option><option>practice</option><option>lab</option><option>quiz</option>
                    </select>
                </div>
                <div style={styles.modalFooter}>
                    <button style={styles.modalButton('secondary')} onClick={handleCloseModal}>Cancel</button>
                    <button style={styles.modalButton('primary')} onClick={() => { alert('Saved!'); handleCloseModal(); }}>{editingTopic ? 'Save Changes' : 'Add Topic'}</button>
                </div>
            </div>
        </div>
    );

    // --- MAIN RENDER ---
    return (
        <div style={styles.pageContainer}>
            {isModalOpen && <TopicModal />}
            <TeacherSidebar onExpandChange={setIsSidebarExpanded} />
            <div style={styles.mainContent(isSidebarExpanded)}>
                <TeacherTopNavbar />
                <main style={styles.pageWrapper}>
                    <div style={styles.contentMaxWidth}>
                        <div style={styles.academicCalendar}>
                            <div style={styles.calendarHeader}>
                                <div>
                                    <h2 style={styles.calendarTitle}>Academic Calendar</h2>
                                    <p style={styles.calendarSubtitle}>Manage your weekly topic schedule</p>
                                </div>
                                <button style={styles.addTopicButton} onClick={() => handleOpenModal(null)}><Plus size={16} /> Add Topic</button>
                            </div>

                            <div style={styles.weekSelectorContainer}>
                                <div style={styles.weekSelectorBar}>
                                    <button style={styles.scrollButton} onClick={() => scrollWeeks('left')}>←</button>
                                    <div style={styles.weekSelector} ref={weekScrollRef}>
                                        {calendarData.weeks.map((week) => (
                                            <button key={week.id} style={styles.weekButton(selectedWeek === week.id, hoveredWeekId === week.id)} onClick={() => setSelectedWeek(week.id)} onMouseEnter={() => setHoveredWeekId(week.id)} onMouseLeave={() => setHoveredWeekId(null)}>
                                                <span style={styles.weekButtonShine(hoveredWeekId === week.id)}></span>
                                                <span style={styles.weekLabel(selectedWeek === week.id)}>{week.label}</span>
                                                <span style={styles.weekDate(selectedWeek === week.id)}>{week.dateRange}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button style={styles.scrollButton} onClick={() => scrollWeeks('right')}>→</button>
                                </div>
                            </div>
                            
                            <div style={styles.subjectSelectWrapper}>
                                <select style={styles.subjectSelect} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                                    {calendarData.subjects.map((subject) => (<option key={subject.id} value={subject.id}>{subject.icon} {subject.name}</option>))}
                                </select>
                            </div>
                            
                            <div style={styles.topicsContainer}>
                                {loading ? (<div>Loading...</div>) : topics.length > 0 ? (
                                    <div style={styles.topicsGrid}>
                                        {topics.map((topic) => (
                                            <div key={topic.id} style={styles.topicCard(getTypeColor(topic.type))}>
                                                <div style={styles.topicCardHeader}>
                                                    <div style={styles.topicCardTitleSection}>
                                                        <span style={styles.topicCardTypeIcon(getTypeColor(topic.type))}>{getTypeIcon(topic.type)}</span>
                                                        <h4 style={styles.topicCardTitle}>{topic.title}</h4>
                                                    </div>
                                                    <div style={styles.topicCardControls}>
                                                        <button style={styles.controlButton} onClick={() => handleOpenModal(topic)}><Edit size={16} /></button>
                                                        <button style={styles.controlButton} onClick={() => handleDeleteTopic(topic.id)}><Trash2 size={16} /></button>
                                                    </div>
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AcademicCalendarPage;