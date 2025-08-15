import { useState } from 'react';
import { PlusCircle, FileText, Calendar, Clock, Eye, Trash2, Edit, Save, X, AlertCircle } from 'lucide-react';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherTopNavbar from '../../components/teacher/TeacherTopNavbar';

const CreateAssignmentPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: '',
    dueTime: '',
    maxMarks: '',
    instructions: '',
    attachments: []
  });
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [filterClass, setFilterClass] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  // Mock data
  const classes = [
    { id: '9A', name: '9th Grade - Section A' },
    { id: '10A', name: '10th Grade - Section A' },
    { id: '10B', name: '10th Grade - Section B' },
    { id: '11A', name: '11th Grade - Section A' },
    { id: '12A', name: '12th Grade - Section A' },
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Quadratic Equations Problem Set',
      subject: 'Mathematics',
      class: '10A',
      dueDate: '2024-02-15',
      dueTime: '23:59',
      maxMarks: 50,
      status: 'active',
      submissions: 25,
      totalStudents: 35,
      createdDate: '2024-01-20'
    },
    {
      id: 2,
      title: 'Wave Motion Lab Report',
      subject: 'Physics',
      class: '11A',
      dueDate: '2024-02-12',
      dueTime: '17:00',
      maxMarks: 30,
      status: 'active',
      submissions: 18,
      totalStudents: 28,
      createdDate: '2024-01-18'
    },
    {
      id: 3,
      title: 'Organic Chemistry Essay',
      subject: 'Chemistry',
      class: '12A',
      dueDate: '2024-01-25',
      dueTime: '23:59',
      maxMarks: 40,
      status: 'expired',
      submissions: 22,
      totalStudents: 24,
      createdDate: '2024-01-10'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleCreateAssignment = async () => {
    if (!formData.title || !formData.subject || !formData.class || !formData.dueDate) {
      alert('Please fill all required fields');
      return;
    }

    setIsCreating(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAssignment = {
        id: assignments.length + 1,
        title: formData.title,
        subject: formData.subject,
        class: formData.class,
        dueDate: formData.dueDate,
        dueTime: formData.dueTime || '23:59',
        maxMarks: parseInt(formData.maxMarks) || 100,
        status: 'active',
        submissions: 0,
        totalStudents: 30, // Mock student count
        createdDate: new Date().toISOString().split('T')[0]
      };

      setAssignments(prev => [newAssignment, ...prev]);
      setFormData({
        title: '',
        description: '',
        subject: '',
        class: '',
        dueDate: '',
        dueTime: '',
        maxMarks: '',
        instructions: '',
        attachments: []
      });
      alert('Assignment created successfully!');
    } catch (error) {
      alert('Failed to create assignment');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(assignment => assignment.id !== id));
    }
  };

  const isOverdue = (dueDate, dueTime) => {
    const due = new Date(`${dueDate} ${dueTime}`);
    return due < new Date();
  };

  const filteredAssignments = assignments.filter(assignment => {
    return (!filterClass || assignment.class === filterClass) &&
           (!filterSubject || assignment.subject === filterSubject);
  });

  const AssignmentPreview = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Assignment Preview</h3>
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Subject: {formData.subject}</span>
              <span>Class: {formData.class}</span>
              <span>Due: {formData.dueDate} at {formData.dueTime}</span>
              <span>Max Marks: {formData.maxMarks}</span>
            </div>
          </div>
          
          {formData.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{formData.description}</p>
            </div>
          )}
          
          {formData.instructions && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.instructions}</p>
            </div>
          )}
          
          {formData.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Attachments</h3>
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <FileText size={16} className="text-indigo-600" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar onExpandChange={setIsSidebarExpanded} />
      
      <div className={`relative transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <TeacherTopNavbar />
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Assignment</h1>
              <p className="text-gray-600">Create and manage assignments for your students</p>
            </div>

            {/* Create Assignment Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">New Assignment</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter assignment title"
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

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Due Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
                  <input
                    type="time"
                    name="dueTime"
                    value={formData.dueTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Max Marks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Marks</label>
                  <input
                    type="number"
                    name="maxMarks"
                    value={formData.maxMarks}
                    onChange={handleInputChange}
                    placeholder="100"
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
                  placeholder="Enter assignment description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter detailed instructions for students"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* File Attachments */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <FileText size={32} className="text-gray-400" />
                    <span className="text-sm text-gray-600">Click to upload files</span>
                  </label>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-indigo-600" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye size={16} />
                  Preview
                </button>
                
                <button
                  onClick={handleCreateAssignment}
                  disabled={isCreating}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isCreating ? (
                    <>
                      <Save size={16} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <PlusCircle size={16} />
                      Create Assignment
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Existing Assignments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">Existing Assignments</h2>
                  
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
                  </div>
                </div>
              </div>

              <div className="p-6">
                {filteredAssignments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAssignments.map((assignment) => (
                      <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                              {isOverdue(assignment.dueDate, assignment.dueTime) && assignment.status === 'active' && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                  <AlertCircle size={12} />
                                  Overdue
                                </span>
                              )}
                              {assignment.status === 'expired' && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  Expired
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              {assignment.subject} • {assignment.class} • {assignment.maxMarks} marks
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                              </div>
                              <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-indigo-600">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600">
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(assignment.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No assignments found</h3>
                    <p className="text-gray-600">Create your first assignment to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      {showPreview && <AssignmentPreview />}
    </div>
  );
};

export default CreateAssignmentPage;
