import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Layout } from './layouts/Layout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { VerifyEmail } from './pages/Auth/VerifyEmail';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

import { Message } from './pages/Dashboard/Message';
import { Dashboard } from './pages/Dashboard/Dashboard';

import { Settings } from './pages/Settings/Settings';
import { Payments } from './pages/Settings/Payments';
import { Password } from './pages/Settings/Password';

import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Advanced } from './pages/Settings/Advanced';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { EditPlan } from './pages/Dashboard/EditPlan';
import { Plans } from './pages/Dashboard/Plans';
import { CreatorPublic } from './pages/CreatorPublic';
import { Success } from './pages/Payment/Success';

// Protect routes: If user tries to goto any protected route, redirect to Login page
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={'/login'} />; // if not authenticated, redirect to login
  }
  if (!user?.isVerified) {
    return <Navigate to={'/verify-email'} />; // if has jwt, but not verified, redirect to verify email page
  }
  return children;
};

// If a 'LoggedIn/Authenticated' user goes to these routes (Login/Signup/Verify/ForgetPassword/ResetPassword/ etc), send/redirect them to dashboard
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={'/dashboard'} replace />;
  }
  return children;
};

const App = () => {
  const { theme } = useThemeStore();
  const { checkAuth, isCheckingAuth } = useAuthStore();

  // const { onlineUsers } = useAuthStore();
  // console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loader className="animate-spin" size={34} />;

  return (
    <div data-theme={theme}>
      <Routes>
        {/* Public routes with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:creatorUsername" element={<CreatorPublic />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Old */}
        <Route
          element={
            <RedirectAuthenticatedUser>
              <Layout />
            </RedirectAuthenticatedUser>
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Protected routes with LeftSidebar */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route element={<DashboardLayout />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings/general" element={<Settings />} />
          <Route path="/settings/payments" element={<Payments />} />
          <Route path="/settings/password" element={<Password />} />
          <Route path="/settings/advanced" element={<Advanced />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:planURL/edit" element={<EditPlan />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
