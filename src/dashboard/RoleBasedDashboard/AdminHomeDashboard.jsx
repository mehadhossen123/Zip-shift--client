import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { LabelList, Legend, Pie, PieChart, Tooltip } from "recharts";
import { LatLngBounds } from "leaflet";

const AdminHomeDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const {data:states=[]} = useQuery({
    queryKey: ["delivery-status-states"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "https://zap-app-server.vercel.app/parcel/delivery-Status/stats"
      );
      return res.data;
    },
  });

  const handlePichart=(data)=>{
    return data.map(item=>{
        return {name:item.status,value:item.count}
    })

  }
  console.log(states)
  return (
    <div>
   
      <div className="stats shadow flex  justify-center">
        {states.map((state) => (
          <div key={state._id} className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">
              {state._id ? state._id : "Status not found"}
            </div>
            <div className="stat-value">{state.count}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        ))}
      </div>
      <div className="w-full  h-[600px]">
        <h1 className="text-3xl text-green-500 text-center my-10">
          Show the parcels details with the pi-chart{" "}
        </h1>
        <div className="flex justify-center items-center">
          <PieChart
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              aspectRatio: 2,
            }}
            responsive
          >
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={handlePichart(states)}
              cx="50%"
              cy="100%"
              outerRadius="120%"
              fill="#8884d8"
              label
              isAnimationActive={true}
            />
            <Legend></Legend>
            <Tooltip></Tooltip>
            
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeDashboard;
