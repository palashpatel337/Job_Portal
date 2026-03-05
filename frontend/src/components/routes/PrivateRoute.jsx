import { useAuth } from '@/context/Auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom';

// function PrivateRoute() {
//     const [ ok, setOk] = useState(false);
//     const [ auth, setAuth] = useAuth()

//     useEffect(() => {
//         const authCheck = async () => {
//             try {
                
//                 const res = await axios.get(
//                     `${import.meta.env.VITE_API_URL}/api/v1/user/user-auth`,
//                 )
//                 if(res.data.ok){
//                     setOk(true)
//                 } else{
//                     setOk(false)
//                 }
//             } catch (error) {
//             console.log(error.response?.data?.message);
//             }
//         }
//         if (auth?.token) 
//             {
//             authCheck();
//             console.log(auth.token);
            
//             console.log(ok);
            
//             }
//     }, [auth?.token])
// //   return ok ? <Outlet/>  
// //   : <Navigate to="/" /> 
// if (!auth?.token) return <Navigate to="/login" />;
// return <Outlet />;
  
// }

function PrivateRoute() {
  const [auth] = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute