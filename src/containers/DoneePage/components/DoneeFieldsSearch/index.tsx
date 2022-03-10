import React, { useState, useEffect } from 'react';
import { Tag, Checkbox } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";

type FieldType = {
    id: number,
    name: string
}

type DoneeFieldsSearchProps = {
    fields: FieldType[],
    title: string
}


function log(e: any) {
    console.log(e);
}


const DoneeFieldsSearch: React.FC<DoneeFieldsSearchProps> = (props) => {
    const { fields, title } = props;
    const [displayedFields, setDisplayedFields] = useState<FieldType[]>([]);
    
    useEffect(() => {
        fields.length > 5 ? setDisplayedFields(fields.slice(0, 5)) : setDisplayedFields(fields);
    }, [fields]);

    return (
        <div className="donee-filter__fields fields-filter">
            <header className="fields-filter__header">
                <span className="fields-filter__title">{title}</span>
                <Tag closable onClose={log}>
                    2
                </Tag>
            </header>
            <div className="fields-filter__list">
                {
                    displayedFields.map(field => (
                        <Checkbox
                            disabled={false}
                            onChange={console.log}
                            key={field.id}
                        >
                            {field.name}
                        </Checkbox>
                    ))
                }
            </div>
            {
                displayedFields.length < fields.length && (
                    <div className="fields-filter__more" onClick={() => setDisplayedFields(fields)}>
                        <span>Thêm</span>
                        <CaretDownOutlined className="fields-filter__more-icon" />
                    </div>
                )
            }
        </div>
    )
}

export default DoneeFieldsSearch;