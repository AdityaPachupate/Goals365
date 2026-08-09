import React from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { signOut } from '../../lib/auth';

export const ProfileScreen = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-4 md:p-8 max-w-xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile</h1>
      </header>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
          {user?.image ? (
            <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-bold">
              {user?.name?.charAt(0) || user?.email?.charAt(0)}
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-gray-500 mb-6">{user?.email}</p>
        
        <button 
          onClick={async () => {
            await signOut();
            window.location.href = '/sign-in';
          }}
          className="px-6 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
