import React, { useEffect } from "react";
import { Modal, Input, Form } from "antd";

export default function ({ visibility, handleCancel, handleSave, value }) {
    const [form] = Form.useForm();

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

            handleSave({ ...value, ...formValues });
        });
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
                    name={["location"]}
                    label="Location"
                    rules={[
                        {
                            required: true,
                            message: "location is rquired",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["deliveryCharge"]}
                    label="Delivery Charge"
                    rules={[
                        {
                            required: true,
                            message: "Delivery Charge is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}
