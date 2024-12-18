import { PasswordInput } from '@/components/PasswordInput';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      error;
    }
  };

  return (
    <div className="relative pb-20 h-screen flex items-center justify-center">
      <div className="border border-color-50 shadow-xl max-w-sm rounded-lg px-5 py-12 mx-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="input-box mt-2"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <PasswordInput
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" className="btn-normal">
            {isLoading ? <Loader className="mx-auto animate-spin" /> : 'Login'}
          </button>

          <p className="text-center text-sm mt-4">
            Dont have an account?{' '}
            <Link to={'/signup'} className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>

          <span className="text-center text-sm mt-1">
            <Link
              to={'/forgot-password'}
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};
