import { Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PasswordInput } from '../../components/PasswordInput';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { token } = useParams();

  const { resetPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      await resetPassword(token, password);
      toast.success('Password Reset Successful');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Error resetting password');
    }
  };

  return (
    <div className="relative pb-20 h-screen flex items-center justify-center">
      <div className="border border-color-50 shadow-xl max-w-sm rounded-lg px-5 py-12 mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-center text-2xl font-bold">Reset Password</h2>

          <p className="text-sm text-center">Please enter your new password</p>

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />

          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button className="btn-normal mx-auto">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Set New Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
