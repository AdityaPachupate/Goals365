import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Target, ListTodo, User } from 'lucide-react';

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white pt-8 px-4 h-screen sticky top-0">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Target className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-semibold tracking-tight">365 Goals</span>
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Target className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink to="/goals" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <ListTodo className="w-5 h-5" />
            My Goals
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <User className="w-5 h-5" />
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-around items-center h-16 pb-safe">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <Target className="w-6 h-6" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/goals" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <ListTodo className="w-6 h-6" />
          <span className="text-[10px] font-medium">Goals</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};
