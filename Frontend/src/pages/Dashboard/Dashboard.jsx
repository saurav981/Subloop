import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex gap-8 flex-col">
      <div className="bg-base-200 border border-color-50 text-base-content rounded-lg space-y-4 p-6 w-80">
        {user?.fullName && <p>Name: {user?.fullName}</p>}
        <p>Email: {user?.email}</p>
        <p>Type: {user?.role}</p>
        <p>Verified: {user?.isVerified ? 'Yes' : 'No'}</p>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Link to={'/profile'} className="btn-fit">
          Setup Profile
        </Link>
      </div>
    </div>
  );
};
