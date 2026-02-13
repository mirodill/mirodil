import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("admin");

    if (token && userJson && userJson !== "undefined") {
      try {
        setAdmin(JSON.parse(userJson));
      } catch (e) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    // data ichida serverdan kelgan token va user borligini tekshiramiz
    if (data?.token && data?.user) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));
      setAdmin(data.user);
    } else {
      console.error("Xato: Ma'lumotlar to'liq emas!", data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);