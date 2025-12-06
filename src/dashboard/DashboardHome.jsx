import React from 'react';
import useRole from '../Hooks/useRole';
import Loading from '../Component/Loading';
import AdminHomeDashboard from './RoleBasedDashboard/AdminHomeDashboard';
import RiderHomeDashboard from './RoleBasedDashboard/RiderHomeDashboard';
import UserHomeDashboard from './RoleBasedDashboard/UserHomeDashboard';

const DashboardHome = () => {
    const {role,roleLoading}=useRole()
    
     if(roleLoading){
        return <Loading></Loading>
     }
     if(role==='admin'){
        return <AdminHomeDashboard></AdminHomeDashboard>
     }
     else if(role==="rider"){
        return <RiderHomeDashboard></RiderHomeDashboard>
     }
     else{
        return <UserHomeDashboard></UserHomeDashboard>
     }
   
};

export default DashboardHome;