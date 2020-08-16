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

    const getOrder = () => {
        setCompleteLoading(true);
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
    };

    useEffect(() => {
        getOrder();
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

    const getDateAndTime = (item) => {
        const date = new Date(item);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = date.getFullYear();
        //time
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const strTime = hours + ":" + minutes + " " + ampm;

        return dd + "/" + mm + "/" + yyyy + " " + strTime;
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
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Orderd Time",
            dataIndex: "orderdTime",
            key: "orderdTime",
            render: (item) => <span>{getDateAndTime(item)}</span>,
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
            <div className="add-button mg-10 ag-right">
                <Button type="primary" onClick={() => getOrder()}>
                    Refresh
                </Button>
            </div>
            <Spin size="large" spinning={completeLoading}>
                <Table dataSource={deepClone(ordersList)} columns={columns} />
            </Spin>
        </>
    );
}
