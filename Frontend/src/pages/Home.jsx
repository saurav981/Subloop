import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Home = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="h-screen">
      <div className="flex gap-4 flex-col items-center justify-center text-center mt-44">
        <h1 className="text-4xl font-bold">
          Welcome{' '}
          {isAuthenticated && user.fullName
            ? `${user.fullName.split(' ')[0]}`
            : ''}{' '}
          to {import.meta.env.VITE_APP_NAME} 👋
        </h1>
        <p>Send direct messages to fav influencers</p>
        <Link to={'/signup'} className="btn-fit mt-4 text-lg">
          {!isAuthenticated ? 'Get started' : 'Go to Dashboard'}
        </Link>
      </div>
    </div>
  );
};
