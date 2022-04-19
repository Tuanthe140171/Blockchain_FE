import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthorizationContext } from "../../components/Web3ReactManager";
import { AuthorizeErrorType } from "../../hooks/useAuthorization";

const UNACCEPTED_ERRORS = [AuthorizeErrorType.OTHER_ERRORS, AuthorizeErrorType.NOT_CONNECTED, AuthorizeErrorType.UNAUTHORIZED];
const ADMIN_ROUTES = ["/contact-us", "/dashboard", "/admin"];

const PrivateRoute: React.FC<any> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { error } = useContext(AuthorizationContext);
    const { userData } = useSelector((state: any) => state.userLayout);

    
    useEffect(() => {
        if (userData && userData.isAdmin && ADMIN_ROUTES.indexOf(location.pathname) < 0) {
            navigate("/dashboard");
        }
    }, [userData, location, navigate]);

    useEffect(() => {
        if (UNACCEPTED_ERRORS.indexOf(error) >= 0) {
            navigate("/");
        }
    }, [error, navigate]);

    return props.children;
}

export default PrivateRoute;