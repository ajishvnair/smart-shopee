import React from "react";
import { Modal, Card, Row, Col } from "antd";

export default function ({ values, visibility, setVisibility }) {
    const handleClose = () => {
        setVisibility(false);
    };
    return (
        <Modal visible={visibility} onOk={handleClose} onCancel={handleClose}>
            {values.map((product, index) => (
                <Card title={product.productNameEnglish} key={index}>
                    <Row>
                        <Col span={8}>Product Id</Col>
                        <Col>{product.productId}</Col>
                    </Row>
                    <Row>
                        <Col span={8}>Quantity</Col>
                        <Col span={2}>{product.quantity}</Col>
                    </Row>
                    <Row>
                        <Col span={8}>Price</Col>
                        <Col span={2}>{product.sellingPrice}</Col>
                    </Row>
                    <Row>
                        <Col span={8}>Total</Col>
                        <Col span={2}>
                            {parseInt(product.sellingPrice) *
                                parseInt(product.quantity)}
                        </Col>
                    </Row>
                </Card>
            ))}
        </Modal>
    );
}
