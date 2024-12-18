import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/messages`;
axios.defaults.withCredentials = true;

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isLoading: false,
  purchase: null,
  error: null,

  // Helper to reset error state
  resetError: () => set({ error: null }),

  // Helper to handle errors consistently
  handleError: (error, customMessage) => {
    const errorMessage = error.response?.data?.message || customMessage;
    set({ error: errorMessage, isLoading: false });
    throw error;
  },

  getUsers: async () => {
    set({ isLoading: true });

    try {
      const { data } = await axios.get(`${API_URL}/users`);
      set({
        users: data,
      });
    } catch (error) {
      get().handleError(error, 'Error getting users');
    } finally {
      set({ isLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isLoading: true });

    try {
      const { data } = await axios.get(`${API_URL}/${userId}`);
      set({
        messages: data.messages,
        purchase: data.purchase,
      });
    } catch (error) {
      get().handleError(error, 'Error getting messages');
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (text) => {
    const { selectedUser, messages } = get();

    try {
      const { data } = await axios.post(
        `${API_URL}/send/${selectedUser._id}`,
        text
      );

      set({
        messages: [...messages, data.newMessage],
        purchase: data.purchase,
      });
    } catch (error) {
      get().handleError(error, 'Error sending message');
    }
  },

  resetPurchases: () => set({ purchases: null }),

  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  stopListeningToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
