import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit, CiViewTimeline } from "react-icons/ci";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  //   Handle Delete button
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //   handle payment is here
  const handlePayment = async (parcel) => {
    const parcelInfo = {
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
    };

    const res = await axiosSecure.post("/create-checkout-session", parcelInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <div>
      <h1>Your total parcels: {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Si.No </th>
              <th>Name</th>
              <th>Cost </th>
              <th>Payment</th>
              <th>Payment Status </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary text-black btn-sm "
                    >
                      {" "}
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.paymentStatus}</td>
                <td>
                  <button className="btn-square btn  mr-2 hover:bg-primary ">
                    <CiEdit />
                  </button>
                  <button className="btn-square btn  mr-2 hover:bg-primary ">
                    <CiViewTimeline />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn-square btn  mr-2 hover:bg-primary "
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
