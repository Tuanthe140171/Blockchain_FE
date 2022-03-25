import React from 'react';
import { Pagination } from "antd";
import "./index.scss";

type AppPaginationProps = {
    currentPage?: number,
    totalPage?: number
    defaultPageSize?: number,
    pageSize?: number,
    current?: number,
    onChange?: (page: number) => void;

}

const AppPagination: React.FC<AppPaginationProps> = (props) => {
    const { onChange, currentPage = 1, totalPage = 5, defaultPageSize = 5, pageSize = 5, current = 1 } = props;


    return (
        <Pagination
            current={current}
            pageSize={pageSize}
            defaultPageSize={defaultPageSize} 
            defaultCurrent={currentPage} 
            total={totalPage} 
            onChange={(currentPage: any) => {
                if (onChange) {
                    onChange(currentPage);
                }
            }}
            className="pagination"
        />
    )
}

export default AppPagination;