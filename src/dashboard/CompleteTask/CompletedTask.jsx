import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const CompletedTask = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: parcels = [], refetch } = useQuery({
      queryKey: ["parcels", user?.email, "rider_assigned"],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`
        );
        return res.data;
      },
    });


    // Calculated payout money 
     const calculatedPayout=parcel=>{
        if(parcel.senderDistrict===parcel.receiverDistrict){
            return parcel.cost*0.8;
        }
        else{
            return parcel.cost*0.60;
        }
     }
    return (
      <div>
        <h1 className="text-2xl">your completed task : {parcels.length} </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="text-black text-center font-bold">#</th>
                <th className="text-black text-center font-bold">Name</th>
                <th className="text-black text-center font-bold">Cost</th>
                <th className="text-black text-center font-bold">Payout</th>
               
                <th className="text-black text-center font-bold">
                  Pickup District
                </th>
                <th className="text-black text-center font-bold">Withdraw</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr>
                  <th className="text-center">{index + 1}</th>
                  <td className="text-center">{parcel.parcelName}</td>
                  <td className="text-center">{parcel.cost}</td>
                  <td className="text-center">{calculatedPayout(parcel)}</td>
                 
                  <td className="text-center">{parcel.senderDistrict}</td>
                  <td className="text-center">
                    <button
                     
                      className="btn btn-sm  bg-green-500"
                    >
                      Cash out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default CompletedTask;