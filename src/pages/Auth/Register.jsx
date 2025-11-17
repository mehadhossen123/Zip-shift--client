import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()


    const handleRegister=data=>{
        console.log(data)
    }
    return (
      <div>
        <h1>This is register form </h1>
        <form onSubmit={handleSubmit(handleRegister)} className="w-full max-w-sm mx-auto p-6 bg-base-200 rounded-xl shadow-md">
          <fieldset className="space-y-4">
            <div>
              <label className="label font-semibold">Email</label>
              <input
              {...register("email",{required:true})}
            
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
             
              />
                {errors?.email&& <p className='text-red-600'>This field is required</p>}
            </div>

            <div>
              <label className="label font-semibold">Password</label>
              <input
              {...register("password",{required:true,minLength:6})}
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
               
              />
              {errors.password?.type==="required"&&<p className='text-red-600'>Password is required</p>}
              {errors.password?.type=="minLength"&&<p className='text-red-600'>
            Password must be 6 character or longer </p>}
            </div>

            <button type="submit" className="btn btn-neutral w-full mt-2">
              Register
            </button>
          </fieldset>
        </form>
      </div>
    );
};

export default Register;