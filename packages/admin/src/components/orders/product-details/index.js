import React from "react";
import { Modal, Card, Row, Col } from "antd";

export default function ({ values, visibility, setVisibility }) {
    const handleClose = () => {
        setVisibility(false);
    };
    return (
        <Modal visible={visibility} onOk={handleClose} onCancel={handleClose}>
            {values.map((product, index) => (
                <Card title={product.productName} key={index}>
                    <Row>
                        <Col span={8}>Product Id</Col>
                        <Col span={2}>{product._id}</Col>
                    </Row>
                    <Row>
                        <Col span={8}>Quantity</Col>
                        <Col span={2}>{product.quantity}</Col>
                    </Row>
                    <Row>
                        <Col span={8}>Total</Col>
                        <Col span={2}>{product.total}</Col>
                    </Row>
                </Card>
            ))}
        </Modal>
    );
}
