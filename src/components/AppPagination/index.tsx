import React from 'react';
import { Pagination } from "antd";
import "./index.scss";

const AppPagination = () => {
    return (
        <Pagination defaultCurrent={1} total={50} className="pagination"/>
    )
}

export default AppPagination;