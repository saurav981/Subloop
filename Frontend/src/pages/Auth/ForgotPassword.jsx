import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Loader, Mail } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="relative pb-20 h-screen flex items-center justify-center">
      <div className="border border-color-50 shadow-xl max-w-sm rounded-lg px-5 py-8 mx-4">
        <h2 className="text-center text-2xl font-bold mt-10">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-6 pb-10 text-base-content/80"
          >
            <p className="text-sm text-center">Please enter your email</p>

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email..."
              className="input-box text-center mx-auto"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button type="submit" className="btn-normal mx-auto">
              {isLoading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-5 p-6 pb-10 text-base-content/90">
            <div className="mx-auto size-12 bg-primary flex items-center justify-center rounded-full">
              <Mail size={27} className="text-white" />
            </div>
            <p className="text-center leading-7 mt-4">
              Just sent a reset link to <b>{email}</b>
              <br />
              (valid for 10 mins)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
