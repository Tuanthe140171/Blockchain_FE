import React, { useState, useEffect } from 'react';
import { Tag, Checkbox, Skeleton } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import useLocalStorage from '../../../../hooks/useLocalStorage';
import "./index.scss";

type FieldType = {
    id: number,
    name: string
}

type DoneeFieldsSearchProps = {
    fields: FieldType[],
    title: string,
    loading?: boolean,
    propagateSelectedFields: React.Dispatch<React.SetStateAction<number[]>>
}

const DoneeFieldsSearch: React.FC<DoneeFieldsSearchProps> = (props) => {
    const { fields, title, loading = false, propagateSelectedFields } = props;
    const [selectedFields, setSelectedFields] = useState<number[]>([]);
    const [displayedFields, setDisplayedFields] = useState<FieldType[]>([]);
    const [enclose, setEnclose] = useLocalStorage<{ [title: string]: boolean  }>("seeMore", {});

    useEffect(() => {
        propagateSelectedFields && propagateSelectedFields(selectedFields);
    }, [selectedFields, propagateSelectedFields]);

    // useEffect(() => {
    //     fields.length > 5 ? setDisplayedFields(fields.slice(0, 5)) : setDisplayedFields(fields);
    // }, [fields]);

    useEffect(() => {
        console.log(enclose && enclose[title]);
        (enclose && enclose[title] && fields.length > 5) ? setDisplayedFields(fields): setDisplayedFields(fields.slice(0, 5));
    }, [enclose, title, fields]);

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
                                        checked={selectedFields.indexOf(parseInt(`${field.id}`)) >= 0}
                                        disabled={false}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                setSelectedFields([
                                                    ...selectedFields.slice(0, selectedFields.indexOf(parseInt(`${field.id}`))),
                                                    ...selectedFields.slice(selectedFields.indexOf(parseInt(`${field.id}`)) + 1, selectedFields.length)
                                                ]);
                                            } else {
                                                setSelectedFields([
                                                    ...selectedFields,
                                                    parseInt(`${field.id}`)
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
                            displayedFields.length < fields.length ? (
                                <div className="fields-filter__more" onClick={() => {
                                    setDisplayedFields(fields);
                                    setEnclose({
                                        [title]: true
                                    })
                                }}>
                                    <span>Thêm</span>
                                    <CaretDownOutlined className="fields-filter__more-icon" />
                                </div>
                            ) : (
                                <div className="fields-filter__more" onClick={() => {
                                    setDisplayedFields(fields.slice(0, 5));
                                    setEnclose({
                                        [title]: false
                                    })
                                }}>
                                    <span>Thu gọn</span>
                                    <CaretUpOutlined className="fields-filter__more-icon" />
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