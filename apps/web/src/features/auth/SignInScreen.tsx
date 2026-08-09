import React from 'react';
import { signIn } from '../../lib/auth';

export const SignInScreen = () => {
  const handleSignIn = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: '/'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in to 365 Goals</h1>
        <button 
          onClick={handleSignIn}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};
