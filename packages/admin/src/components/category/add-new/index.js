import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, Upload } from "antd";

export default function ({ visibility, handleCancel, handleSave, value }) {
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const { setFieldsValue } = form;
        setFieldsValue({ ...value });
    }, [value, form]);
    /**
     * take formValue and merge with formValues
     */
    const handleAdd = () => {
        const { getFieldsValue, validateFields } = form;
        validateFields().then(() => {
            const formValues = getFieldsValue();

            handleSave({
                ...value,
                ...formValues,
                image: selectedFile,
            });
        });
    };

    const handleImageUplaod = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <Modal
            visible={visibility}
            okText={value._id ? `Save` : `Add`}
            onOk={handleAdd}
            onCancel={handleCancel}
            closable={false}
        >
            <Form form={form}>
                <Form.Item
                    name={["categoryNameEnglish"]}
                    label="Category name in English"
                    rules={[
                        {
                            required: true,
                            message: "name is rquired",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["categoryNameMalayalam"]}
                    label="Category name in Malayalam"
                    rules={[
                        {
                            required: true,
                            message: "name is rquired",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <input type="file" onChange={handleImageUplaod} />
            </Form>
        </Modal>
    );
}
