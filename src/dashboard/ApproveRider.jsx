import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ApproveRider = () => {
    const axiosSecure=useAxiosSecure()
    const {data:riders=[]}=useQuery({
        queryKey:['riders',"pending"],
        queryFn:async ()=>{
            const res=await axiosSecure.get("/riders")
            return res.data.data;

        }
    })
    return (
        <div>
            <h1>I am from rider:{riders.length} </h1>
            
        </div>
    );
};

export default ApproveRider;