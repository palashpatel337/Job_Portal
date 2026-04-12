import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: "",
      role: null,
      isAuthenticated: false,
      auth: {
        user: null,
        token: "",
        role: null,
        isAuthenticated: false,
      },
      loading: false,
      error: null,
      setAuth: (payload) => {
        const user = payload?.user || null;
        const token = payload?.token || "";
        const role = payload?.role || user?.role || null;
        const isAuthenticated = Boolean(token);

        set({
          user,
          token,
          role,
          isAuthenticated,
          auth: { user, token, role, isAuthenticated },
          loading: false,
          error: null,
        });

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
      },
      login: (user, token) => {
        set((state) => {
          const role = user?.role || state.role || null;
          const isAuthenticated = Boolean(token);
          const auth = { user, token, role, isAuthenticated };

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return {
            user,
            token,
            role,
            isAuthenticated,
            auth,
            loading: false,
            error: null,
          };
        });
      },
      logout: () => {
        set({
          user: null,
          token: "",
          role: null,
          isAuthenticated: false,
          auth: { user: null, token: "", role: null, isAuthenticated: false },
          loading: false,
          error: null,
        });
        delete axios.defaults.headers.common["Authorization"];
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
        auth: state.auth,
      }),
      onRehydrateStorage: () => (state) => {
        const token = state?.token;
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      },
    },
  ),
);
