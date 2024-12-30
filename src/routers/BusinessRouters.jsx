import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthProvider from "../context/AuthContext";
import Home from "../admin-dashboard/home/Home";
import ListUser from "../admin-dashboard/user/ListUser";
import ViewUser from "../admin-dashboard/user/ViewUser";
import AddUser from "../admin-dashboard/user/AddUser";
import UpdateUser from "../admin-dashboard/user/UpdateUser";
import ListCategory from "../admin-dashboard/category/ListCategory";
import ViewCategory from "../admin-dashboard/category/ViewCategory";
import ListManga from "../admin-dashboard/manga/ListManga";
import AddManga from "../admin-dashboard/manga/AddManga";
import ViewManga from "../admin-dashboard/manga/ViewManga";
import UpdateManga from "../admin-dashboard/manga/UpdateManga";
import AddChapter from "../admin-dashboard/manga/AddChapter";

function BusinessRouters() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user === null || user?.userRole?.name !== "HOTEL") {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<ListUser />} />
          <Route path="/viewuser/:id" element={<ViewUser />} />
          <Route path="/edituser/:id" element={<UpdateUser />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/category" element={<ListCategory />} />
          <Route path="/view-category/:id" element={<ViewCategory />} />
          <Route path="/manga" element={<ListManga />} />
          <Route path="/addmanga" element={<AddManga />} />
          <Route path="/manga-detail/:bookID" element={<ViewManga />} />
          <Route path="/update-manga/:bookID" element={<UpdateManga />} />
          <Route path="/manga/:bookID/add-chapter/" element={<AddChapter />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default BusinessRouters;