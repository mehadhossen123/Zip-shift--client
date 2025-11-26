import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const SuccessPayment = () => {
    const axiosSecure=useAxiosSecure()
    const [searchParams]=useSearchParams()
    const sessionId = searchParams.get("session_id");
    
    const [paymentInfo,setPaymentInfo]=useState({})

    // console.log(sessionId)

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res)=>{
                setPaymentInfo({
                  transactionId: res.data.transactionId,
                  trackingId:res.data.trackingId
                });
            })

        }
    },[sessionId,axiosSecure])

    return (
      <div>
        <h1 className="text-green-600">Your payment successful </h1>
        <p> Your transaction id= {paymentInfo.transactionId}</p>
        <p>Your tracking id = {paymentInfo.trackingId}</p>
      </div>
    );
};

export default SuccessPayment;