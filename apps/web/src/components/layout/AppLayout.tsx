import { Outlet } from 'react-router-dom';
import { Globe, FileText } from 'lucide-react';

export const AppLayout = () => {
  return (
    <div className="w-full flex flex-col font-body-md text-on-background relative overflow-hidden min-h-screen">
      <div 
        className="absolute inset-0 z-0 pointer-events-none animate-[panDoodle_90s_linear_infinite]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2364748b' stroke-width='8' stroke-opacity='0.05' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M30 15 L34 25 L45 25 L36 32 L39 42 L30 36 L21 42 L24 32 L15 25 L26 25 Z'/%3E%3Cpath d='M120 60 L130 50 L140 55 L160 30'/%3E%3Cpath d='M150 30 L160 30 L160 40'/%3E%3Ccircle cx='40' cy='140' r='12'/%3E%3Ccircle cx='40' cy='140' r='6'/%3E%3Ccircle cx='40' cy='140' r='1' fill='%2364748b' fill-opacity='0.05'/%3E%3Cpath d='M40 120 L40 125 M40 155 L40 160 M20 140 L25 140 M55 140 L60 140'/%3E%3Cpath d='M135 150 L145 160 L165 135'/%3E%3Cpath d='M80 80 H100 V95 C100 105 80 105 80 95 Z'/%3E%3Cpath d='M90 100 V110 M80 110 H100'/%3E%3Cpath d='M80 85 C75 85 75 95 80 95 M100 85 C105 85 105 95 100 95'/%3E%3Ccircle cx='10' cy='100' r='4' fill='%2364748b' fill-opacity='0.05' stroke='none'/%3E%3Ccircle cx='180' cy='100' r='4' fill='%2364748b' fill-opacity='0.05' stroke='none'/%3E%3Ccircle cx='100' cy='10' r='4' fill='%2364748b' fill-opacity='0.05' stroke='none'/%3E%3Ccircle cx='100' cy='190' r='4' fill='%2364748b' fill-opacity='0.05' stroke='none'/%3E%3Cpath d='M180 180 L190 180 M185 175 L185 185'/%3E%3Cpath d='M20 20 L30 20 M25 15 L25 25'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
          backgroundRepeat: 'repeat'
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col w-full pb-20">
        <Outlet />
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-t border-gray-200/50 py-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto px-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[13px] text-gray-500 font-medium flex items-center gap-1">
            ✨ Contact Developer
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="https://adityapachupate.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-[13px] rounded-full transition-all hover:scale-105 hover:shadow-sm font-medium border border-gray-200/60"
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
              className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-50 text-[#0A66C2] rounded-full transition-all hover:scale-110 hover:shadow-sm border border-gray-200/60"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a 
              href="https://x.com/Adityatwtss" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-white hover:bg-gray-50 text-gray-900 rounded-full transition-all hover:scale-110 hover:shadow-sm border border-gray-200/60"
              title="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
