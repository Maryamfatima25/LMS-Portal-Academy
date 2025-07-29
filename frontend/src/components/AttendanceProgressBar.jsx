import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const AttendanceProgressBar = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const attendanceData = {
    week: { present: 4, absent: 1, leave: 0, total: 5 },
    month: { present: 18, absent: 2, leave: 1, total: 21 },
    year: { present: 180, absent: 15, leave: 5, total: 200 }
  };

  // Data for current view
  const currentData = attendanceData[selectedPeriod];
  const overallAttendance = Math.round(((currentData.present + currentData.leave) / currentData.total) * 100);
  const presentPercentage = (currentData.present / currentData.total) * 100;
  const absentPercentage = (currentData.absent / currentData.total) * 100;
  const leavePercentage = (currentData.leave / currentData.total) * 100;

  // Yearly data for mobile view
  const yearlyData = attendanceData['year'];
  const yearlyAttendance = Math.round(((yearlyData.present + yearlyData.leave) / yearlyData.total) * 100);
  const yearlyPresentPercentage = (yearlyData.present / yearlyData.total) * 100;
  const yearlyAbsentPercentage = (yearlyData.absent / yearlyData.total) * 100;
  const yearlyLeavePercentage = (yearlyData.leave / yearlyData.total) * 100;
  
  const EnhancedDoughnutChart = ({ size, strokeWidth, p_percent, a_percent, l_percent, overall_percent }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    return (
      <div className="relative flex justify-center items-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            fill="none" 
            stroke="#f1f5f9" 
            strokeWidth={strokeWidth} 
          />
          {/* Present segment with gradient */}
          <defs>
            <linearGradient id="presentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="absentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="leaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          
          {/* Present segment */}
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            fill="none" 
            stroke="url(#presentGradient)" 
            strokeWidth={strokeWidth} 
            strokeDasharray={`${(p_percent / 100) * circumference} ${circumference}`} 
            strokeLinecap="round" 
          />
          
          {/* Absent segment */}
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            fill="none" 
            stroke="url(#absentGradient)" 
            strokeWidth={strokeWidth} 
            strokeDasharray={`${(a_percent / 100) * circumference} ${circumference}`} 
            strokeDashoffset={-((p_percent / 100) * circumference)} 
            strokeLinecap="round" 
          />
          
          {/* Leave segment */}
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={radius} 
            fill="none" 
            stroke="url(#leaveGradient)" 
            strokeWidth={strokeWidth} 
            strokeDasharray={`${(l_percent / 100) * circumference} ${circumference}`} 
            strokeDashoffset={-(((p_percent + a_percent) / 100) * circumference)} 
            strokeLinecap="round" 
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="text-xl font-bold text-gray-900 leading-none">{overall_percent}%</div>
          <div className="text-[10px] text-gray-500 mt-0.5 font-medium">Attendance</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm h-full">
      {/* Compact Desktop view */}
      <div className="hidden md:block p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={16} />
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Attendance</h3>
          </div>
          <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
            {overallAttendance}%
          </div>
        </div>
        
        <div className="flex bg-gray-50 rounded-lg p-1 mb-4 gap-1">
          {['week', 'month', 'year'].map((period) => (
            <button 
              key={period} 
              onClick={() => setSelectedPeriod(period)} 
              className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
                selectedPeriod === period 
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="flex justify-center mb-4">
          <EnhancedDoughnutChart 
            size={120} 
            strokeWidth={14} 
            p_percent={presentPercentage} 
            a_percent={absentPercentage} 
            l_percent={leavePercentage} 
            overall_percent={overallAttendance} 
          />
        </div>
        
        {/* Stacked statistics cards */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Present</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{currentData.present}</div>
              <div className="text-xs text-gray-500">{Math.round(presentPercentage)}%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Absent</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{currentData.absent}</div>
              <div className="text-xs text-gray-500">{Math.round(absentPercentage)}%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Leave</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">{currentData.leave}</div>
              <div className="text-xs text-gray-500">{Math.round(leavePercentage)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view - RESTORED ORIGINAL VERSION */}
      <div className="md:hidden flex flex-col items-center justify-center text-center p-2 h-full">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">Attendance</h3>
        <div className="relative flex justify-center items-center">
          <svg width={80} height={80} className="transform -rotate-90">
            <circle cx={40} cy={40} r={35} fill="none" stroke="#f3f4f6" strokeWidth={10} />
            <circle cx={40} cy={40} r={35} fill="none" stroke="#608BC1" strokeWidth={10} strokeDasharray={`${(yearlyPresentPercentage / 100) * 219.9} 219.9`} strokeLinecap="round" />
            <circle cx={40} cy={40} r={35} fill="none" stroke="#133E87" strokeWidth={10} strokeDasharray={`${(yearlyAbsentPercentage / 100) * 219.9} 219.9`} strokeDashoffset={-((yearlyPresentPercentage / 100) * 219.9)} strokeLinecap="round" />
            <circle cx={40} cy={40} r={35} fill="none" stroke="#CBDCEB" strokeWidth={10} strokeDasharray={`${(yearlyLeavePercentage / 100) * 219.9} 219.9`} strokeDashoffset={-(((yearlyPresentPercentage + yearlyAbsentPercentage) / 100) * 219.9)} strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <div className="text-xl font-bold text-gray-900">{yearlyAttendance}%</div>
            <div className="text-xs text-gray-500">Yearly</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceProgressBar;