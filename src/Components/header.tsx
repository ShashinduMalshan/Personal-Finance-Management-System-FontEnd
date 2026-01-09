import { Menu, Search, Bell, Sun, Moon } from "lucide-react";

interface HeaderProps {
  user: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({
  user,
  isDarkMode,
  toggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 transition-colors">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button className="md:hidden text-gray-400 hover:text-emerald-500 transition">
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div className="w-8 h-8 border-2 border-emerald-500 rounded flex items-center justify-center text-xs font-bold text-emerald-500">
          D
        </div>

        {/* Welcome Text */}
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            Welcome back, {user}!
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="p-2 rounded-full text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-300 transition"
          />
        </div>

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-emerald-500 transition">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
          {user.charAt(0).toUpperCase()}
        </div>

      </div>
    </header>
  );
}
