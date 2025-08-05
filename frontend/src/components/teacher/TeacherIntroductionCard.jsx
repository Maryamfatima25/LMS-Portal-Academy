import { Lightbulb } from 'lucide-react';
// You can use the same graphic or a different one for teachers
import teacherGraphic from '../teacher/IntroCardPic.jpeg';

const TeacherIntroductionCard = () => {
  const teacher = {
    name: 'Dr. Sarah Johnson',
  };
  const titleAndLastName = `Dr. ${teacher.name.split(' ').slice(1).join(' ')}`;

  // MODIFIED: Teacher-centric motivational quotes
  const quotes = [
    { text: "The art of teaching is the art of assisting discovery.", author: "Mark Van Doren" },
    { text: "A good teacher can inspire hope, ignite the imagination, and instill a love of learning.", author: "Brad Henry" },
    { text: "To teach is to learn twice over.", author: "Joseph Joubert" }
  ];

  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const quote = quotes[dayOfYear % quotes.length];

  return (
    <>
      {/* --- Desktop View (Mirrors Student Card Layout) --- */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 py-4 px-6 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Side: All Text Content */}
          <div className="flex flex-col h-full justify-between">
            {/* Top: Welcome Text */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back,
              </h1>
              <h2 className="text-2xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  {titleAndLastName}!
                </span>
              </h2>
            </div>

            {/* Middle: Motivational Quote Section */}
            <div className="my-2">
              <div className="flex items-start gap-2 p-2 bg-gray-50/70 rounded-lg max-w-md">
                <Lightbulb className="text-yellow-500 mt-1 flex-shrink-0" size={16} />
                <div>
                  <p className="text-gray-600 italic text-xs">"{quote.text}"</p>
                  <p className="text-right text-[10px] text-gray-400 mt-1">- {quote.author}</p>
                </div>
              </div>
            </div>
            
            {/* Bottom: Placeholder for vertical spacing (no button) */}
            <div className="h-8"></div>
          </div>

          {/* Right Side: Graphic */}
          <div className="w-1/5">
            <img 
              src={teacherGraphic}
              alt="Teacher illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* --- Mobile View (Mirrors Student Card Layout) --- */}
      <div className="md:hidden bg-white rounded-2xl shadow-sm border border-gray-200 p-5 text-center">
         <h2 className="text-2xl font-extrabold mb-2">
             <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
               Welcome, {titleAndLastName}!
             </span>
         </h2>
         <p className="text-gray-500 text-xs mb-3 italic">
           "{quote.text}"
         </p>
         <div className="w-full max-w-[150px] mx-auto">
           <img 
             src={teacherGraphic}
             alt="Teacher illustration"
             className="w-full h-auto object-contain"
           />
         </div>
      </div>
    </>
  );
};

export default TeacherIntroductionCard;