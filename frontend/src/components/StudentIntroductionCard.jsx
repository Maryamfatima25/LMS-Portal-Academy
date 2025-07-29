import { Mail, Award, Book } from 'lucide-react';

const StudentIntroductionCard = () => {
  // Mock student data
  const student = {
    name: 'Abdur Rehman Nezami',
    rollNumber: 'FA23-BCS-009',
    email: 'fa23-bcs-009@isbstudent.comsats.edu.pk',
    board: 'Federal Board',
    class: '12th Grade - Section A',
    profilePic: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  return (
    <>
      {/* --- Desktop View - UNCHANGED --- */}
      <div className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-bounce delay-500"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/0 via-blue-600/20 to-indigo-800/0 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
        
        <div className="relative p-8 h-48 flex items-center">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={student.profilePic}
                alt="Student Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-1">{student.name}</h2>
              <p className="text-blue-100 font-medium text-lg mb-4">{student.rollNumber}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-blue-200" />
                  <span className="text-blue-100 text-sm">{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={16} className="text-blue-200" />
                  <span className="text-blue-100 text-sm">{student.board}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Book size={16} className="text-blue-200" />
                  <span className="text-blue-100 text-sm">{student.class}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile View - ENHANCED WITH COLOR --- */}
      <div className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center p-4 text-white">
        <img 
          src={student.profilePic}
          alt="Student Profile"
          className="w-16 h-16 rounded-full border-2 border-white/30 mb-3 shadow-lg"
        />
        <h3 className="font-bold text-white text-lg">{student.name}</h3>
        <p className="text-blue-100 text-sm mb-3">{student.rollNumber}</p>
        <div className="w-full bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Mail size={12} className="text-blue-200" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award size={12} className="text-blue-200" />
              <span>{student.board}</span>
            </div>
            <div className="flex items-center gap-1 col-span-2">
              <Book size={12} className="text-blue-200" />
              <span>{student.class}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentIntroductionCard;