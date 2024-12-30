import { useNavigate } from "react-router-dom";
import { getUserProfile, loginUser } from "../api/ApiAuthService";
import React, { createContext, useState, useContext, useEffect } from "react"
import { ACCESS_TOKEN } from "../api/UrlConstant";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Shared the created context with other components
function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  async function handleLogin(credentials) {
    try {
      const response = await loginUser(credentials);
      console.log(">> Login Info: ", response.data);
      localStorage.setItem("token", response.data.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.data.userInfo));
      console.log(">> AccessToken Info: ", localStorage.getItem("token"));
      console.log(">> User Info: ", localStorage.getItem("user"));
      setUser(user);
      return true;
    } catch (error) {
      return false;
    }
  }


  function handleLogout() {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;