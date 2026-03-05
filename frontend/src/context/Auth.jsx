import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);

      setAuth({
        user: parsed.user,
        token: parsed.token,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
