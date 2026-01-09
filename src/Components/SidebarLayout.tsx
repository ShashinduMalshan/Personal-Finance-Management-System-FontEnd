import { Outlet, NavLink } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Lightbulb,
  DollarSign,
  TrendingUp,
  PieChart,
  Target,
} from "lucide-react";
import Header from "./header";

interface SidebarLayoutProps {
  user: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

export default function SidebarLayout({
  user,
  isDarkMode,
  toggleTheme,
  onLogout,
}: SidebarLayoutProps) {

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition
    ${
      isActive
        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 p-6">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 text-emerald-500 font-bold tracking-wide">
          <div className="w-8 h-8 border-2 border-emerald-500 rounded flex items-center justify-center text-xs">
            D
          </div>
          Diprella
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">

          <NavLink to="/dashboard" className={navItemClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/income" className={navItemClass}>
            <DollarSign size={18} />
            Incomes
          </NavLink>

          <NavLink to="/expenses" className={navItemClass}>
            <TrendingUp size={18} />
            Expenses
          </NavLink>

          <NavLink to="/analytics" className={navItemClass}>
            <PieChart size={18} />
            Analytics
          </NavLink>

          <NavLink to="/revenue" className={navItemClass}>
            <DollarSign size={18} />
            Revenue
          </NavLink>

          <NavLink to="/insights" className={navItemClass}>
            <Lightbulb size={18} />
            Insights
          </NavLink>

          <NavLink to="/goals" className={navItemClass}>
            <Target size={18} />
            Goals
          </NavLink>

        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-3 mt-auto rounded-lg text-sm font-medium text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Fixed Header */}
        <Header
          user={user}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
