import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });


  return (
    <div>
      <h1>Payment History : {payments.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center font-bold text-green-600">Si No: </th>
              <th className="text-center font-bold text-green-600">Name</th>
              <th className="text-center font-bold text-green-600">Amount</th>
              <th className="text-center font-bold text-green-600">
                Paid Time
              </th>
              <th className="text-center font-bold text-green-600">
                Transaction id{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{payment.parcelName}</td>
                <td className="text-center">{payment.amount}</td>
                <td className="text-center">{payment.paidAt}</td>
                <td className="text-center">{payment.transaction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
