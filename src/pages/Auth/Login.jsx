import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const location = useLocation();
  console.log(location)
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const { userSignIn, googleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    // console.log(data)
    userSignIn(data.email, data.password)
      .then((res) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
       
        //  create user into database

        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then(() => {
          
         
        }).finally(()=>{
          navigate(location?.state || "/");
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Login your Account</h1>
        <p className="text-gray-500 mt-1">Register with ZapShift</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: true })}
            className="input input-bordered w-full h-12 text-lg px-4"
          />
          {errors.email && (
            <p className="text-red-600 mt-1">This field is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full h-12 text-lg px-4"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 mt-1">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 mt-1">
              Password must be 6 characters or longer
            </p>
          )}
        </div>
        {/* Forget password  */}
        <Link
          to={"/password"}
          className="text-sm hover:text-green-500 cursor-pointer"
        >
          Forget password?
        </Link>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-primary text-black btn-neutral w-full h-12 text-lg mt-2"
        >
          Login
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-2">
          New here? please{" "}
          <Link
            to="/register"
            state={location.state}
            className="link link-hover font-semibold"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="divider divider-neutral">or</div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white w-full h-12 text-black border-[#e5e5e5] flex items-center justify-center gap-2"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
