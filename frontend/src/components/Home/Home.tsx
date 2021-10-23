import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import classnames from 'classnames';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { ApiResponse, User } from '../../@types/api';
import { createUser, getUsers, removeUser } from '../../services/api';
import Error from '../common/Error';
import CreateModal from './CreateModal';
import FilterBlock from './FilterBlock';
import { FieldType } from './FilterBlock/types';
import styles from './Home.module.scss';

const Home = () => {
    const initialData = useRef<User[]>([])

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState<string | null>(null)

    const [isCreateModalVisible, setCreateModalVisible] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUsers()
            .then((response: ApiResponse<User>) => {
                initialData.current = response
                setUsers(response)
            })
            .catch(error => setError(`Failed to fetch users. Reason: ${error}`))
            .finally(() => setLoading(false))
    }, [])

    const deleteUser = async (id: number) => {
        setLoading(true)
        removeUser(id)
            .then(() => {
                //should be request for users here
                const newUsers = [ ...users ]
                const indexToRemove = newUsers.findIndex(u => u.id === id)
                newUsers.splice(indexToRemove, 1)

                setUsers(newUsers)
            })
            .finally(() => setLoading(false))
    }

    const addUser = async (user: Partial<User>) => {
        setLoading(true)

        return createUser(user)
            .then(data => {
                //should be request for users here
                setUsers((users) => [ ...users, data ])
            })
            .finally(() => setLoading(false))
    }

    const onSearch = (searchString: string) => {
        // searching should be done on backend
        if (searchString) {
            setUsers(
                initialData.current.filter(u =>
                    ['username', 'name', 'email'].some(
                        searchKey => u[searchKey]?.toLowerCase().includes(searchString.toLowerCase())
                    )
                )
            )
        } else {
            setUsers(initialData.current)
        }   
    }

    const onRecordRemove = async (user: User) => {
        deleteUser(user.id)
    }

    const onCreateModalSubmit = (data: Partial<User>) => {
        return addUser(data)
    }

    const columns: ColumnType<User>[] = [
        {
            dataIndex: 'username',
            title: 'Username'
        },
        {
            dataIndex: 'email',
            title: 'Email'
        },
        {
            dataIndex: 'name',
            title: 'Name'
        },
        {
            dataIndex: ['company', 'name'],
            title: 'Company'
        },
        {
            dataIndex: ['address', 'city'],
            title: 'City'
        },
        {
            key: 'actionRemove',
            align: 'center',
            render: (_, record) => (
                <div
                    className={styles.clickable}
                    onClick={() => onRecordRemove(record)}
                >
                    <FontAwesomeIcon icon={faTrash} color='red' />
                </div>
            )
        }
    ]

    const filters = [
        {
            name: 'City',
            values: _.uniq(_.map(initialData.current, 'address.city')),
            type: FieldType.MULTISELECT
        },
        {
            name: 'Company',
            values: _.uniq(_.map(initialData.current, 'company.name')),
            type: FieldType.MULTISELECT
        }
]

    return (
        <section className={styles.row}>
            <div className={styles.filters}>
                <FilterBlock fields={filters} />
            </div>
            <div className={classnames(styles.card, styles.column, styles.body)}>
                <div className={styles.row}>
                    <Input.Search
                        allowClear
                        placeholder='Type to search...'
                        onSearch={onSearch}
                    />
                    <Button type='primary' onClick={() => setCreateModalVisible(true)}>
                        Create new user
                    </Button>
                </div>
                {error && <Error text={error} />}
                <div className={styles.table}>
                    <Table
                        rowKey={(record) => record.id}
                        dataSource={users}
                        columns={columns}
                        loading={loading}
                        pagination={false}
                    />
                </div>
            </div>

            <CreateModal
                isVisible={isCreateModalVisible}
                onVisibleChange={setCreateModalVisible}
                onSubmit={onCreateModalSubmit}
            />
        </section>
    )
}

export default Home