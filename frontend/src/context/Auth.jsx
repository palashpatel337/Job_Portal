// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parsed = JSON.parse(data);

//       setAuth({
//         user: parsed.user,
//         token: parsed.token,
//       });

//       axios.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${parsed.token}`;
//     }
//     setLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };


import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// ==============================
// Auth Provider
// ==============================
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [loading, setLoading] = useState(true);

  // ==============================
  // Load auth from localStorage
  // ==============================
  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parsed = JSON.parse(data);

      setAuth({
        user: parsed?.user || null,
        token: parsed?.token || "",
      });

      if (parsed?.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
      }
    }

    setLoading(false);
  }, []);

  // ==============================
  // Login helper
  // ==============================
  const login = (user, token) => {
    setAuth({ user, token });

    localStorage.setItem(
      "auth",
      JSON.stringify({
        user,
        token,
      })
    );

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // ==============================
  // Logout helper
  // ==============================
  const logout = () => {
    setAuth({ user: null, token: "" });

    localStorage.removeItem("auth");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ==============================
// Hook
// ==============================
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };