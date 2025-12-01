import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const DeliveriesAssigned = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`
      );
      return res.data;
    },
  });

  const handleParcelStatus = (parcel, status) => {
    const message = `Parcel status is updated ${status.split(" _").join(" ")}`;
    const updateInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const handleRejectParcel = (parcel) => {
    const updateInfo = {
      deliveryStatus: "pending-pickup",
      riderId: parcel.riderId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `You reject the parcel`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
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
                Others actions
              </th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => {
              return (
                <tr key={i}>
                  <th className="text-center">{i + 1}</th>
                  <td className="text-center">{parcel.parcelName}</td>
                  <td className="text-center">
                    {parcel.deliveryStatus === "rider_assigned" ? (
                      <>
                        <button
                          onClick={() =>
                            handleParcelStatus(parcel, "rider_arriving")
                          }
                          className="btn btn-sm btn-primary text-black "
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectParcel(parcel)}
                          className="btn btn-warning btn-sm ms-2 text-red-500"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-green-600">Accepted</span>
                      </>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() =>
                        handleParcelStatus(parcel, "parcel_picked_up")
                      }
                      className="btn btn-sm btn-primary text-black "
                    >
                      Marked_as_picked_up
                    </button>
                    <button
                      onClick={() =>
                        handleParcelStatus(parcel, "parcel_delivered")
                      }
                      className="btn btn-warning btn-sm ms-2 text-red-500"
                    >
                      Marked_as_delivered
                    </button>
                  </td>
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
