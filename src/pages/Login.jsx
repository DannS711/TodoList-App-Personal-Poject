import { useState } from "react";
import axios from "axios";
import { baseServerAPI } from "../utils/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/slices/user.js";

function Login() {
  const [form, setForm] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const { data } = await axios({
        method: "POST",
        url: `${baseServerAPI}/user/login`,
        data: form,
      });
      localStorage.setItem("access_token", data.access_token);
      dispatch(loginSuccess(data.access_token));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(
        loginFailure(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again."
        )
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl mt-[9rem] sm:mt-[12rem]">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-lg font-semibold">Login Form</h3>
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div>
                <label className="block py-1">Email</label>
                <input
                  type="email"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block py-1">Password</label>
                <input
                  type="password"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-3 pt-3 items-center">
                <button
                  disabled={loading}
                  className="border px-4 py-2 rounded-lg shadow active:bg-gray-100"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <p>
                  {"Don't have an account?"}
                  <a
                    href="/register"
                    className="text-blue-500 hover:underline mx-1"
                  >
                    Register
                  </a>
                  here!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
