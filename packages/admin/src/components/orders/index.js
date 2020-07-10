import React, { useEffect, useState } from "react";
import { Table, Row, Popover, Button } from "antd";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { deepClone } from "../../common/helper/commonMethods";
import { orders } from "../../common/dataProvider/dummyData";
import ProductList from "./product-details";
import PDFDocumnet from "./pdf";

export default function () {
    const [ordersList, setOrdersList] = useState([]);
    const [showProduct, setShowProduct] = useState(false);
    const [currentProducts, setCurrentProducts] = useState(null);

    useEffect(() => {
        setOrdersList([...orders]);
    }, []);

    const handleShowProduct = (data) => {
        setCurrentProducts([...data]);
        setShowProduct(true);
    };

    const deleteOrder = (item) => {
        const newList = [...deepClone(ordersList)].filter(
            (order) => order._id !== item
        );
        setOrdersList(newList);
    };

    const columns = [
        {
            title: "User Name",
            dataIndex: "user",
            key: "user",
            render: (item, data) => (
                <>
                    <Popover content={<Row>{data.userId}</Row>}>
                        <span>{item}</span>
                    </Popover>
                </>
            ),
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNo",
            key: "phoneNo",
        },
        {
            title: "Loaction",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Orderd Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Total Cart Value",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            render: (item, data) => (
                <Button onClick={() => handleShowProduct(item)}>Click</Button>
            ),
        },
        {
            title: "Print",
            dataIndex: "print",
            key: "print",
            render: (item, data) => (
                <BlobProvider
                    document={<PDFDocumnet value={data} />}
                    fileName="nice.pdf"
                >
                    {({ url }) => (
                        <a
                            className="print-button"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Print
                        </a>
                    )}
                </BlobProvider>
            ),
        },
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            render: (item, data) => (
                <Button onClick={() => deleteOrder(item)} type="primary" danger>
                    Delete
                </Button>
            ),
        },
    ];
    return (
        <>
            {showProduct && (
                <ProductList
                    values={currentProducts}
                    visibility={showProduct}
                    setVisibility={setShowProduct}
                />
            )}
            <Table dataSource={deepClone(ordersList)} columns={columns} />
        </>
    );
}
