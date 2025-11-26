import React from 'react';
import { Link } from 'react-router';

const CancelPayment = () => {
    return (
        <div>
            <h1 className='text-red-600'>Cancel your payment .</h1>
            <Link to={"/dashboard/my-parcels"}>
            <button className='btn btn-primary text-black' > Try again </button></Link>
            
        </div>
    );
};

export default CancelPayment;