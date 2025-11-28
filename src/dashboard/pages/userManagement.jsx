import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";



import Swal from "sweetalert2";

const UserManagement = () => {
const [search,setSearch]=useState("")

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users",search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?name=${search}`);
      return res.data.data;
    },
  });

  //   =======Manage handle make admin ========
  const handleMakeAdmin = (user) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You want to make a admin ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: " Yes !",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const roleInfo = { role: "admin" };
          axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
            if (res.data.data.modifiedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.displayName} marked as a admin`,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
        }
      });
    
   
  };
  const handleRemoveAdmin = (user) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You want to remove from !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: " delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
             const roleInfo = { role: "user" };
             axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
               if (res.data.data.modifiedCount) {
                 refetch();
                 Swal.fire({
                   position: "top-end",
                   icon: "success",
                   title: `${user.displayName} remove from admin`,
                   showConfirmButton: false,
                   timer: 2000,
                 });
               }
             });
          
        }
      });
    
   
  };


  return (
    <div>
      <h1 className="text-4xl my-2 text-center text-green-600">Manager Users</h1>
      
      <div className="mx-5 my-2">
        <label className="input validator">
          <svg
            className="h-[1em]  opacity-80"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
          
            placeholder="Search specific users"
           
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="font-bold text-center text-black">Si No:</th>
              <th className="font-bold text-center text-black">User</th>
              <th className="font-bold text-center text-black">Email</th>
              <th className="font-bold text-center text-black">Role </th>
              <th className="font-bold text-center text-black">Admin action</th>
              <th className="font-bold text-center text-black">
                Others action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>

                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.role}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm bg-red-500"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-green-500"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td className="text-center">Others </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
