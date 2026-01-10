import React from 'react';
import { LogOut, LayoutDashboard, Users, DollarSign, TrendingUp, Bell, Search, Menu, Moon, Sun } from 'lucide-react';


export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DashboardProps {
  user: string;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const statColorMap = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-500'
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-500'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-500'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-500'
  }
};


const SimpleBarChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex flex-col h-64 w-full">
      <div className="flex-1 flex items-end justify-between gap-2 sm:gap-4 px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <div className="relative w-full flex items-end justify-center h-full">
               {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 pointer-events-none">
                {item.label}: {item.value}k
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-gray-700"></div>
              </div>
              
              {/* Bar */}
              <div 
                style={{ height: `${(item.value / maxValue) * 100}%` }} 
                className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ease-out hover:brightness-110 ${item.color || 'bg-emerald-400'}`}
              ></div>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      {/* X-Axis Line */}
      <div className="border-t border-gray-100 dark:border-gray-700 w-full mt-1"></div>
    </div>
  );
};

const SimpleDonutChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  // Calculate total for percentages
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 0;

  // SVG Configuration
  const size = 200;
  const strokeWidth = 25;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 h-64">
      {/* Chart */}
      <div className="relative w-[200px] h-[200px]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = `${percentage * circumference} ${circumference}`;
            const strokeDashoffset = -currentAngle * circumference;
            
            // Update angle for next segment
            currentAngle += percentage;

            return (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color} 
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset} 
                style={{ strokeDashoffset: -(currentAngle - percentage) * circumference }} 
                className="transition-all duration-1000 ease-out hover:opacity-80"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-700 dark:text-gray-200">{total}k</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Users</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{Math.round((item.value / total) * 100)}% ({item.value}k)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({  }) => {
  const revenueData = [
    { label: 'Jan', value: 35, color: 'bg-emerald-300' },
    { label: 'Feb', value: 45, color: 'bg-emerald-400' },
    { label: 'Mar', value: 30, color: 'bg-emerald-300' },
    { label: 'Apr', value: 60, color: 'bg-emerald-500' },
    { label: 'May', value: 75, color: 'bg-emerald-600' },
    { label: 'Jun', value: 50, color: 'bg-emerald-400' },
    { label: 'Jul', value: 90, color: 'bg-emerald-500' },
  ];

  const userSourceData = [
    { label: 'Organic', value: 450, color: '#34d399' }, // emerald-400
    { label: 'Social', value: 300, color: '#10b981' }, // emerald-500
    { label: 'Direct', value: 150, color: '#059669' }, // emerald-600
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar */}
      {/* <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-10 text-emerald-500 font-bold tracking-wide">
           <div className="w-8 h-8 border-2 border-emerald-500 rounded flex items-center justify-center text-xs">D</div>
           Diprella
        </div>
        
        <nav className="flex-1 space-y-2">
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium transition-colors">
                <LayoutDashboard size={18} /> Dashboard
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition">
                <Users size={18} /> Income Management
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition">
                <TrendingUp size={18} /> Analytics
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition">
                <DollarSign size={18} /> Revenue
            </button>
        </nav>

        <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg text-sm font-medium transition mt-auto">
            <LogOut size={18} /> Logout
        </button>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Top Header */}
        

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: '$54,239', icon: DollarSign, change: '+12%', color: 'emerald' },
                    { label: 'Active Users', value: '2,543', icon: Users, change: '+5.2%', color: 'blue' },
                    { label: 'New Orders', value: '1,240', icon: LayoutDashboard, change: '-2%', color: 'orange' },
                    { label: 'Growth', value: '18.2%', icon: TrendingUp, change: '+4.5%', color: 'purple' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm dark:shadow-black/20 border border-gray-100 dark:border-gray-700 hover:shadow-md transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-opacity-10 text-${stat.color}-500`}>
                                <stat.icon size={20} className={i === 0 ? "text-emerald-500" : i === 1 ? "text-blue-500" : i === 2 ? "text-orange-500" : "text-purple-500"} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-400 dark:text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart Card */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Revenue Overview</h2>
                        <select className="text-xs border-none bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1 text-gray-500 dark:text-gray-300 focus:ring-0 cursor-pointer outline-none">
                            <option>Last 7 Months</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <SimpleBarChart data={revenueData} />
                </div>

                {/* Pie Chart Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                     <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Traffic Sources</h2>
                     <SimpleDonutChart data={userSourceData} />
                </div>
            </div>

            {/* Bottom Row - Just decorative filler for "world class" feel */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-700 dark:to-teal-800 rounded-2xl p-8 text-white relative overflow-hidden transition-colors duration-300">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
                        <p className="text-emerald-100 mb-6 max-w-lg">Unlock advanced analytics, export features and more with our premium plan. 30-day money back guarantee.</p>
                        <button className="bg-white text-emerald-600 dark:text-emerald-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition">View Plans</button>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-10 transform skew-x-12 translate-x-10"></div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
