import create from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const useJobDetailStore = create((set) => ({
  selectedJob: null,
  loading: false,
  error: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchJob: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/job/get/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      set({ selectedJob: data?.job || null, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  clearJob: () => set({ selectedJob: null, loading: false, error: null }),
}));
