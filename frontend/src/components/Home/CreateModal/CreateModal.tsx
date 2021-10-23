import { Form, Input, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import { User } from '../../../@types/api';

interface CreateModalProps {
    isVisible: boolean
    onVisibleChange: (isVisible: boolean) => void
    onSubmit: (data: Partial<User>) => Promise<any>
}

interface FormValues {
    username: string
    email: string
    name: string
    company: string
    city: string
}

const CreateModal = ({ isVisible, onSubmit, onVisibleChange }: CreateModalProps) => {
    const [form] = Form.useForm()
    
    const [isLoading, setLoading] = useState(false)

    const onModalSubmit = () => {
        form
            .validateFields()
            .then(({ username, name, email, company, city }: FormValues) => {
                setLoading(true)
                return onSubmit({
                    username,
                    name,
                    email,
                    address: {
                        city
                    },
                    company: {
                        name: company
                    }
                });
            })
            .then(() => {
                form.resetFields();
                setLoading(false)
                onVisibleChange(false)
            })
            .catch(info => {
                console.warn('Validate Failed:', info);
            });
    }

    return (
        <Modal
            title='Create new user'
            visible={isVisible}
            confirmLoading={isLoading}
            onOk={onModalSubmit}
            onCancel={() => onVisibleChange(false)}
            centered={true}
        >
            <Spin spinning={isLoading}>
                <Form
                    form={form}
                    name="create"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please enter email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Company"
                        name="company"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

export default CreateModal