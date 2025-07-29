import { useState, useEffect, useRef } from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';

const QuizResultsCard = () => {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [barsVisible, setBarsVisible] = useState(false);
  const cardRef = useRef(null);

  // Mock quiz data for different subjects (more irregular)
  const quizData = {
    math: {
      subject: 'Mathematics',
      icon: '📐',
      quizzes: [
        { id: 1, name: 'Quiz 1', score: 95, total: 100 },
        { id: 2, name: 'Quiz 2', score: 67, total: 100 },
        { id: 3, name: 'Quiz 3', score: 88, total: 100 },
        { id: 4, name: 'Quiz 4', score: 42, total: 100 },
        { id: 5, name: 'Quiz 5', score: 73, total: 100 },
        { id: 6, name: 'Quiz 6', score: 91, total: 100 }
      ]
    },
    physics: {
      subject: 'Physics',
      icon: '⚛️',
      quizzes: [
        { id: 1, name: 'Quiz 1', score: 58, total: 100 },
        { id: 2, name: 'Quiz 2', score: 82, total: 100 },
        { id: 3, name: 'Quiz 3', score: 71, total: 100 },
        { id: 4, name: 'Quiz 4', score: 89, total: 100 }
      ]
    },
    chemistry: {
      subject: 'Chemistry',
      icon: '🧪',
      quizzes: [
        { id: 1, name: 'Quiz 1', score: 76, total: 100 },
        { id: 2, name: 'Quiz 2', score: 93, total: 100 },
        { id: 3, name: 'Quiz 3', score: 64, total: 100 },
        { id: 4, name: 'Quiz 4', score: 81, total: 100 },
        { id: 5, name: 'Quiz 5', score: 52, total: 100 }
      ]
    },
    english: {
      subject: 'English',
      icon: '📚',
      quizzes: [
        { id: 1, name: 'Quiz 1', score: 88, total: 100 },
        { id: 2, name: 'Quiz 2', score: 74, total: 100 },
        { id: 3, name: 'Quiz 3', score: 96, total: 100 }
      ]
    }
  };

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'english', name: 'English', icon: '📚' }
  ];

  const currentSubjectData = quizData[selectedSubject];
  const quizzes = currentSubjectData.quizzes;

  // Calculate percentage for each quiz
  const quizPercentages = quizzes.map(quiz => ({
    ...quiz,
    percentage: Math.round((quiz.score / quiz.total) * 100)
  }));

  // Find min and max percentages for color scaling
  const percentages = quizPercentages.map(q => q.percentage);
  const minPercentage = Math.min(...percentages);
  const maxPercentage = Math.max(...percentages);

  // Function to get bar color based on score (more visible color differences)
  const getBarColor = (percentage) => {
    // Ensure minimum contrast - increase the color difference range
    const range = Math.max(1, maxPercentage - minPercentage);
    const intensity = (percentage - minPercentage) / range;
    
    // Use Academic Calendar's active week color (#3b82f6) as base
    // Create more visible differences by using wider lightness range
    const lightness = 0.15 + (1 - intensity) * 0.7; // Range from 0.15 (dark) to 0.85 (light)
    
    const baseColor = { r: 59, g: 130, b: 246 }; // rgb(59, 130, 246)
    
    // Apply lightness factor with better contrast
    const r = Math.floor(baseColor.r + (255 - baseColor.r) * lightness);
    const g = Math.floor(baseColor.g + (255 - baseColor.g) * lightness);
    const b = Math.floor(baseColor.b + (255 - baseColor.b) * lightness);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Handle scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      
      const cardRect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Trigger when card is 50% visible in viewport
      if (cardRect.top < windowHeight * 0.5 && cardRect.bottom > 0) {
        setBarsVisible(true);
      }
    };

    // Check on initial load
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={cardRef} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col h-full card-hover">
      {/* Card Header - Compact with subject selector in corner */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 size={16} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 text-base">Quiz Results</h3>
        </div>
        
        {/* Compact Subject Selector in top corner */}
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {quizPercentages.length}
          </div>
          <div className="relative">
            <select 
              className="text-xs font-medium appearance-none bg-gray-100 border border-gray-200 rounded-lg py-1 pl-2 pr-6 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-blue-600"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.icon}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Bar Graph with Proper Axes */}
      <div className="flex-grow">
        {quizPercentages.length > 0 ? (
          <div className="h-full flex flex-col">
            {/* Chart Container with Proper Axes */}
            <div className="flex flex-1 min-h-0">
              {/* Y-axis */}
              <div className="flex flex-col justify-between py-2 text-[10px] text-gray-500 mr-1 w-6">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
              
              {/* Chart Area */}
              <div className="flex flex-col flex-1">
                {/* Bars Area - Bars grow UPWARD from bottom */}
                <div className="flex items-end flex-1 gap-2 relative border-l border-b border-gray-200 pl-2 pb-2">
                  {quizPercentages.map((quiz, index) => (
                    <div key={quiz.id} className="flex flex-col items-center flex-1 h-full group relative">
                      {/* Quiz Number - ON TOP of each bar */}
                      <div className="text-[9px] font-medium text-gray-700 mb-1 z-10">
                        Q{quiz.id}
                      </div>
                      
                      {/* Bar Container */}
                      <div className="flex flex-col items-center justify-end flex-1 w-full relative">
                        {/* Bar - STARTS AT 0% and animates when card is visible */}
                        <div 
                          className="w-3/5 rounded-t-md hover:opacity-90 hover:shadow-lg relative"
                          style={{
                            height: barsVisible ? `${quiz.percentage}%` : '0%',
                            backgroundColor: getBarColor(quiz.percentage),
                            minHeight: '2px',
                            transition: 'height 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                        >
                          {/* Percentage label INSIDE the bar */}
                          <div className="text-xs font-semibold text-white text-center absolute top-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            {quiz.percentage}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* X-axis label */}
            <div className="border-t border-gray-200 mt-1 pt-1">
              <div className="flex justify-center">
                <span className="text-[10px] text-gray-500">Quizzes</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <BarChart3 size={20} className="text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">No Quiz Data</h3>
            <p className="text-gray-500 text-center text-xs">
              No quizzes for {currentSubjectData.subject}
            </p>
          </div>
        )}
      </div>

      {/* Footer - Minimal */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Average</span>
          <span className="font-semibold text-blue-600">
            {quizPercentages.length > 0 
              ? Math.round(quizPercentages.reduce((sum, quiz) => sum + quiz.percentage, 0) / quizPercentages.length) 
              : 0
            }%
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsCard;