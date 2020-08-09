import React, { useEffect, useState } from "react";
import { Table, Row, Popover, Button, Spin, notification } from "antd";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { deepClone } from "../../common/helper/commonMethods";
// import { orders } from "../../common/dataProvider/dummyData";
import ProductList from "./product-details";
import PDFDocumnet from "./pdf";
import { protectedHttpProvider } from "../../common/http";

export default function () {
    const [ordersList, setOrdersList] = useState([]);
    const [showProduct, setShowProduct] = useState(false);
    const [currentProducts, setCurrentProducts] = useState(null);
    const [completeLoading, setCompleteLoading] = useState(true);

    useEffect(() => {
        protectedHttpProvider
            .getAction("api/v1/orders/get")
            .then((res) => {
                const { orders } = res.data;
                setOrdersList([...orders]);
                setCompleteLoading(false);
            })
            .catch((err) => {
                //err
                notification.error({
                    message: "Error while loading orders",
                });
                setCompleteLoading(false);
            });
    }, []);

    const handleShowProduct = (data) => {
        setCurrentProducts([...data]);
        setShowProduct(true);
    };

    const deleteOrder = (id) => {
        setCompleteLoading(true);
        protectedHttpProvider
            .postAction(`api/v1/orders/delete/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    const newList = [...deepClone(ordersList)].filter(
                        (order) => order._id !== id
                    );
                    setOrdersList(newList);
                    notification.success({
                        message: "Order deleted successfully",
                    });
                } else {
                    notification.error({ message: "Something went wrong" });
                }
                setCompleteLoading(false);
            })
            .catch((err) => {
                notification.error({ message: "Something went wrong" });
                setCompleteLoading(false);
            });
    };

    const columns = [
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            render: (item, data) => (
                <>
                    <Popover content={<Row>{data.userId}</Row>}>
                        <span>{item}</span>
                    </Popover>
                </>
            ),
        },
        {
            title: "Mobile Number",
            dataIndex: "mobileNo",
            key: "mobileNo",
        },
        {
            title: "Loaction",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Orderd Time",
            dataIndex: "orderdTime",
            key: "orderdTime",
        },
        {
            title: "Total Cart Value",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        // {
        //     title: "Products",
        //     dataIndex: "products",
        //     key: "products",
        //     render: (item, data) => (
        //         <Button onClick={() => handleShowProduct(item)}>Click</Button>
        //     ),
        // },
        // {
        //     title: "Print",
        //     dataIndex: "print",
        //     key: "print",
        //     render: (item, data) => (
        //         <BlobProvider
        //             document={<PDFDocumnet value={data} />}
        //             fileName="nice.pdf"
        //         >
        //             {({ url }) => (
        //                 <a
        //                     className="print-button"
        //                     href={url}
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                 >
        //                     Print
        //                 </a>
        //             )}
        //         </BlobProvider>
        //     ),
        // },
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
            <Spin size="large" spinning={completeLoading}>
                <Table dataSource={deepClone(ordersList)} columns={columns} />
            </Spin>
        </>
    );
}
