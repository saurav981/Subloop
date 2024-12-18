import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export const Layout = () => {
  return (
    <div>
      <div className="border-b border-color-30">
        <div className="main-container py-2 px-4 md:px-8">
          <Navbar />
        </div>
      </div>
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
};
