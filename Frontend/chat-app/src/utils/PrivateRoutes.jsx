import { Outlet, Navigate } from 'react-router-dom'




const PrivateRoutes = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return(
        userInfo ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes