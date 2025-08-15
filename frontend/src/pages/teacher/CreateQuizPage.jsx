import { useState } from 'react';
import { PlusCircle, Minus, Eye, Save, X, Clock, Calendar, BookOpen, Settings, Trash2, Edit } from 'lucide-react';
import TeacherSidebar from '../../components/teacher/TeacherSidebar';
import TeacherTopNavbar from '../../components/teacher/TeacherTopNavbar';

const CreateQuizPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    duration: '',
    totalMarks: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    instructions: '',
    showResults: 'after_submission',
    allowRetake: false,
    randomizeQuestions: false
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1,
      explanation: ''
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
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

  const [existingQuizzes, setExistingQuizzes] = useState([
    {
      id: 1,
      title: 'Quadratic Equations Quiz',
      subject: 'Mathematics',
      class: '10A',
      questions: 15,
      duration: 45,
      totalMarks: 30,
      status: 'active',
      attempts: 25,
      totalStudents: 35,
      createdDate: '2024-01-20',
      startDate: '2024-02-01',
      endDate: '2024-02-05'
    },
    {
      id: 2,
      title: 'Wave Properties Test',
      subject: 'Physics',
      class: '11A',
      questions: 20,
      duration: 60,
      totalMarks: 40,
      status: 'scheduled',
      attempts: 0,
      totalStudents: 28,
      createdDate: '2024-01-18',
      startDate: '2024-02-10',
      endDate: '2024-02-12'
    }
  ]);

  const handleQuizDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      marks: 1,
      explanation: ''
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };

  const addOption = (questionId) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId && q.options.length < 6
        ? { ...q, options: [...q.options, ''] }
        : q
    ));
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId && q.options.length > 2
        ? { 
            ...q, 
            options: q.options.filter((_, idx) => idx !== optionIndex),
            correctAnswer: q.correctAnswer > optionIndex ? q.correctAnswer - 1 : q.correctAnswer
          }
        : q
    ));
  };

  const handleCreateQuiz = async () => {
    // Validation
    if (!quizData.title || !quizData.subject || !quizData.class) {
      alert('Please fill all required fields');
      return;
    }

    if (questions.some(q => !q.question.trim() || q.options.some(opt => !opt.trim()))) {
      alert('Please complete all questions and options');
      return;
    }

    setIsCreating(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newQuiz = {
        id: existingQuizzes.length + 1,
        title: quizData.title,
        subject: quizData.subject,
        class: quizData.class,
        questions: questions.length,
        duration: parseInt(quizData.duration) || 30,
        totalMarks: questions.reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0),
        status: 'draft',
        attempts: 0,
        totalStudents: 30,
        createdDate: new Date().toISOString().split('T')[0],
        startDate: quizData.startDate,
        endDate: quizData.endDate
      };

      setExistingQuizzes(prev => [newQuiz, ...prev]);
      
      // Reset form
      setQuizData({
        title: '',
        description: '',
        subject: '',
        class: '',
        duration: '',
        totalMarks: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        instructions: '',
        showResults: 'after_submission',
        allowRetake: false,
        randomizeQuestions: false
      });
      setQuestions([{
        id: 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        marks: 1,
        explanation: ''
      }]);
      
      alert('Quiz created successfully!');
    } catch (error) {
      alert('Failed to create quiz');
    } finally {
      setIsCreating(false);
    }
  };

  const filteredQuizzes = existingQuizzes.filter(quiz => {
    return (!filterClass || quiz.class === filterClass) &&
           (!filterSubject || quiz.subject === filterSubject);
  });

  const QuizPreview = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Quiz Preview</h3>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{quizData.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Subject: {quizData.subject}</span>
              <span>Class: {quizData.class}</span>
              <span>Duration: {quizData.duration} minutes</span>
              <span>Questions: {questions.length}</span>
              <span>Total Marks: {questions.reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0)}</span>
            </div>
          </div>
          
          {quizData.instructions && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{quizData.instructions}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                  <span className="text-sm text-gray-500">{question.marks} mark(s)</span>
                </div>
                <p className="text-gray-800 mb-4">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex} 
                      className={`p-2 rounded border ${
                        optIndex === question.correctAnswer 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                      {option}
                      {optIndex === question.correctAnswer && (
                        <span className="ml-2 text-green-600 text-sm">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
                    <strong className="text-blue-800">Explanation:</strong>
                    <span className="text-blue-700 ml-1">{question.explanation}</span>
                  </div>
                )}
              </div>
            ))}
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Quiz</h1>
              <p className="text-gray-600">Create interactive quizzes for your students</p>
            </div>

            {/* Create Quiz Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  {[
                    { id: 'basic', label: 'Basic Info', icon: BookOpen },
                    { id: 'questions', label: 'Questions', icon: PlusCircle },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={quizData.title}
                          onChange={handleQuizDataChange}
                          placeholder="Enter quiz title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <select
                          name="subject"
                          value={quizData.subject}
                          onChange={handleQuizDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                        <select
                          name="class"
                          value={quizData.class}
                          onChange={handleQuizDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select Class</option>
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>{cls.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                        <input
                          type="number"
                          name="duration"
                          value={quizData.duration}
                          onChange={handleQuizDataChange}
                          placeholder="30"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={quizData.description}
                        onChange={handleQuizDataChange}
                        rows={3}
                        placeholder="Enter quiz description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                      <textarea
                        name="instructions"
                        value={quizData.instructions}
                        onChange={handleQuizDataChange}
                        rows={4}
                        placeholder="Enter instructions for students"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Questions Tab */}
                {activeTab === 'questions' && (
                  <div className="space-y-6">
                    {questions.map((question, questionIndex) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Question {questionIndex + 1}</h3>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={question.marks}
                              onChange={(e) => handleQuestionChange(question.id, 'marks', e.target.value)}
                              placeholder="1"
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              min="1"
                            />
                            <span className="text-sm text-gray-600">marks</span>
                            {questions.length > 1 && (
                              <button
                                onClick={() => removeQuestion(question.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                          <textarea
                            value={question.question}
                            onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                            placeholder="Enter your question here"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === optionIndex}
                                  onChange={() => handleQuestionChange(question.id, 'correctAnswer', optionIndex)}
                                  className="text-indigo-600"
                                />
                                <span className="text-sm font-medium text-gray-600 w-6">
                                  {String.fromCharCode(65 + optionIndex)}.
                                </span>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                                  placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {question.options.length > 2 && (
                                  <button
                                    onClick={() => removeOption(question.id, optionIndex)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Minus size={16} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {question.options.length < 6 && (
                            <button
                              onClick={() => addOption(question.id)}
                              className="mt-2 flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm"
                            >
                              <PlusCircle size={14} />
                              Add Option
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Explanation (Optional)</label>
                          <textarea
                            value={question.explanation}
                            onChange={(e) => handleQuestionChange(question.id, 'explanation', e.target.value)}
                            placeholder="Explain why this is the correct answer"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addQuestion}
                      className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
                    >
                      <PlusCircle size={16} />
                      Add Question
                    </button>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={quizData.startDate}
                          onChange={handleQuizDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <input
                          type="time"
                          name="startTime"
                          value={quizData.startTime}
                          onChange={handleQuizDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          value={quizData.endDate}
                          onChange={handleQuizDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <input
                          type="time"
                          name="endTime"
                          value={quizData.endTime}
                          onChange={handleQuizDataChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Show Results</label>
                      <select
                        name="showResults"
                        value={quizData.showResults}
                        onChange={handleQuizDataChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="after_submission">After Submission</option>
                        <option value="after_quiz_ends">After Quiz Ends</option>
                        <option value="manual">Manual Release</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="allowRetake"
                          checked={quizData.allowRetake}
                          onChange={handleQuizDataChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Allow Retake</label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="randomizeQuestions"
                          checked={quizData.randomizeQuestions}
                          onChange={handleQuizDataChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Randomize Questions</label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={16} />
                    Preview Quiz
                  </button>
                  
                  <button
                    onClick={handleCreateQuiz}
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
                        <Save size={16} />
                        Create Quiz
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Existing Quizzes */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">Existing Quizzes</h2>
                  
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
                {filteredQuizzes.length > 0 ? (
                  <div className="space-y-4">
                    {filteredQuizzes.map((quiz) => (
                      <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                quiz.status === 'active' ? 'bg-green-100 text-green-700' :
                                quiz.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {quiz.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              {quiz.subject} • {quiz.class} • {quiz.questions} questions • {quiz.totalMarks} marks
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>{quiz.duration} min</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>{quiz.startDate} - {quiz.endDate}</span>
                              </div>
                              <span>Attempts: {quiz.attempts}/{quiz.totalStudents}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-indigo-600">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No quizzes found</h3>
                    <p className="text-gray-600">Create your first quiz to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      {showPreview && <QuizPreview />}
    </div>
  );
};

export default CreateQuizPage;
