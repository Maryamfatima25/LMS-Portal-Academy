import React, { useState } from 'react';
import { BookOpen, Calendar, Edit } from 'lucide-react';

const UploadLectureCard = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [isHovered, setIsHovered] = useState(false);

  // Mock data...
  const lectureData = {
    '10A': { id: 1, chapter: 'Trigonometry', topic: 'Intro to Sine and Cosine', uploadDate: '2024-01-23' },
    '10B': { id: 2, chapter: 'Organic Chemistry', topic: 'Alkanes and Alkenes', uploadDate: '2024-01-22' },
    '9A': { id: 3, chapter: 'Motion and Force', topic: 'Newton\'s Laws of Motion', uploadDate: '2024-01-21' },
  };
  const classes = [ { id: '10A', name: '10A - Mathematics' }, { id: '10B', name: '10B - Chemistry' }, { id: '9A', name: '9A - Physics' }];
  const currentLecture = lectureData[selectedClass];

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // --- INLINE STYLES ---

  const containerStyle = {
    display: 'flex',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
    overflow: 'hidden',
    // MODIFIED: Set a fixed height that matches the timetable card
    height: '320px', 
  };

  const visualSideStyle = {
    width: '35%',
    background: 'linear-gradient(160deg, #1e3a8a 0%, #3b82f6 100%)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#ffffff',
    position: 'relative',
  };
  
  // ... (rest of the inline styles are the same)
  
  const decorativeCircleBase = { content: '""', position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', transition: 'transform 0.5s ease', transform: 'scale(1)' };
  const decorativeCircleHover = { ...decorativeCircleBase, transform: 'scale(1.2)' };
  const contentSideStyle = { width: '65%', padding: '32px', display: 'flex', flexDirection: 'column' };
  const selectStyle = { fontSize: '14px', fontWeight: '500', color: '#334155', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' };
  const buttonStyle = { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#4f46e5', color: '#ffffff', fontSize: '14px', fontWeight: '500', padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer' };

  return (
    <div 
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={visualSideStyle}>
        <div style={isHovered ? decorativeCircleHover : decorativeCircleBase}></div>
        <div style={{ position: 'relative' }}>
          <BookOpen style={{ marginBottom: '16px', opacity: '0.7' }} size={48} />
          <h3 style={{ fontSize: '28px', fontWeight: '700', lineHeight: '1.2' }}>Upload Lectures</h3>
          <p style={{ fontSize: '14px', marginTop: '8px', opacity: '0.8', lineHeight: '1.5' }}>
            Manage and publish new lecture materials.
          </p>
        </div>
      </div>
      <div style={contentSideStyle}>
        <div style={{ alignSelf: 'flex-end', marginBottom: '24px' }}>
          <select style={selectStyle} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classes.map((cls) => (<option key={cls.id} value={cls.id}>{cls.name}</option>))}
          </select>
        </div>
        <div style={{ flexGrow: 1 }}>
          {currentLecture ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div><span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', color: '#312e81', backgroundColor: '#e0e7ff', padding: '4px 10px', borderRadius: '20px' }}>{currentLecture.chapter}</span></div>
              <h4 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '8px', lineHeight: '1.3' }}>{currentLecture.topic}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b' }}><Calendar size={14} /><span>Last Uploaded: {formatDate(currentLecture.uploadDate)}</span></div>
            </div>
          ) : (<p style={{ color: '#64748b' }}>No lectures found.</p>)}
        </div>
        <div style={{ marginTop: '24px' }}><button style={buttonStyle}><Edit size={16} /><span>Upload / Edit</span></button></div>
      </div>
    </div>
  );
};

export default UploadLectureCard;