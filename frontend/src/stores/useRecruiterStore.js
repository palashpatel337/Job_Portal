import create from "zustand";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const useRecruiterStore = create((set, get) => ({
  postedJobs: [],
  applicantsByJob: {},
  loading: false,
  error: null,
  setPostedJobs: (postedJobs) => set({ postedJobs }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setApplicantsForJob: (jobId, applicants) =>
    set((state) => ({ applicantsByJob: { ...state.applicantsByJob, [jobId]: applicants } })),
  fetchPostedJobs: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/job/get/admin`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      set({ postedJobs: data?.jobs || [], loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  fetchApplicants: async (jobId) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/application/${jobId}/applicants`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const sortedApplicants =
        data?.job?.applications?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];
      set((state) => ({
        applicantsByJob: { ...state.applicantsByJob, [jobId]: sortedApplicants },
        loading: false,
      }));
      return { job: data?.job, applications: sortedApplicants };
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return { job: null, applications: [] };
    }
  },
  updateApplicantStatus: (jobId, applicationId, newStatus) =>
    set((state) => ({
      applicantsByJob: {
        ...state.applicantsByJob,
        [jobId]: state.applicantsByJob[jobId]?.map((application) =>
          application._id === applicationId ? { ...application, status: newStatus } : application,
        ) || [],
      },
    })),
}));
