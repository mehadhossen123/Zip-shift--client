import React from 'react';
import img from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={img} alt="" />
            <h3 className='font-bold -ms-4 '>ZipShift</h3>
            
        </div>
    );
};

export default Logo;