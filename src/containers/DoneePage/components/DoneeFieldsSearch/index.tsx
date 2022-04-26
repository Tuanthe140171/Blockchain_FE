import React, { useState, useEffect } from 'react';
import { Tag, Checkbox, Skeleton } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import useLocalStorage from '../../../../hooks/useLocalStorage';
import "./index.scss";

type FieldType = {
    id: number | string,
    name: string
}

type DoneeFieldsSearchProps = {
    fields: FieldType[],
    title: string,
    loading?: boolean,
    usingName?: boolean,
    propagateSelectedFields: React.Dispatch<React.SetStateAction<number[]>>,
    propagateSelectedFieldsForString?: React.Dispatch<React.SetStateAction<string[]>>
}

const DoneeFieldsSearch: React.FC<DoneeFieldsSearchProps> = (props) => {
    const { usingName, fields, title, loading = false, propagateSelectedFields, propagateSelectedFieldsForString } = props;
    const [selectedFields, setSelectedFields] = useState<(number | string)[]>([]);
    const [displayedFields, setDisplayedFields] = useState<FieldType[]>([]);
    const [enclose, setEnclose] = useLocalStorage<{ [title: string]: boolean  }>("seeMore", {});

    useEffect(() => {
        propagateSelectedFields &&  (
            (usingName && propagateSelectedFieldsForString) ? propagateSelectedFieldsForString(selectedFields as string[]) : propagateSelectedFields(selectedFields as number[])
        )
    }, [selectedFields, propagateSelectedFields, propagateSelectedFieldsForString, usingName]);

    // useEffect(() => {
    //     fields.length > 5 ? setDisplayedFields(fields.slice(0, 5)) : setDisplayedFields(fields);
    // }, [fields]);

    useEffect(() => {
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
                                        checked={selectedFields.indexOf(!usingName ? parseInt(`${field.id}`) : field.id) >= 0}
                                        disabled={false}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                setSelectedFields([
                                                    ...selectedFields.slice(0, selectedFields.indexOf(!usingName ? parseInt(`${field.id}`) : field.id)),
                                                    ...selectedFields.slice(selectedFields.indexOf(!usingName ? parseInt(`${field.id}`) : field.id) + 1, selectedFields.length)
                                                ]);
                                            } else {
                                                setSelectedFields([
                                                    ...selectedFields,
                                                    !usingName ? parseInt(`${field.id}`) : field.id 
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