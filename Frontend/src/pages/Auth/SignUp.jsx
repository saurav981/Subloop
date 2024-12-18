import { useState } from 'react';
import { Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/PasswordInput';
// import { PasswordStrengthMeter } from '../../components/PasswordStrengthMeter';
import { useAuthStore } from '../../store/authStore';

export const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
  });
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/verify-email');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative pb-20 h-screen flex items-center justify-center">
      <div className="border border-color-50 shadow-xl max-w-sm rounded-lg px-5 py-12 mx-4">
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl text-center">Create an account</h2>

          <input
            type="text"
            placeholder="Email"
            className="input-box w-full mt-5"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <select
            name="role"
            id="role"
            className={`input-box w-full bg-base-100 ${
              !formData.role ? 'text-gray-400' : ''
            }`}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select a role</option>
            <option value="creator">Creator</option>
            <option value="fan">Fan</option>
          </select>

          <PasswordInput
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* <PasswordStrengthMeter password={password} /> */}

          <button className="btn-normal">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Have an account?{' '}
            <Link to={'/login'} className="text-primary underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
