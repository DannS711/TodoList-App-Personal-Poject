import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseServerAPI } from "../utils/index.js";
import axios from "axios";
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/slices/user.js";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.id]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerStart());
      const { data } = await axios({
        method: "POST",
        url: `${baseServerAPI}/user/register`,
        data: form,
      });
      console.log(data);
      dispatch(registerSuccess(data));
      navigate("/login");
    } catch (error) {
      console.log(error);
      const { errors } = error.response.data;
      const errMsgUnique = error.response.data.message;

      if (errors) {
        setErrors({
          username: errors.username || "",
          email: errors.email || "",
          password: errors.password || "",
        });
      } else if (errMsgUnique) {
        setErrors({
          uniqueMsg: errMsgUnique,
        });
      } else {
        setErrors({
          uniqueMsg: "An unexpected error occurred. Please try again.",
          username: "An unexpected error occurred. Please try again.",
          email: "An unexpected error occurred. Please try again.",
          password: "An unexpected error occurred. Please try again.",
        });
      }
      dispatch(registerFailure(errors));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl mt-[7rem] sm:mt-[10rem]">
          <div className="max-w-md mx-auto space-y-3">
            <h3 className="text-lg font-semibold">Register Form</h3>
            <form onSubmit={handleSubmit}>
              {errors.uniqueMsg && (
                <p className="text-red-500 text-sm mt-1">{errors.uniqueMsg}</p>
              )}
              <div>
                <label className="block py-1">Username</label>
                <input
                  type="text"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="username"
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block py-1">Email</label>
                <input
                  type="email"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block py-1">Password</label>
                <input
                  type="password"
                  className="border w-full py-2 px-2 rounded shadow"
                  id="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex gap-3 pt-3 items-center">
                <button
                  disabled={loading}
                  className="border px-4 py-2 rounded-lg shadow active:bg-gray-100"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
                <p>
                  Already have an account?
                  <a
                    href="/login"
                    className="text-blue-500 hover:underline mx-1"
                  >
                    Login
                  </a>
                  now!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
