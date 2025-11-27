import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { IoIosTrash } from "react-icons/io";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [],refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data.data;
    },
  });
  //   handle rider status
  const handleRiderStatus = (rider, status) => {
    const updateInfo = { status: status ,email:rider.riderEmail};
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your request has been ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  // Handle rider rejection
  const handleRiderRejection = (rider) => {
     handleRiderStatus(rider, "Rejected");

  };

  const handleApprove = (rider) => {
    handleRiderStatus(rider, "Approved");
   
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-10 text-red-500">Rider Details</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-black font-bold text-center">Si No: </th>
              <th className="text-black font-bold text-center">Rider Name </th>
              <th className="text-black font-bold text-center">Rider Email</th>
              <th className="text-black font-bold text-center">
                Rider Number{" "}
              </th>
              <th className="text-black font-bold text-center">
                Rider District
              </th>
              <th className="text-black font-bold text-center">Rider Status</th>
              <th className="text-black font-bold text-center">
                Rider Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr>
                <th className="text-center">{index + 1}</th>
                <td className="text-center font-black">{rider.riderName}</td>
                <td className="text-center">{rider.riderEmail}</td>
                <td className="text-center">{rider.riderContact}</td>
                <td className="text-center">{rider.riderDistrict}</td>
                <td className="text-center">
                  <p
                    className={`${
                      rider.status === "Approved"
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleApprove(rider)}
                    className="btn btn-sm mr-2"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRiderRejection(rider)}
                    className="btn btn-sm mr-2"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn btn-sm">
                    <IoIosTrash />
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

export default ApproveRider;
