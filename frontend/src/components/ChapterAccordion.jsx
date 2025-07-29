import { BookOpen, ChevronDown, ChevronRight, ChevronLeft, Play } from 'lucide-react';

const ChapterAccordion = ({ subjectData, openChapters, onToggleChapter, onSelectChapter, onBack }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-2"
          >
            <ChevronLeft size={16} />
            <span>Back to Subjects</span>
          </button>
          <h2 className="text-2xl font-semibold text-gray-900">{subjectData?.name} - Chapters</h2>
        </div>
      </div>
      
      <div className="space-y-4">
        {subjectData?.chapters.map((chapter) => (
          <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onToggleChapter(chapter.id)}
            >
              <div className="flex items-center gap-3">
                <button className="p-1">
                  {openChapters[chapter.id] ? 
                    <ChevronDown size={20} className="text-gray-600" /> : 
                    <ChevronRight size={20} className="text-gray-600" />
                  }
                </button>
                <BookOpen size={20} className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
              </div>
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                {chapter.topics.length} topics
              </span>
            </div>
            
            {openChapters[chapter.id] && (
              <div className="border-t border-gray-200 bg-white">
                <div className="p-4">
                  <div className="space-y-3">
                    {chapter.topics.map((topic) => (
                      <div 
                        key={topic.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer transition-colors"
                        onClick={() => onSelectChapter(chapter)} // Navigate to topic list
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <Play size={16} className="text-blue-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">{topic.title}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{topic.duration}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterAccordion;