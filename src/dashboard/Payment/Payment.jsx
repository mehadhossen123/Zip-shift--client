// import React from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../Component/Loading";

// const Payment = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const {isLoading,data:parcel=[]} = useQuery({
//     queryKey: ["parcels", id],
//     queryFn: async () => {
//      const res=await axiosSecure.get(`/parcels/${id}`);
//       return res.data;
//     }
    
//   });

// //   Loading state 

//   if(isLoading){
//     return <Loading></Loading>
//   }
// //   Handle payment 
// // 

//   return (
//     <div>
//       <h2> Please pay {parcel.cost} for {parcel.parcelName}</h2>

//       <button onClick={handlePayment} className="btn btn-primary text-black ">Pay</button>
//     </div>
//   );
// };

// export default Payment;
