import { useState } from 'react';
import { FileText, Download, Eye, MessageSquare, Clock, CheckCircle, XCircle, Star, Filter, Search } from 'lucide-react';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherTopNavbar from '../../components/teacher/TeacherTopNavbar';

const ViewSubmissionsPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeValue, setGradeValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isGrading, setIsGrading] = useState(false);

  // Mock data
  const assignments = [
    { id: 1, title: 'Quadratic Equations Problem Set', subject: 'Mathematics', class: '10A', maxMarks: 50 },
    { id: 2, title: 'Wave Motion Lab Report', subject: 'Physics', class: '11A', maxMarks: 30 },
    { id: 3, title: 'Organic Chemistry Essay', subject: 'Chemistry', class: '12A', maxMarks: 40 },
    { id: 4, title: 'English Literature Analysis', subject: 'English', class: '10B', maxMarks: 35 }
  ];

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      assignmentId: 1,
      studentName: 'Alice Johnson',
      rollNumber: '10A001',
      submittedAt: '2024-02-10T14:30:00',
      status: 'graded',
      grade: 45,
      maxMarks: 50,
      feedback: 'Excellent work! Clear understanding of concepts.',
      files: [
        { name: 'Assignment_Solution.pdf', size: '2.3 MB', type: 'pdf' }
      ],
      lateSubmission: false
    },
    {
      id: 2,
      assignmentId: 1,
      studentName: 'Bob Smith',
      rollNumber: '10A002',
      submittedAt: '2024-02-12T16:45:00',
      status: 'pending',
      grade: null,
      maxMarks: 50,
      feedback: '',
      files: [
        { name: 'Math_Assignment.pdf', size: '1.8 MB', type: 'pdf' }
      ],
      lateSubmission: true
    },
    {
      id: 3,
      assignmentId: 1,
      studentName: 'Carol Davis',
      rollNumber: '10A003',
      submittedAt: '2024-02-09T11:20:00',
      status: 'graded',
      grade: 42,
      maxMarks: 50,
      feedback: 'Good work. Need improvement in problem 3.',
      files: [
        { name: 'Solutions.pdf', size: '3.1 MB', type: 'pdf' },
        { name: 'Graphs.jpg', size: '1.2 MB', type: 'image' }
      ],
      lateSubmission: false
    },
    {
      id: 4,
      assignmentId: 2,
      studentName: 'David Wilson',
      rollNumber: '11A001',
      submittedAt: '2024-02-11T09:15:00',
      status: 'pending',
      grade: null,
      maxMarks: 30,
      feedback: '',
      files: [
        { name: 'Lab_Report.docx', size: '2.7 MB', type: 'doc' }
      ],
      lateSubmission: false
    }
  ]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesAssignment = !selectedAssignment || submission.assignmentId === parseInt(selectedAssignment);
    const matchesStatus = !filterStatus || submission.status === filterStatus;
    const matchesSearch = !searchTerm || 
      submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAssignment && matchesStatus && matchesSearch;
  });

  const handleGradeSubmission = async (submissionId) => {
    if (!gradeValue || isNaN(gradeValue)) {
      alert('Please enter a valid grade');
      return;
    }

    setIsGrading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmissions(prev => prev.map(sub => 
        sub.id === submissionId 
          ? { 
              ...sub, 
              grade: parseInt(gradeValue), 
              feedback,
              status: 'graded'
            }
          : sub
      ));
      
      setSelectedSubmission(null);
      setGradeValue('');
      setFeedback('');
      alert('Grade submitted successfully!');
    } catch (error) {
      alert('Failed to submit grade');
    } finally {
      setIsGrading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'late':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-500" size={16} />;
      case 'doc':
        return <FileText className="text-blue-500" size={16} />;
      case 'image':
        return <FileText className="text-green-500" size={16} />;
      default:
        return <FileText className="text-gray-500" size={16} />;
    }
  };

  const GradingModal = ({ submission }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Grade Submission</h3>
              <p className="text-gray-600">{submission.studentName} - {submission.rollNumber}</p>
            </div>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Submission Info */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Submitted:</span>
                <p className="text-gray-900">{new Date(submission.submittedAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}>
                  {submission.status}
                </span>
                {submission.lateSubmission && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Late
                  </span>
                )}
              </div>
            </div>
            
            {/* Files */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-600 block mb-2">Submitted Files:</span>
              <div className="space-y-2">
                {submission.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span className="text-sm text-gray-900">{file.name}</span>
                      <span className="text-xs text-gray-500">({file.size})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-indigo-600 hover:text-indigo-700">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-green-600 hover:text-green-700">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grading Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade (Max: {submission.maxMarks})
                </label>
                <input
                  type="number"
                  value={gradeValue}
                  onChange={(e) => setGradeValue(e.target.value)}
                  max={submission.maxMarks}
                  min="0"
                  placeholder={`0 - ${submission.maxMarks}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  <div>Percentage: {gradeValue ? Math.round((gradeValue / submission.maxMarks) * 100) : 0}%</div>
                  <div>
                    Grade: {gradeValue ? 
                      (gradeValue / submission.maxMarks >= 0.9 ? 'A' :
                       gradeValue / submission.maxMarks >= 0.8 ? 'B' :
                       gradeValue / submission.maxMarks >= 0.7 ? 'C' :
                       gradeValue / submission.maxMarks >= 0.6 ? 'D' : 'F') : '-'
                    }
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                placeholder="Provide feedback to the student..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleGradeSubmission(submission.id)}
                disabled={isGrading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isGrading ? 'Submitting...' : 'Submit Grade'}
              </button>
            </div>
          </div>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">View Submissions</h1>
              <p className="text-gray-600">Review and grade student submissions</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment</label>
                  <select
                    value={selectedAssignment}
                    onChange={(e) => setSelectedAssignment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Assignments</option>
                    {assignments.map((assignment) => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="graded">Graded</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Student</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or roll number"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredSubmissions.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredSubmissions.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Graded</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredSubmissions.filter(s => s.status === 'graded').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Grade</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredSubmissions.filter(s => s.grade !== null).length > 0
                        ? Math.round(
                            filteredSubmissions
                              .filter(s => s.grade !== null)
                              .reduce((sum, s) => sum + (s.grade / s.maxMarks * 100), 0) /
                            filteredSubmissions.filter(s => s.grade !== null).length
                          )
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Submissions</h2>
              </div>

              <div className="p-6">
                {filteredSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredSubmissions.map((submission) => {
                      const assignment = assignments.find(a => a.id === submission.assignmentId);
                      return (
                        <div key={submission.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{submission.studentName}</h3>
                                <span className="text-sm text-gray-600">({submission.rollNumber})</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}>
                                  {submission.status}
                                </span>
                                {submission.lateSubmission && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                    Late
                                  </span>
                                )}
                              </div>
                              
                              <div className="text-sm text-gray-600 mb-2">
                                Assignment: {assignment?.title}
                              </div>
                              
                              <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  <span>Submitted: {new Date(submission.submittedAt).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FileText size={12} />
                                  <span>{submission.files.length} file(s)</span>
                                </div>
                                {submission.grade !== null && (
                                  <div className="flex items-center gap-1">
                                    <Star size={12} />
                                    <span>Grade: {submission.grade}/{submission.maxMarks}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button className="flex items-center gap-1 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                <Eye size={16} />
                                View
                              </button>
                              <button className="flex items-center gap-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg">
                                <Download size={16} />
                                Download
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedSubmission(submission);
                                  setGradeValue(submission.grade?.toString() || '');
                                  setFeedback(submission.feedback || '');
                                }}
                                className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                              >
                                <MessageSquare size={16} />
                                {submission.status === 'graded' ? 'Edit Grade' : 'Grade'}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No submissions found</h3>
                    <p className="text-gray-600">No submissions match your current filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Grading Modal */}
      {selectedSubmission && <GradingModal submission={selectedSubmission} />}
    </div>
  );
};

export default ViewSubmissionsPage;
