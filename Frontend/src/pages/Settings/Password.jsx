import { useState } from 'react';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

export const Password = () => {
  const { updateMyPassword, isLoading } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateMyPassword(currentPassword, newPassword);
      toast.success('Password updated');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-96">
      <h2 className="text-2xl">Change Password</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 mt-10">
        <p>Current Password</p>
        <PasswordInput
          value={currentPassword}
          placeholder="Current Password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <p className="mt-4">New Password</p>
        <PasswordInput
          value={newPassword}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit" className="btn-normal text-center w-48">
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Change password'
          )}
        </button>
      </form>
    </div>
  );
};
