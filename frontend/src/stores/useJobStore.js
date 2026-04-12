import create from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const useJobStore = create((set, get) => ({
  jobs: [],
  loading: false,
  error: null,
  filters: {
    location: "",
    salary: "",
    keyword: "",
  },
  setJobs: (jobs) => set({ jobs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: { location: "", salary: "", keyword: "" } }),
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/job/get`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      set({ jobs: data?.jobs || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  getFilteredJobs: () => {
    const { jobs, filters } = get();
    const q = filters.keyword?.toLowerCase().trim();
    const loc = filters.location?.toLowerCase().trim();

    return jobs.filter((job) => {
      const haystack = [
        job.title,
        job.description,
        job.companyId?.name,
        job.requirements,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);
      const matchesLocation = !loc || job.location?.toLowerCase().includes(loc);
      return matchesSearch && matchesLocation;
    });
  },
}));
