import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
