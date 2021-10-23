import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './FilterBlock.module.scss';
import { Field, FieldType } from './types';

interface FilterBlockProps {
    fields: Field[]
}

const FilterBlock = ({ fields }: FilterBlockProps) => {

    const renderFilter = (field: Field): React.ReactNode => {
        switch (field.type) {
            case FieldType.MULTISELECT || FieldType.SELECT:
                return renderSelect(field)
            default:
                return <></>
        }
    }

    const renderSelect = (field: Field) => {
        return (
            <>
                <label>{field.name}</label>
                <Select
                    defaultValue={field.defaultValue}
                    mode={field.type === FieldType.MULTISELECT ? 'multiple' : undefined}
                    maxTagCount='responsive'
                    showArrow
                >
                    {field.values?.map((value, index) => (
                        <Select.Option key={index} value={value}>{value}</Select.Option>
                    ))}
                </Select>
            </>
        )
    }

    return (
        <section className={styles.card}>
            <div className={classNames(styles.row, styles.header)}>
                <div className={styles.title}>Filters</div>
                <div className={styles.clickable}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.content}>
                {fields.map(field => (
                    <div key={field.name} className={styles.filter}>
                        {renderFilter(field)}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FilterBlock