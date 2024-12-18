import { create } from 'zustand';
import axios from 'axios';
import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/users`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  isAuthenticated: false,
  socket: null,
  onlineUsers: [],
  publicUser: null,
  loggedInUser: null,

  // Helper to reset error state
  resetError: () => set({ error: null }),

  // Helper to handle errors consistently
  handleError: (error, customMessage) => {
    const errorMessage = error.response?.data?.message || customMessage;
    set({ error: errorMessage, isLoading: false });
    throw error;
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/check-auth`);
      set({
        user: data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
        error: null,
      });

      get().connectSocket();
    } catch (error) {
      error;
      set({
        user: null,
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    } finally {
      set({
        isCheckingAuth: false,
        isLoading: false,
      });
    }
  },

  getPublicUser: async (username) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.get(`${API_URL}/me/${username}`);

      set({ publicUser: data });
    } catch (error) {
      get().handleError(error, 'Error finding user');
    }
  },

  // Other methods following the same pattern...
  login: async (loginData) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.post(`${API_URL}/login`, loginData);

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      get().connectSocket();
    } catch (error) {
      get().handleError(error, 'Error logging in');
    }
  },

  signup: async (signUpData) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.post(`${API_URL}/signup`, signUpData);

      set({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      get().connectSocket();
    } catch (error) {
      get().handleError(error, 'Error signing up');
    }
  },

  logout: async () => {
    get().resetError();
    set({ isLoading: true });

    try {
      await axios.post(`${API_URL}/logout`);

      set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });

      get().disconnectSocket();
    } catch (error) {
      get().handleError(error, 'Error logging out');
    }
  },

  verifyEmail: async (code) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.post(`${API_URL}/verify-email`, { code });

      set({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      get().handleError(error, 'Error verifying email');
    }
  },

  forgotPassword: async (email) => {
    get().resetError();
    set({ isLoading: true });

    try {
      await axios.post(`${API_URL}/forgot-password`, { email });

      set({ isLoading: false });
    } catch (error) {
      get().handleError(error, 'Error sending reset password email');
    }
  },

  resetPassword: async (token, newPassword) => {
    get().resetError();
    set({ isLoading: true });

    try {
      await axios.patch(`${API_URL}/reset-password/${token}`, { newPassword });

      set({ isLoading: false });
    } catch (error) {
      get().handleError(error, 'Error resetting password');
    }
  },

  deleteMe: async () => {
    get().resetError();
    set({ isLoading: true });

    try {
      await axios.delete(`${API_URL}/delete-me`);

      set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });

      get().disconnectSocket();
    } catch (error) {
      get().handleError(error, 'Error deleting profile');
    }
  },

  updateMyPassword: async (currentPassword, newPassword) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.patch(`${API_URL}/update-my-password`, {
        currentPassword,
        newPassword,
      });

      set({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      get().handleError(error, 'Error updating password');
    }
  },

  updateProfile: async (profileData) => {
    // Reset error state before starting the operation
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.patch(
        `${API_URL}/update-profile`,
        profileData
      );

      // Update state atomically to prevent multiple renders
      set({
        user: data.updatedUser,
        isLoading: false,
        error: null,
      });

      return data.updatedUser;
    } catch (error) {
      // Use consistent error handling
      get().handleError(error, 'Error updating profile');
    }
  },

  // UPDATE PLAN
  updatePlan: async (planId, updates) => {
    get().resetError();
    set({ isLoading: true });

    try {
      const { data } = await axios.patch(`${API_URL}/update-plan`, {
        planId,
        ...updates,
      });

      set({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      get().handleError(error, 'Error updating plan');
    }
  },

  connectSocket: () => {
    const { user } = get();
    // If user is not logged in OR if web socket is already connected, exit
    // this prevents unnecessary WebSocket connections
    if (!user || get().socket?.connected) return;

    // If we are logged in and not already connected, only then connect to webSocket
    const socket = io(BACKEND_URL, { query: { userId: user._id } });
    socket.connect();

    set({ socket: socket });

    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    // if we are connected, disconnect
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
