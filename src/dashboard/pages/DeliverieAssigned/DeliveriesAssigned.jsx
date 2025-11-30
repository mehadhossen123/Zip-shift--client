import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const DeliveriesAssigned = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`
      );
      return res.data;
    },
  });
  const handleAcceptParcel = (parcel) => {
    const updateInfo = {
      deliveryStatus:"rider_arriving"
    };
    axiosSecure.patch(`/parcels/${parcel._id}/status`,updateInfo).then((res)=>{
        if(res.data.modifiedCount){
            refetch()
             Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: `Thank you for accepting`,
                      showConfirmButton: false,
                      timer: 2000,
                    });
        }
    })

  };

  return (
    <div>
      <h1>Parcel {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center text-black font-bold ">#</th>
              <th className="text-center text-black font-bold ">Name</th>
              <th className="text-center text-black font-bold ">Confirm</th>
              <th className="text-center text-black font-bold ">
                Favorite Color
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => {
              return (
                <tr>
                  <th className="text-center">{i + 1}</th>
                  <td className="text-center">{parcel.parcelName}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleAcceptParcel(parcel)}
                      className="btn btn-sm btn-primary text-black "
                    >
                      Accept
                    </button>
                    <button className="btn btn-warning btn-sm ms-2 text-red-500">
                      Reject
                    </button>
                  </td>
                  <td className="text-center">Blue</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveriesAssigned;
