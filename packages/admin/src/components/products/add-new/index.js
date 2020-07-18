import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Row, Col } from "antd";
import TimePicker from "../../custom-components/time-picker";

const { TextArea } = Input;
const { Option } = Select;

export default function ({ visibility, handleCancel, handleSave, value }) {
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const { setFieldsValue } = form;
        setFieldsValue({ ...value });
        setSelectedFile(null);
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
                    name={["unit"]}
                    label="Unit"
                    rules={[
                        {
                            required: true,
                            message: "Unit is required",
                        },
                    ]}
                >
                    <Select>
                        <Option value="kg">Kg</Option>
                        <Option value="litre">Litre</Option>
                    </Select>
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
                <Form.Item
                    name={["priority"]}
                    label="Priority"
                >
                    <Input />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name={["startTime"]}
                            label="Start Time"
                            rules={[]}
                        >
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name={["endTime"]}
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
                <input type="file" onChange={handleImageUplaod} />
            </Form>
        </Modal>
    );
}
