import React, { useEffect } from "react";
import { Modal, Input, Button, Form, Upload, Row, Col } from "antd";
import TimePicker from "../../custom-components/time-picker";

const { TextArea } = Input;

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
                    name={["productNameEnglish"]}
                    label="Category Name in English"
                    rules={[
                        {
                            required: true,
                            message: "Name is rquired",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["productNameMalayalam"]}
                    label="Category Name in Malayalam"
                    rules={[
                        {
                            required: true,
                            message: "Name is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["actualPrice"]}
                    label="Actual Price"
                    rules={[
                        {
                            required: true,
                            message: "Actual price is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["sellingPrice"]}
                    label="Selling Price"
                    rules={[
                        {
                            required: true,
                            message: "Price is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={["validity", "startTime"]}
                            label="Start Time"
                            rules={[]}
                        >
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={["validity", "endTime"]}
                            label="Start Time"
                            rules={[]}
                        >
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name={["description"]}
                    label="Description"
                    rules={[]}
                >
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item name={["image"]} label="Upload an image">
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>Click to upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
}
