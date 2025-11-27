import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FiShieldOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data.data;
    },
  });

  //   =======Manage handle make admin ========
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.daa.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as a admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div>
      <h1>Manager Users : {users.length}</h1>

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
                <td>{index + 1}</td>
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
                    <button className="btn btn-sm">
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm"
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
