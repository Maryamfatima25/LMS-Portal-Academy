import { FileText, CheckSquare, ArrowRight } from 'lucide-react';

const CreateContentCard = () => {
  // Your specific color palette
  const quizColor = 'rgb(19, 62, 135)';
  const assignmentColor = 'rgb(203, 220, 235)';
  const assignmentTextColor = 'rgb(19, 62, 135)';

  return (
    // Main container - a single, unified card
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
      {/* Header for the entire component */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
        <div className="w-10 h-10 bg-[rgb(203,220,235)] text-[rgb(19,62,135)] rounded-full flex items-center justify-center">
          <FileText size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">Creation Tools</h3>
          <p className="text-sm text-gray-500">Design new materials for your classes</p>
        </div>
      </div>

      {/* Grid container for the two action buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* --- Create Assignment Button --- */}
        <button
          className="group relative text-left p-6 rounded-2xl transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg hover:-translate-y-1"
          style={{ 
            backgroundColor: assignmentColor,
            color: assignmentTextColor,
          }}
          onClick={() => window.location.href = '/teacher/create-assignment'}
        >
          {/* Decorative background icon */}
          <FileText 
            className="absolute -right-2 -bottom-2 transition-transform duration-300 group-hover:scale-110" 
            size={72} 
            strokeWidth={1.5} 
            style={{ color: 'rgba(19, 62, 135, 0.1)' }}
          />
          
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-white/50">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-bold">Create an Assignment</h3>
            <p className="text-sm opacity-80 mt-1">Publish a new task with deadlines and attachments.</p>
          </div>
        </button>

        {/* --- Create Quiz Button --- */}
        <button
          className="group relative text-white text-left p-6 rounded-2xl transition-all duration-300 ease-in-out overflow-hidden hover:shadow-lg hover:-translate-y-1"
          style={{ backgroundColor: quizColor }}
          onClick={() => window.location.href = '/teacher/create-quiz'}
        >
          {/* Decorative background icon */}
          <CheckSquare 
            className="absolute -right-2 -bottom-2 text-white/10 transition-transform duration-300 group-hover:scale-110" 
            size={72} 
            strokeWidth={1.5} 
          />
          
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mb-3">
              <CheckSquare size={20} />
            </div>
            <h3 className="text-lg font-bold">Create a Quiz</h3>
            <p className="text-white/80 text-sm mt-1">Build an assessment with automated grading.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CreateContentCard;