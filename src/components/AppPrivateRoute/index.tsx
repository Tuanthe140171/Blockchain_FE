import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorizationContext } from "../../components/Web3ReactManager";
import { AuthorizeErrorType } from "../../hooks/useAuthorization";

const UNACCEPTED_ERRORS = [AuthorizeErrorType.OTHER_ERRORS, AuthorizeErrorType.NOT_CONNECTED, AuthorizeErrorType.UNAUTHORIZED];

const PrivateRoute: React.FC<any> = (props) => {
    const navigate = useNavigate();
    const { error } = useContext(AuthorizationContext);

    useEffect(() => {
        if (UNACCEPTED_ERRORS.indexOf(error) >= 0) {
            navigate("/");
        }
    }, [error, navigate]);

    
    return props.children;
}

export default PrivateRoute;