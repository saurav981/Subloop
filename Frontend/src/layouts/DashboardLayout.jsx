import { Outlet } from 'react-router-dom';
import { LeftSideBar } from '../components/LeftSideBar';
import { NavDashboard } from '../components/NavDashboard';
import { useChatStore } from '../store/chatStore';

export const DashboardLayout = () => {
  const { selectedUser } = useChatStore();

  return (
    <div>
      <div className="border-b border-color-50">
        <div className="main-container py-1 max-lg:mx-1.5 max-lg:mr-4">
          <NavDashboard />
        </div>
      </div>

      <main className="flex flex-col md:flex-row main-container">
        <div className="max-md:order-1 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:bg-base-100 z-30">
          {/* {!selectedUser && <LeftSideBar />} */}
          <div className={`${!selectedUser ? '' : 'hidden lg:block'}`}>
            <LeftSideBar />
          </div>
        </div>

        <div
          className={`flex w-full min-h-[calc(100vh-3.1rem)] pt-6 lg:pt-10 pl-6 lg:px-11 pr-5 pb-14 border-l border-color-30 ${
            selectedUser ? 'max-sm:pb-0' : 'pb-14'
          }`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
};
