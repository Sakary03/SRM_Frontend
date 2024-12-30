import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import Navbar from "../../navbar/Navbar";
import { GOOGLE_AUTH_URL } from "../../../api/UrlConstant";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Vui lòng điền username của bạn"),
  password: Yup.string().required("Vui lòng điền mật khẩu của bạn"),
});

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const authContext = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  let redirectUrl = location.state?.path || "/";

  const handleSubmit = async (values) => {
    setLoading(true);
    if (await authContext.handleLogin(values)) {
      setErrorMessage("");
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "ADMIN") redirectUrl = "/admin/";
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="bg-white h-24"></div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="container mx-auto flex justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <Field
                  id="username"
                  type="username"
                  name="username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {errorMessage && (
                <div className="text-sm text-red-500 mb-4">{errorMessage}</div>
              )}

              <div className="flex items-center mb-6">
                <Field
                  id="flexCheckDefault"
                  name="flexCheck"
                  type="checkbox"
                  className="mr-2"
                />
                <label
                  htmlFor="flexCheckDefault"
                  className="text-sm text-gray-700"
                >
                  Nhớ mật khẩu
                </label>
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Đăng nhập
                </button>
              </div>

              <hr className="my-4" />


              <p className="text-center text-sm text-gray-500 mt-5">
                Chưa có tài khoản?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-blue-500 hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="bg-white h-12"></div>
    </div>
  );
}

export default Login;
