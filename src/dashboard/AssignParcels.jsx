import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignParcels = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);

  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] ,refetch} = useQuery({
    queryKey: ["parcels", "query.senderEmail = email;"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });
  //  Get specific rider depend on rider district and parcel district
  const { data: riders = [] ,refetch:riderRifetch} = useQuery({
    queryKey: ["riders", "available", selectedParcel?.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?workStatus=available&district=${selectedParcel?.senderDistrict}&status=Approved`
      );

      return res.data.data;
    },
  });
 

  // Modal assign parcel
  const assignParcelModal = (parcel) => {
    
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  // Handle assign parcels by the riders 
   const handleAssignParcels=(rider)=>{
    const assignRiderInfo={
      riderId:rider._id,
      riderName:rider.riderName,
      riderEmail:rider.riderEmail,
      parcelId:selectedParcel._id,
      trackingId:selectedParcel.trackingId
    }
    axiosSecure.patch(`/parcels/${selectedParcel._id}`,assignRiderInfo).then((res)=>{
      if(res.data.modifiedCount){
         refetch()
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Rider has been assigned `,
                  showConfirmButton: false,
                  timer:1500,
                });
      }
    })

   }
  return (
    <div>
      <h1 className="text-3xl">Assign Parcels : {parcels.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-black text-center font-bold">#</th>
              <th className="text-black text-center font-bold">Name</th>
              <th className="text-black text-center font-bold">Cost</th>
              <th className="text-black text-center font-bold">Created At</th>
              <th className="text-black text-center font-bold">
                Pickup District
              </th>
              <th className="text-black text-center font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{parcel.parcelName}</td>
                <td className="text-center">{parcel.cost}</td>
                <td className="text-center">{parcel.createdAt}</td>
                <td className="text-center">{parcel.senderDistrict}</td>
                <td className="text-center">
                  <button
                    onClick={() => assignParcelModal(parcel)}
                    className="btn btn-sm  bg-green-500"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign modal is here  */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {/* Modal body  */}
          <h3 className="font-bold text-lg text-center text-green-500">
            Nearest rider : {riders.length}
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center font-bold text-black ">#</th>
                  <th className="text-center font-bold text-black "> Rider Name</th>
                  <th className="text-center font-bold text-black ">Rider Email</th>
                  <th className="text-center font-bold text-black ">Assign</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider,i) => (
                  <tr key={i}>
                    <th className="text-center">{i+1}</th>
                    <td className="text-center">{rider.riderName}</td>
                    <td className="text-center">{rider.riderEmail}</td>
                    <td className="text-center">
                        <button onClick={()=>handleAssignParcels(rider)} className="btn btn-primary btn-sm text-black">Assign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignParcels;
