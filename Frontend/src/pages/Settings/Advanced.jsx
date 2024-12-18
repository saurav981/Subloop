import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

export const Advanced = () => {
  const { deleteMe } = useAuthStore();

  const handleDelete = async () => {
    try {
      await deleteMe();
      toast.success('Profile deleted');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Advanced Settings</h2>

      <p className="my-8">
        {`Deleting your account will permanently delete all of your products and
        product files, as well as any credit card and payout information. You
        will not be able to restore your account once it's deleted and you will
        be unsubscribed from any memberships. You will also not be able to
        create a new account with this account's email.`}
      </p>

      <button
        onClick={handleDelete}
        className="btn-normal w-48 bg-red-500 hover:bg-red-600"
      >
        Delete My Account
      </button>
    </div>
  );
};
