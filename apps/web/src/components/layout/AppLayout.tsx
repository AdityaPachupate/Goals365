import { Outlet } from 'react-router-dom';

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
      <div className="relative z-10 flex-1 flex flex-col w-full">
        <Outlet />
      </div>
    </div>
  );
};
