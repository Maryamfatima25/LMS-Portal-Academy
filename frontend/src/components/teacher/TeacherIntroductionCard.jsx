import { Mail, GraduationCap, Users } from 'lucide-react';

const TeacherIntroductionCard = () => {
  // Mock teacher data
  const teacher = {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@academy.edu',
    education: 'Ph.D. in Mathematics',
    department: 'Mathematics Department',
    profilePic: 'https://i.pravatar.cc/150?u=teacher001',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop',
  };

  return (
    <>
      {/* --- Desktop View --- */}
      <div 
        className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative"
      >
        <div 
          className="h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${teacher.coverImage})` }}
        >
          {/* The gradient overlay is crucial for text readability over a real image */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent"></div>
        </div>

        <div className="absolute top-0 left-0 p-8 w-full h-full flex items-center">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <img
              src={teacher.profilePic}
              alt="Teacher Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            
            {/* Teacher Info */}
            <div>
              <h2 className="text-3xl font-bold text-white">{teacher.name}</h2>
              
              <div className="mt-4 flex flex-col gap-3 text-gray-200">
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} />
                  <span>{teacher.education}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={16} />
                  <span>{teacher.department}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile View --- */}
      <div className="md:hidden bg-white border-2 border-gray-200 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center p-6">
        <img 
          src={teacher.profilePic}
          alt="Teacher Profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-500 mb-4"
        />
        <h3 className="font-semibold text-gray-900 text-xl">{teacher.name}</h3>
        <div className="mt-4 text-left text-gray-600 space-y-2">
            <p className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2" /> 
                {teacher.email}
            </p>
            <p className="flex items-center text-sm">
                <GraduationCap className="w-4 h-4 mr-2" /> 
                {teacher.education}
            </p>
            <p className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2" /> 
                {teacher.department}
            </p>
        </div>
      </div>
    </>
  );
};

export default TeacherIntroductionCard;