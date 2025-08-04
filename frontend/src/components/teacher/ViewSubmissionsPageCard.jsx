import { useState } from 'react';
import { FolderOpen, FileCheck, Clock } from 'lucide-react';

const ViewSubmissionsPageCard = () => {
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [selectedType, setSelectedType] = useState('Assignment');

  // Mock data
  const submissionsData = {
    '10A': { 'Math': { 'Assignment': { submitted: 56, remaining: 11 }, 'Quiz': { submitted: 48, remaining: 19 } }, 'Physics': { 'Assignment': { submitted: 52, remaining: 15 } } },
    '10B': { 'Math': { 'Assignment': { submitted: 42, remaining: 18 }, 'Quiz': { submitted: 38, remaining: 22 } } },
  };
  const classes = [{ id: '10A', name: 'Class 10-A' }, { id: '10B', name: 'Class 10-B' }, { id: '9A', name: 'Class 9-A' }];
  const subjects = [{ id: 'Math', name: 'Mathematics' }, { id: 'Physics', name: 'Physics' }];
  const types = [{ id: 'Assignment', name: 'Assignment' }, { id: 'Quiz', name: 'Quiz' }];

  const currentSubmissions = submissionsData[selectedClass]?.[selectedSubject]?.[selectedType] || { submitted: 0, remaining: 0 };
  const totalSubmissions = currentSubmissions.submitted + currentSubmissions.remaining;
  const submittedPercentage = totalSubmissions > 0 ? (currentSubmissions.submitted / totalSubmissions) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex flex-col h-full">
        {/* Header - Using one of the new colors for the icon background */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 flex-shrink-0">
          <div className="w-10 h-10 bg-[#CBDCEB] text-[#133E87] rounded-full flex items-center justify-center">
            <FolderOpen size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Submissions</h3>
            <p className="text-sm text-gray-500">Track and review student work</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-3 gap-3 my-4 flex-shrink-0">
          {/* Note: Focus rings will still use the default indigo color unless you configure tailwind.config.js */}
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#608BC1]">
            {classes.map((cls) => (<option key={cls.id} value={cls.id}>{cls.name}</option>))}
          </select>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#608BC1]">
            {subjects.map((sub) => (<option key={sub.id} value={sub.id}>{sub.name}</option>))}
          </select>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#608BC1]">
            {types.map((type) => (<option key={type.id} value={type.id}>{type.name}</option>))}
          </select>
        </div>
        
        {/* Stats Display */}
        <div className="flex-grow flex flex-col justify-center bg-slate-50 rounded-xl p-6">
          <div className="w-full">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-medium text-slate-600">Submission Progress</span>
              <span className="text-xl font-bold text-[rgb(96,139,193)]">{Math.round(submittedPercentage)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              {/* MODIFIED: Progress bar with new color */}
              <div className="h-2.5 rounded-full" style={{ width: `${submittedPercentage}%`, backgroundColor: 'rgb(96, 139, 193)' }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            {/* MODIFIED: Submitted block with new color scheme */}
            <div className="bg-[#eef2ff] p-4 rounded-lg border border-[#c7d2fe]">
              <FileCheck size={24} className="mx-auto text-[rgb(19,62,135)] mb-1" />
              <p className="text-2xl font-bold text-[rgb(19,62,135)]">{currentSubmissions.submitted}</p>
              <p className="text-xs text-slate-500 font-medium">Submitted</p>
            </div>
            {/* MODIFIED: Pending block with new color scheme */}
            <div className="bg-[#f0f9ff] p-4 rounded-lg border border-[#e0f2fe]">
              <Clock size={24} className="mx-auto text-[rgb(96,139,193)] mb-1" />
              <p className="text-2xl font-bold text-[rgb(96,139,193)]">{currentSubmissions.remaining}</p>
              <p className="text-xs text-slate-500 font-medium">Pending</p>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
          <button
            // MODIFIED: Button with new color
            className="w-full text-white font-medium py-3 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'rgb(96, 139, 193)' }}
            onClick={() => window.location.href = '/teacher/view-submissions'}
          >
            Review Submissions
          </button>
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="md:hidden flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#CBDCEB] text-[#133E87] rounded-full flex items-center justify-center">
            <FolderOpen size={20} />
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">Submissions</h3>
        </div>
        <div className="flex-grow flex flex-col justify-center bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-slate-600">Class {selectedClass} - {selectedType}s</p>
          <div className="flex justify-around items-center mt-2">
            <div>
              <p className="text-3xl font-bold text-[rgb(19,62,135)]">{currentSubmissions.submitted}</p>
              <p className="text-xs text-slate-500">Submitted</p>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <p className="text-3xl font-bold text-[rgb(96,139,193)]">{currentSubmissions.remaining}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </div>
        </div>
        <button
          className="w-full text-white font-medium py-3 rounded-lg transition-opacity hover:opacity-90 mt-4"
          style={{ backgroundColor: 'rgb(96, 139, 193)' }}
          onClick={() => window.location.href = '/teacher/view-submissions'}
        >
          Review
        </button>
      </div>
    </div>
  );
};

export default ViewSubmissionsPageCard;