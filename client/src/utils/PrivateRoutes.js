import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
    let auth = localStorage.getItem('access_token')
    //Cookies.get('access_token');
    console.log("auth", auth)
    return(
        auth ? <Outlet /> : <Navigate to={"/sign-in"}/>
    )
}

export default PrivateRoutes;