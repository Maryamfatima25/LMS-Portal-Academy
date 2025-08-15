import { useState } from 'react';
import { Upload, FileText, Video, Trash2, Edit, Eye, Calendar, BookOpen, Filter } from 'lucide-react';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherTopNavbar from '../../components/teacher/TeacherTopNavbar';

const UploadLecturePage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    file: null,
    videoUrl: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [filterClass, setFilterClass] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Mock data
  const classes = [
    { id: '9A', name: '9th Grade - Section A' },
    { id: '10A', name: '10th Grade - Section A' },
    { id: '10B', name: '10th Grade - Section B' },
    { id: '11A', name: '11th Grade - Section A' },
    { id: '12A', name: '12th Grade - Section A' },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

  const [uploadedLectures, setUploadedLectures] = useState([
    {
      id: 1,
      title: 'Introduction to Quadratic Equations',
      subject: 'Mathematics',
      class: '10A',
      type: 'PDF',
      dateUploaded: '2024-01-20',
      description: 'Basic concepts of quadratic equations and their applications'
    },
    {
      id: 2,
      title: 'Wave Properties and Motion',
      subject: 'Physics',
      class: '11A',
      type: 'Video',
      dateUploaded: '2024-01-18',
      description: 'Understanding wave properties, frequency, and amplitude'
    },
    {
      id: 3,
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      class: '12A',
      type: 'PDF',
      dateUploaded: '2024-01-15',
      description: 'Introduction to organic compounds and nomenclature'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('video/'))) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = async () => {
    if (!formData.title || !formData.subject || !formData.class || (!formData.file && !formData.videoUrl)) {
      alert('Please fill all required fields');
      return;
    }

    setIsUploading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newLecture = {
        id: uploadedLectures.length + 1,
        title: formData.title,
        subject: formData.subject,
        class: formData.class,
        type: formData.file ? (formData.file.type === 'application/pdf' ? 'PDF' : 'Video') : 'Video',
        dateUploaded: new Date().toISOString().split('T')[0],
        description: formData.description
      };

      setUploadedLectures(prev => [newLecture, ...prev]);
      setFormData({
        title: '',
        description: '',
        subject: '',
        class: '',
        file: null,
        videoUrl: ''
      });
      alert('Lecture uploaded successfully!');
    } catch (error) {
      alert('Failed to upload lecture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      setUploadedLectures(prev => prev.filter(lecture => lecture.id !== id));
    }
  };

  const filteredLectures = uploadedLectures
    .filter(lecture => {
      return (!filterClass || lecture.class === filterClass) &&
             (!filterSubject || lecture.subject === filterSubject);
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.dateUploaded) - new Date(a.dateUploaded);
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar onExpandChange={setIsSidebarExpanded} />
      
      <div className={`relative transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <TeacherTopNavbar />
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Lectures</h1>
              <p className="text-gray-600">Upload and manage educational content for your students</p>
            </div>

            {/* Upload Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload New Lecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter lecture title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="YouTube, Drive, or other video link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter lecture description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors"
                >
                  {formData.file ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText size={24} className="text-indigo-600" />
                      <span className="text-gray-900">{formData.file.name}</span>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
                      <label className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                        Browse Files
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          accept=".pdf,video/*"
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Supported: PDF, Video files</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? (
                  <>
                    <Upload size={16} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload Lecture
                  </>
                )}
              </button>
            </div>

            {/* Uploaded Lectures */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Uploaded Lectures</h2>
                  
                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">All Classes</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>

                    <select
                      value={filterSubject}
                      onChange={(e) => setFilterSubject(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">All Subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="date">Sort by Date</option>
                      <option value="title">Sort by Title</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {filteredLectures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLectures.map((lecture) => (
                      <div key={lecture.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {lecture.type === 'PDF' ? (
                              <FileText size={20} className="text-red-600" />
                            ) : (
                              <Video size={20} className="text-blue-600" />
                            )}
                            <span className="text-sm font-medium text-gray-600">{lecture.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="p-1 text-gray-400 hover:text-indigo-600">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(lecture.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{lecture.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{lecture.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{lecture.subject} • {lecture.class}</span>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(lecture.dateUploaded).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No lectures found</h3>
                    <p className="text-gray-600">Upload your first lecture to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadLecturePage;
