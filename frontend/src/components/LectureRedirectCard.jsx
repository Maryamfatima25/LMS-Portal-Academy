import './LectureRedirectCard.css'; 
import { useState, useEffect } from 'react';
import { BookOpen, User, Calendar, ArrowRight, PlayCircle, Play } from 'lucide-react';

const LectureRedirectCard = ({ compact = false }) => {
  // Mock Data
  const lecturesData = {
    math: { id: 1, title: 'Advanced Calculus - Derivatives', lecturer: 'Dr. Alan Turing', dateUploaded: '2024-10-22', topic: 'Calculus' },
    physics: { id: 2, title: 'Quantum Mechanics - Wave-Particle Duality', lecturer: 'Dr. Marie Curie', dateUploaded: '2024-10-21', topic: 'Quantum Physics' },
    chemistry: { id: 3, title: 'Organic Chemistry - SN1/SN2 Reactions', lecturer: 'Dr. Rosalind Franklin', dateUploaded: '2024-10-23', topic: 'Reaction Mechanisms' },
    english: { id: 4, title: 'Literary Analysis of Hamlet', lecturer: 'Prof. William Shakespeare', dateUploaded: '2024-10-20', topic: 'Classic Literature' },
  };

  const [selectedSubject, setSelectedSubject] = useState('chemistry');
  const [latestLecture, setLatestLecture] = useState(null);

  useEffect(() => {
    if (lecturesData[selectedSubject]) {
      setLatestLecture(lecturesData[selectedSubject]);
    }
  }, [selectedSubject]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Compact mobile version
  if (compact) {
    return (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={20} />
            <h3 className="font-semibold">Latest Lecture</h3>
          </div>
          <select 
            className="bg-white/20 text-white text-xs rounded px-2 py-1 border border-white/30"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="math">📐 Math</option>
            <option value="physics">⚛️ Physics</option>
            <option value="chemistry">🧪 Chemistry</option>
            <option value="english">📚 English</option>
          </select>
        </div>
        
        <div className="mb-4">
          <div className="bg-white/20 rounded-lg p-3 mb-2">
            <h4 className="font-medium text-sm mb-1">{latestLecture?.title}</h4>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <User size={12} />
              <span>{latestLecture?.lecturer}</span>
            </div>
            <div className="text-xs opacity-90 mt-1">
              Uploaded: {latestLecture ? formatDate(latestLecture.dateUploaded) : ''}
            </div>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors text-sm font-medium">
          <Play size={16} />
          Watch Lecture
        </button>
      </div>
    );
  }

  // Regular desktop version
  return (
    <div className="lecture-card-container">
      {/* Visual Side (Left) */}
      <div className="lecture-card-visual">
        <div className="visual-content">
          <BookOpen className="visual-icon" size={48} />
          <h3 className="visual-title">Latest Lecture</h3>
          <p className="visual-subtitle">The most recently uploaded lecture for your selected subject.</p>
        </div>
      </div>

      {/* Content Side (Right) */}
      <div className="lecture-card-content">
        {/* Subject Selector */}
        <div className="subject-select-wrapper-sm mb-6">
          <select 
            className="subject-select-sm"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="chemistry">🧪 Chemistry</option>
            <option value="math">📐 Mathematics</option>
            <option value="physics">⚛️ Physics</option>
            <option value="english">📚 English</option>
          </select>
        </div>

        {/* Lecture Details */}
        <div className="flex-grow">
          {latestLecture ? (
            <>
              <div className="mb-2">
                <span className="lecture-topic-pill">{latestLecture.topic}</span>
              </div>
              <h4 className="lecture-title">{latestLecture.title}</h4>
              
              <div className="lecture-details-grid">
                <div className="lecture-detail-item">
                  <User size={14} className="text-gray-400" />
                  <span>{latestLecture.lecturer}</span>
                </div>
                <div className="lecture-detail-item">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Uploaded on {formatDate(latestLecture.dateUploaded)}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No lecture found for this subject.</p>
          )}
        </div>

        {/* Redirect Button */}
        <div className="mt-6">
          <button className="watch-lecture-button">
            <PlayCircle size={20} />
            <span>Watch Lecture</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureRedirectCard;