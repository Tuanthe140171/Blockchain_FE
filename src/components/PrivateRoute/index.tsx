import React from "react";
import { Navigate } from "react-router-dom";

import useAuthorization, { AuthorizeErrorType } from "../../hooks/useAuthorization";

const UNACCEPTED_ERRORS = [AuthorizeErrorType.NOT_CONNECTED, AuthorizeErrorType.OTHER_ERRORS, AuthorizeErrorType.UNAUTHORIZED];

const PrivateRoute: React.FC<any> = (props) => {
    const error = useAuthorization();

    if (UNACCEPTED_ERRORS.indexOf(error) >= 0) {
        return <Navigate to="/" />;
    }
    return props.children;
}

export default PrivateRoute;