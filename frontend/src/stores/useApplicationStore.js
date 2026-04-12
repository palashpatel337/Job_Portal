import create from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const useApplicationStore = create((set) => ({
  applications: [],
  status: null,
  loading: false,
  error: null,
  setApplications: (applications) => set({ applications }),
  setStatus: (status) => set({ status }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchApplications: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/application/get`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      set({ applications: data?.application || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  updateApplicationStatus: (applicationId, status) =>
    set((state) => ({
      applications: state.applications.map((application) =>
        application._id === applicationId ? { ...application, status } : application,
      ),
    })),
  addApplication: (application) =>
    set((state) => ({ applications: [...state.applications, application] })),
}));
