
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import NotPermited from "./NotPermited";

const RoleBaseRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    if(isAdminRoute && userRole === 'ADMIN'  ||
    !isAdminRoute && (userRole==="USER" || userRole === "ADMIN"))
    {
        return (
            <>
                {props.children}
            </>
        )
    }else {
        return(
            <>
                <NotPermited/>

            </>
        )
    }
}

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    const navigate = useNavigate();
    return (

        <>  
            {
                isAuthenticated === true 
                ? 
                <>
                    <RoleBaseRoute>{props.children}</RoleBaseRoute>
                </>
                : 
                <Navigate to='/login' replace/>
            }
        </>
    )
}

export default ProtectedRoute;