import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const { verifyEmail, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(code);
      navigate('/dashboard');
      toast.success('Email verified successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeSet = (e) => {
    const inputValue = e.target.value;

    // Allow only numbers and limit to 6 characters
    if (/^\d{0,6}$/.test(inputValue)) {
      setCode(inputValue);
    }
  };

  return (
    <div className="relative pb-20 h-screen flex items-center justify-center">
      <div className="border border-color-50 shadow-xl w-96 rounded-lg px-5 py-12 mx-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 py-10">
          <h2 className="text-center text-2xl font-bold mt-2">
            Verify Your Email
          </h2>

          <p className="text-sm text-center">
            Please enter 6-digit verification code
          </p>

          <input
            type="text"
            value={code}
            onChange={handleCodeSet}
            placeholder="Code..."
            className="input-box w-32 text-center mx-auto"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button className="btn-normal w-36 mx-auto">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              'Verify Email'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
