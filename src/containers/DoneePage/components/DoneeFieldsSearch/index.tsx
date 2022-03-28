import React, { useState, useEffect, useMemo } from 'react';
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
    loading?: boolean,
    propagateSelectedFields: React.Dispatch<React.SetStateAction<number[]>>
}

const DoneeFieldsSearch: React.FC<DoneeFieldsSearchProps> = React.memo((props) => {
    const { fields, title, loading = false, propagateSelectedFields } = props;
    const [selectedFields, setSelectedFields] = useState<number[]>([]);
    const [displayedFields, setDisplayedFields] = useState<FieldType[]>([]);
    const [seeMore, setSeeMore] = useState<boolean>(false);

    const memoDisplayedFields = useMemo(() => displayedFields, [displayedFields]);
    const memoFields = useMemo(() => fields, [fields]);

    useEffect(() => {
        propagateSelectedFields && propagateSelectedFields(selectedFields);
    }, [selectedFields, propagateSelectedFields]);

    useEffect(() => {
        memoFields.length > 5 ? setDisplayedFields(memoFields.slice(0, 5)) : setDisplayedFields(memoFields);
    }, [memoFields]);

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
                                memoDisplayedFields.map(field => (
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
                            !seeMore && (
                                <div className="fields-filter__more" onClick={() => {
                                    setDisplayedFields(fields);
                                    setSeeMore(true);
                                }}>
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
})

export default DoneeFieldsSearch;