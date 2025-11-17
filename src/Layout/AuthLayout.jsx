import React from 'react';
import Logo from '../Component/logo/logo';
import { Outlet } from 'react-router';
import img from '../assets/authImage.png'

const AuthLayout = () => {
    return (
      <div className="max-w-7xl mx-auto   min-h-screen lg:flex lg:flex-col ">
        <Logo></Logo>
        {/* main content */}
        <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 p-6">
          <div className="flex-1 h-full flex items-center justify-center">
            <Outlet></Outlet>
          </div>
          <div className="flex-1 h-full bg-amber-50 flex justify-center items-center">
            <img className='w-full object-contain h-64 lg:h-auto ' src={img} alt="" />
          </div>
        </div>
      </div>
    );
};

export default AuthLayout;