import React, { useState, useEffect } from 'react';
import { Tag, Checkbox, Skeleton } from 'antd';
import { CaretDownOutlined } from "@ant-design/icons";
import "./index.scss";

type FieldType = {
    id: number,
    name: string
}

type DoneeFieldsSearchProps = {
    fields: FieldType[],
    title: string,
    loading?: boolean
}

const DoneeFieldsSearch: React.FC<DoneeFieldsSearchProps> = (props) => {
    const { fields, title, loading = false } = props;
    const [selectedFields, setSelectedFields] = useState<number[]>([]);
    const [displayedFields, setDisplayedFields] = useState<FieldType[]>([]);

    useEffect(() => {
        fields.length > 5 ? setDisplayedFields(fields.slice(0, 5)) : setDisplayedFields(fields);
    }, [fields]);

    return (
        <>
            {
                loading ? <Skeleton /> : (
                    <div className="donee-filter__fields fields-filter">
                        <header className="fields-filter__header">
                            <span className="fields-filter__title">{title}</span>
                            {
                                selectedFields.length >= 2 && (
                                    <Tag closable
                                        onClose={() => {
                                            setSelectedFields([]);
                                        }}
                                        className="fields-filter__tag"
                                    >
                                        {
                                            selectedFields.length
                                        }
                                    </Tag>
                                )
                            }
                        </header>
                        <div className="fields-filter__list">
                            {
                                displayedFields.map(field => (
                                    <Checkbox
                                        checked={selectedFields.indexOf(field.id) >= 0}
                                        disabled={false}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                setSelectedFields([
                                                    ...selectedFields.slice(0, selectedFields.indexOf(field.id)),
                                                    ...selectedFields.slice(selectedFields.indexOf(field.id) + 1, selectedFields.length)
                                                ]);
                                            } else {
                                                setSelectedFields([
                                                    ...selectedFields,
                                                    field.id
                                                ]);
                                            }
                                        }}
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
        </>
    )
}

export default DoneeFieldsSearch;