import { signIn } from '../../lib/auth';
import { LogIn, Globe, FileText } from 'lucide-react';

export const SignInScreen = () => {
  const handleSignIn = async () => {
    await signIn.social({
      provider: 'google',
      callbackURL: window.location.origin + '/'
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden font-sans p-4 bg-gradient-to-b from-[#87CEEB] to-[#e4f2fb]">
      {/* Background with floating SVG doodle clouds */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {/* Top left quadrant */}
        <svg className="absolute top-[5%] left-[5%] w-32 h-24 animate-[pulse_6s_ease-in-out_infinite]" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="absolute top-[15%] left-[25%] w-24 h-16 animate-[pulse_7s_ease-in-out_infinite_1s] opacity-70" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {/* Bottom left quadrant */}
        <svg className="absolute top-[60%] left-[8%] w-28 h-20 animate-[pulse_8s_ease-in-out_infinite_0.5s]" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="absolute top-[80%] left-[20%] w-36 h-28 animate-[pulse_9s_ease-in-out_infinite_2s] opacity-50" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Top right quadrant */}
        <svg className="absolute top-[10%] right-[15%] w-40 h-32 animate-[pulse_7s_ease-in-out_infinite_1.5s]" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="absolute top-[25%] right-[5%] w-20 h-16 animate-[pulse_6s_ease-in-out_infinite_0.5s] opacity-80" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Bottom right quadrant */}
        <svg className="absolute top-[70%] right-[12%] w-36 h-28 animate-[pulse_9s_ease-in-out_infinite_1s]" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="absolute top-[85%] right-[25%] w-24 h-20 animate-[pulse_8s_ease-in-out_infinite_2.5s] opacity-60" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Center edges */}
        <svg className="absolute top-[45%] left-[2%] w-32 h-24 animate-[pulse_7.5s_ease-in-out_infinite_0.2s] opacity-50" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg className="absolute top-[50%] right-[3%] w-28 h-20 animate-[pulse_8.5s_ease-in-out_infinite_1.2s] opacity-70" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M40,70 A20,20 0 0,1 30,35 A30,30 0 0,1 80,15 A35,35 0 0,1 130,35 A20,20 0 0,1 120,70 Z" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Concentric circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] rounded-full border border-white/30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[800px] sm:h-[800px] rounded-full border border-white/30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] sm:w-[1000px] sm:h-[1000px] rounded-full border border-white/30 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[420px] p-8 sm:p-10 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[32px] shadow-2xl shadow-blue-900/10">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-[36px] h-[36px] bg-white rounded-xl shadow-sm">
              <LogIn className="w-[18px] h-[18px] text-gray-800" strokeWidth={2.5} />
            </div>
            <h1 className="text-[26px] leading-[36px] font-bold text-gray-900 tracking-tight">
              Sign In to Goals365
            </h1>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-medium text-[15px] transition-colors shadow-sm border border-gray-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Contact Developer Section */}
          <div className="mt-3 pt-3 border-t border-gray-200/50 flex flex-col items-center w-full">
            <span className="text-[12px] text-gray-500 font-medium mb-4 flex items-center gap-1">
              ✨ Contact Developer ✨
            </span>
            
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <a 
                href="https://adityapachupate.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 hover:bg-white text-gray-700 text-[13px] rounded-full transition-all hover:scale-105 hover:shadow-sm font-medium"
              >
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                Portfolio
              </a>
              <a 
                href="https://adityapachupate.vercel.app/Aditya_Pachupate_Resume.pdf?t=1786276258252" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50/60 hover:bg-green-100 text-green-700 text-[13px] rounded-full transition-all hover:scale-105 hover:shadow-sm font-medium border border-green-200/50"
              >
                <FileText className="w-3.5 h-3.5" />
                Hire me
              </a>
              <a 
                href="https://www.linkedin.com/in/adityapachupate/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 bg-white/60 hover:bg-white text-[#0A66C2] rounded-full transition-all hover:scale-110 hover:shadow-sm"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a 
                href="https://x.com/Adityatwtss" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 bg-white/60 hover:bg-white text-gray-900 rounded-full transition-all hover:scale-110 hover:shadow-sm"
                title="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

