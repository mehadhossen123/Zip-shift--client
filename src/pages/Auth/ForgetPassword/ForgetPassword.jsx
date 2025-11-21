import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const ForgetPassword = () => {

    const { user, resetPassword } = useAuth();







    const handleResetPassword=(e)=>{
        e.preventDefault()
        const email=e.target.email.value;
        // console.log(email)
        resetPassword(email).then(()=>{
            e.target.reset()
            
        }).catch(er=>{
            console.log(er)
        })

    }




    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-base-200 rounded-xl shadow-md">
        {/* Header */}
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 mt-1">
          Enter your email address and we’ll send you a reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
          <div>
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              name='email'
              placeholder="Email"
              className="input input-bordered w-full h-12 text-lg px-4"
            />
          </div>

          <button type='submit' className="btn w-full h-12 text-black bg-primary">
            Send
          </button>
        </form>

        {/* Login link */}
        <p className="mt-4 text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    );
};

export default ForgetPassword;