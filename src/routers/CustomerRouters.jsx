import Home from "../customer/pages/home/Home";
import Login from "../customer/pages/login-register/Login";
import Signup from "../customer/pages/login-register/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthContext";
import AuthProvider from "../context/AuthContext";
import { useContext } from "react";
import OAuth2RedirectHandler from "../customer/oauth2/OAuth2RedirectHandler";
import ViewManga from "../customer/pages/manga-detail/ViewManga";
import ReadChapter from "../customer/pages/read-manga/ReadChapter";
import UserProfile from "../customer/pages/user-dashboard/UserProfile";
import ChangePassword from "../customer/pages/user-dashboard/ChangePassword";


function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children
  }
  return <Navigate to="/" />
}

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user !== null && user.userRole?.name === "ADMIN") {
    return <Navigate to="/admin/" />;
  }
  return children;
};

function CustomerRouters() {
  return (
    <div>
      <AuthProvider>
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/view-manga/:bookID" element={<ViewManga />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            <Route path="/read-manga/chapter/:bookID/:chapterID" element={<ReadChapter />} />
            <Route path="/user-profile/:userid" element={<UserProfile />} />
            <Route path="/change-password/:userid" element={<ChangePassword />} />
          </Routes>
          {/* </BrowserRouter> */}
        </ProtectedRoute>
      </AuthProvider>
    </div>
  )
}

export default CustomerRouters;