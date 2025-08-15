import { useState, useEffect } from 'react';
import { Calendar, Search, Users, CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherTopNavbar from '../../components/teacher/TeacherTopNavbar';

const MarkAttendancePage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendance, setAttendance] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Mock data
  const classes = [
    { id: '9A', name: '9th Grade - Section A' },
    { id: '10A', name: '10th Grade - Section A' },
    { id: '10B', name: '10th Grade - Section B' },
    { id: '11A', name: '11th Grade - Section A' },
    { id: '12A', name: '12th Grade - Section A' },
  ];

  const subjects = {
    '9A': ['Mathematics', 'Science', 'English'],
    '10A': ['Mathematics', 'Physics', 'Chemistry', 'English'],
    '10B': ['Mathematics', 'Physics', 'Chemistry', 'English'],
    '11A': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    '12A': ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
  };

  const students = {
    '9A': [
      { id: 1, name: 'Ahmed Ali Khan', rollNumber: 'FA23-9A-001' },
      { id: 2, name: 'Fatima Noor', rollNumber: 'FA23-9A-002' },
      { id: 3, name: 'Hassan Muhammad', rollNumber: 'FA23-9A-003' },
      { id: 4, name: 'Ayesha Malik', rollNumber: 'FA23-9A-004' },
      { id: 5, name: 'Omar Farooq', rollNumber: 'FA23-9A-005' },
    ],
    '10A': [
      { id: 6, name: 'Sara Ahmed', rollNumber: 'FA23-10A-001' },
      { id: 7, name: 'Ali Hassan', rollNumber: 'FA23-10A-002' },
      { id: 8, name: 'Zainab Sheikh', rollNumber: 'FA23-10A-003' },
      { id: 9, name: 'Muhammad Usman', rollNumber: 'FA23-10A-004' },
      { id: 10, name: 'Hira Khan', rollNumber: 'FA23-10A-005' },
    ],
    '10B': [
      { id: 11, name: 'Bilal Ahmad', rollNumber: 'FA23-10B-001' },
      { id: 12, name: 'Mariam Siddique', rollNumber: 'FA23-10B-002' },
      { id: 13, name: 'Fahad Malik', rollNumber: 'FA23-10B-003' },
      { id: 14, name: 'Khadija Ali', rollNumber: 'FA23-10B-004' },
      { id: 15, name: 'Arham Khan', rollNumber: 'FA23-10B-005' },
    ],
  };

  const currentStudents = selectedClass ? students[selectedClass] || [] : [];
  const filteredStudents = currentStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const attendanceSummary = {
    present: Object.values(attendance).filter(status => status === 'present').length,
    absent: Object.values(attendance).filter(status => status === 'absent').length,
    leave: Object.values(attendance).filter(status => status === 'leave').length,
    total: filteredStudents.length,
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const newAttendance = {};
    filteredStudents.forEach(student => {
      newAttendance[student.id] = 'present';
    });
    setAttendance(newAttendance);
  };

  const markAllAbsent = () => {
    const newAttendance = {};
    filteredStudents.forEach(student => {
      newAttendance[student.id] = 'absent';
    });
    setAttendance(newAttendance);
  };

  const saveAttendance = async () => {
    if (!selectedClass || !selectedSubject) {
      alert('Please select class and subject');
      return;
    }

    setIsSaving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Attendance saved successfully!');
      setAttendance({});
    } catch (error) {
      alert('Failed to save attendance');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    setAttendance({});
    setSelectedSubject('');
  }, [selectedClass]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar onExpandChange={setIsSidebarExpanded} />
      
      <div className={`relative transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <TeacherTopNavbar />
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mark Attendance</h1>
              <p className="text-gray-600">Track and manage student attendance for your classes</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Class Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users size={16} className="inline mr-2" />
                    Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                {/* Subject Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    disabled={!selectedClass}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Subject</option>
                    {selectedClass && subjects[selectedClass]?.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            {selectedClass && selectedSubject && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{attendanceSummary.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{attendanceSummary.present}</div>
                    <div className="text-sm text-gray-600">Present</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{attendanceSummary.absent}</div>
                    <div className="text-sm text-gray-600">Absent</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{attendanceSummary.leave}</div>
                    <div className="text-sm text-gray-600">Leave</div>
                  </div>
                </div>
              </div>
            )}

            {/* Student Attendance Table */}
            {selectedClass && selectedSubject && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">Student Attendance</h3>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Search */}
                      <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Bulk Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={markAllPresent}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle size={16} />
                          All Present
                        </button>
                        <button
                          onClick={markAllAbsent}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <XCircle size={16} />
                          All Absent
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6 font-semibold text-gray-900">Student Name</th>
                        <th className="text-left py-3 px-6 font-semibold text-gray-900">Roll Number</th>
                        <th className="text-center py-3 px-6 font-semibold text-gray-900">Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-600">{student.rollNumber}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                  attendance[student.id] === 'present'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                  attendance[student.id] === 'absent'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                                }`}
                              >
                                Absent
                              </button>
                              <button
                                onClick={() => handleAttendanceChange(student.id, 'leave')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                  attendance[student.id] === 'leave'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
                                }`}
                              >
                                Leave
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-500">No students found</div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                {filteredStudents.length > 0 && (
                  <div className="p-6 border-t border-gray-200">
                    <button
                      onClick={saveAttendance}
                      disabled={isSaving || Object.keys(attendance).length === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSaving ? (
                        <>
                          <Clock size={16} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Attendance
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {(!selectedClass || !selectedSubject) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Class and Subject</h3>
                <p className="text-gray-600">Choose a class and subject to start marking attendance</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAttendancePage;
