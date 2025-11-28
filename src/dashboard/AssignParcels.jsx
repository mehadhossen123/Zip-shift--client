import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AssignParcels = () => {
const [selectedParcel,setSelectedParcel]=useState(null)

    const modalRef=useRef()
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "query.senderEmail = email;"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });
console.log(selectedParcel)
  // Modal assign parcel
  const assignParcelModal = (parcel) => {
    setSelectedParcel(parcel)
    modalRef.current.showModal()
  };
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
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
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
