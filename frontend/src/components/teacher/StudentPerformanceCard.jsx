import { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

// Mock Data for the Teacher's View
const performanceData = {
  '10A': {
    'student-1': { 'Quizzes/Assignments': 85, 'SLPs/FLPs': 78, 'Board Results': 92 },
    'student-2': { 'Quizzes/Assignments': 91, 'SLPs/FLPs': 82, 'Board Results': 88 },
  },
  '10B': {
    'student-3': { 'Quizzes/Assignments': 76, 'SLPs/FLPs': 88, 'Board Results': 81 },
  }
};
const studentLists = {
  '10A': [{ id: 'student-1', name: 'Abdur Rehman' }, { id: 'student-2', name: 'Fatima Ahmed' }],
  '10B': [{ id: 'student-3', name: 'Ali Khan' }],
};

const StudentPerformanceCard = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedStudent, setSelectedStudent] = useState('student-1');
  const [selectedType, setSelectedType] = useState('Quizzes/Assignments');
  
  const [studentsInClass, setStudentsInClass] = useState(studentLists['10A']);
  const [targetPercentage, setTargetPercentage] = useState(0);
  const [animatedDisplayValue, setAnimatedDisplayValue] = useState(0);

  // Update student list when class changes
  useEffect(() => {
    setStudentsInClass(studentLists[selectedClass] || []);
    // Reset to the first student of the new class, or null if no students
    setSelectedStudent(studentLists[selectedClass]?.[0]?.id || null);
  }, [selectedClass]);

  // Update the target percentage when any filter changes
  useEffect(() => {
    const studentData = performanceData[selectedClass]?.[selectedStudent];
    const percentage = studentData ? studentData[selectedType] : 0;
    setTargetPercentage(percentage);
  }, [selectedClass, selectedStudent, selectedType]);
  
  // Animation hook (adapted from your AttendanceProgressBar)
  useEffect(() => {
    let animationFrameId;
    const startValue = animatedDisplayValue;
    const endValue = targetPercentage;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.round(startValue + (endValue - startValue) * progress);
      setAnimatedDisplayValue(currentValue);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPercentage]); // Re-run animation when the target percentage changes

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return '#16a34a'; // green-600
    if (percentage >= 75) return '#2563eb'; // blue-600
    if (percentage >= 60) return '#f59e0b'; // amber-500
    return '#dc2626'; // red-600
  };
  const performanceColor = getPerformanceColor(targetPercentage);

  // Reusable Animated Doughnut Chart
  const AnimatedDoughnutChart = ({ size, strokeWidth, percentage }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex justify-center items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
          <circle 
            cx={size/2} cy={size/2} r={radius} fill="none" stroke={performanceColor}
            strokeWidth={strokeWidth} strokeDasharray={circumference} strokeLinecap="round"
            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.8s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="text-3xl font-bold text-gray-900 leading-none">{animatedDisplayValue}%</div>
          <div className="text-xs text-gray-500 mt-1 font-medium">Performance</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Student Performance</h3>
            <p className="text-sm text-gray-500">View individual results</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 my-4 flex-shrink-0">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {Object.keys(studentLists).map(cls => <option key={cls} value={cls}>Class {cls}</option>)}
        </select>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {studentsInClass.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
        </select>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {['Quizzes/Assignments', 'SLPs/FLPs', 'Board Results'].map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <AnimatedDoughnutChart size={180} strokeWidth={22} percentage={animatedDisplayValue} />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <button className="w-full bg-indigo-50 text-indigo-700 font-medium py-3 rounded-lg hover:bg-indigo-100 transition-colors">
          View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default StudentPerformanceCard;