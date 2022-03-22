import React, { useState } from 'react';
import { Pagination } from "antd";
import "./index.scss";

const AppPagination: React.FC<any> = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Pagination defaultCurrent={1} total={50} className="pagination"/>
    )
}

export default AppPagination;