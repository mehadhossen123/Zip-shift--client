import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {

  const location=useLocation()
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userRegister, googleLogin, updateUserProfile } = useAuth();

  const handleRegister = (data) => {
    console.log(data);

    const photoImage = data.photo[0];

    userRegister(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        // store the image and get the photo url using imgbb
        const formData = new FormData();
        formData.append("image", photoImage);

        //send the photo into the image bb and get the url

        const img_api_key = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host
        }`;

        //find the phot url using axios and using this to update user profile

        axios
          .post(img_api_key, formData)
          .then((res) => {
            console.log("after image uploaded ", res.data.data.url);

            // and updated the profile using the firebase
            const imageUrl = res.data.data.url;
            const newUser = {
              displayName: data.name,
              photo_URL: imageUrl,
            };
            updateUserProfile(newUser)
              .then(() => {
                // console.log("photo uploded done ");
                navigate(location?.state || "/")

              })
              .catch((er) => {
                console.log(er);
              });
          })
          .catch((err) => {
            console.log("axios error", err);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500 mt-1">Register with ZapShift</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-600 mt-1">Name field is required</p>
          )}
        </div>
        {/* Photo */}
        <div>
          <label className="label font-semibold">Photo</label>

          <input
            type="file"
            placeholder="Upload your photo"
            {...register("photo", { required: true })}
            className="file-input text-black bg-blue-400"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-600 mt-1">Photo field is required</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email?.type === "required" && (
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
            className="input input-bordered w-full"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-primary text-black btn-neutral w-full mt-2"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-2">
          Already have an account?{" "}
          <Link state={location.state} to="/login" className="link link-hover font-semibold">
            Login
          </Link>
        </p>

        {/* Divider */}
        <div className="divider divider-neutral">or</div>

        {/* Google Login Button */}
        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white w-full text-black border-[#e5e5e5]"
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

export default Register;
