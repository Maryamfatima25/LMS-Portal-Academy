import { FileText, Calendar, Paperclip, ArrowRight } from 'lucide-react';

const CreateAssignmentCard = () => {
  const lastAssignment = {
    title: 'Algebra Problem Set II',
    dueDate: 'Jul 25, 2024',
    attachmentName: 'problems_set_2.pdf'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex flex-col h-full">
        {/* MODIFIED: Header uses the new palette */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-[rgb(203,220,235)] text-[rgb(19,62,135)] rounded-full flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Create Assignment</h3>
            <p className="text-sm text-gray-500">Design and publish new tasks</p>
          </div>
        </div>

        <div className="my-4 flex-grow">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Last Created</p>
          <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-200">
            <p className="font-bold text-slate-800">{lastAssignment.title}</p>
            <div className="text-sm text-slate-600 space-y-2">
              <div className="flex items-center gap-2"><Calendar size={14} /><span>Due Date: {lastAssignment.dueDate}</span></div>
              <div className="flex items-center gap-2"><Paperclip size={14} /><span>Attachment: {lastAssignment.attachmentName}</span></div>
            </div>
          </div>
        </div>

        {/* MODIFIED: Action Button uses the light blue color with dark text */}
        <div className="mt-auto flex-shrink-0">
          <button 
            className="w-full font-medium py-3 rounded-lg transition-all hover:brightness-95 flex items-center justify-center gap-2"
            style={{ 
              backgroundColor: 'rgb(203, 220, 235)', 
              color: 'rgb(19, 62, 135)' 
            }}
            onClick={() => window.location.href = '/teacher/create-assignment'}
          >
            <span>Create New Assignment</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[rgb(203,220,235)] text-[rgb(19,62,135)] rounded-full flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Create Assignment</h3>
            <p className="text-xs text-gray-500">Last: {lastAssignment.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentCard;