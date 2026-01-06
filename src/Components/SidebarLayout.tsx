import { Outlet, NavLink } from "react-router-dom";
import { LogOut, LayoutDashboard, Lightbulb, DollarSign, TrendingUp, PieChart, Target } from "lucide-react";



export default function SidebarLayout({ onLogout }: any) {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* --- Sidebar --- */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-6 transition-colors">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 text-emerald-500 font-bold tracking-wide">
          <div className="w-8 h-8 border-2 border-emerald-500 rounded flex items-center justify-center text-xs">D</div>
          Diprella
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          {/* Incomes Page */}
          <NavLink
            to="/income"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <DollarSign size={18} /> Incomes
          </NavLink>


          {/* expenses */}
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <TrendingUp size={18} /> Expenses
          </NavLink>

          {/* Analytics */}
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <PieChart size={18} /> Analytics
          </NavLink>


          {/* Revenue */}
          <NavLink
            to="/revenue"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <DollarSign size={18} /> Revenue
          </NavLink>
          
          {/* Insights */}
          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <Lightbulb size={18} /> Insights
          </NavLink>
          
          {/* Goals */}
          <NavLink
            to="/goals"
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition 
              ${isActive
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <Target size={18} /> Goals
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-500 
          dark:hover:text-red-400 rounded-lg text-sm font-medium transition mt-auto"
        >
          <LogOut size={18} /> Logout

        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
