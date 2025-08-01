import { CheckSquare, Calendar, HelpCircle, ArrowRight } from 'lucide-react';

const CreateQuizCard = () => {
  const lastQuiz = {
    title: 'Physics Quiz - Chapter 3',
    dueDate: 'Jul 28, 2024',
    questionCount: 15
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex flex-col h-full">
        {/* MODIFIED: Header uses the new palette */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-[rgb(203,220,235)] text-[rgb(19,62,135)] rounded-full flex items-center justify-center">
            <CheckSquare size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Create Quiz</h3>
            <p className="text-sm text-gray-500">Build and schedule assessments</p>
          </div>
        </div>

        <div className="my-4 flex-grow">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Last Created</p>
          <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-200">
            <p className="font-bold text-slate-800">{lastQuiz.title}</p>
            <div className="text-sm text-slate-600 space-y-2">
              <div className="flex items-center gap-2"><Calendar size={14} /><span>Due Date: {lastQuiz.dueDate}</span></div>
              <div className="flex items-center gap-2"><HelpCircle size={14} /><span>{lastQuiz.questionCount} Questions</span></div>
            </div>
          </div>
        </div>

        {/* MODIFIED: Button uses the dark blue color */}
        <div className="mt-auto flex-shrink-0">
          <button 
            className="w-full text-white font-medium py-3 rounded-lg transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'rgb(19, 62, 135)' }}
            onClick={() => window.location.href = '/teacher/create-quiz'}
          >
            <span>Create New Quiz</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[rgb(203,220,235)] text-[rgb(19,62,135)] rounded-full flex items-center justify-center">
            <CheckSquare size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Create Quiz</h3>
            <p className="text-xs text-gray-500">Last: {lastQuiz.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizCard;