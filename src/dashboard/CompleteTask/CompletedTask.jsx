import React from 'react';

const CompletedTask = () => {

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
    return (
        <div>
            <h1 className="text-2xl">your completed task </h1>
            
        </div>
    );
};

export default CompletedTask;