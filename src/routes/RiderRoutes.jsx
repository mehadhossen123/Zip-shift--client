import React from 'react';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';
import Loading from '../Component/Loading';
import Forbidden from '../Component/Forbidden/Forbidden';

const RiderRoutes = ({children}) => {
    const {role,roleLoading}=useRole()
    const {loading}=useAuth()
    if(roleLoading || loading){
        return <Loading></Loading>
    }
    if(role !=="rider"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default RiderRoutes;