import React, { useEffect, useState, useCallback } from "react";
import { Table, Switch, Button, Spin, notification } from "antd";
import {
    deepClone,
    createUUID,
    toFormData,
} from "../../common/helper/commonMethods";
import { productData } from "../../common/dataProvider/dataProvider";
import { protectedHttpProvider, httpProvider } from "../../common/http";
import { SERVER } from "../../environments/Environments";
import AddNew from "./add-new";

export default function (props) {
    const [productList, setProductList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [curreElement, setCurrentElement] = useState(null);
    const [completeLoading, setCompleteLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const { id } = props.match.params;
        httpProvider
            .getAction(`/api/v1/product/all/${id}`)
            .then((res) => {
                const { products } = res.data;
                setProductList([...products]);
                setCompleteLoading(false);
            })
            .catch((err) => {
                notification.error({
                    message: "Error while fetching products please refresh",
                });
                setCompleteLoading(false);
            });
        setCategoryId(id);
    }, [props.match.params]);

    const changeProductStatus = useCallback(
        (id, value) => {
            setCompleteLoading(true);
            protectedHttpProvider
                .postAction(`/api/v1/product/update/${id}`, { active: value })
                .then((res) => {
                    if (res.status === 200) {
                        let item = [...deepClone(productList)].find(
                            (pro) => pro._id === id
                        );
                        const index = [...deepClone(productList)].findIndex(
                            (pro) => pro._id === id
                        );
                        item.active = value;
                        const newList = [...deepClone(productList)];
                        newList[index] = item;
                        setProductList([...newList]);
                        setCompleteLoading(false);
                    }
                })
                .catch((err) => {
                    notification.error({
                        message: "Error while updating status",
                    });
                    setCompleteLoading(false);
                });
        },
        [productList]
    );

    const deleteProduct = (id) => {
        setCompleteLoading(true);
        protectedHttpProvider
            .postAction(`/api/v1/product/delete/${id}`, {})
            .then((res) => {
                if (res.status === 200) {
                    notification.success({
                        message: "Product deleted successfully",
                    });
                    const newList = [...deepClone(productList)].filter(
                        (pro) => pro._id !== id
                    );
                    setProductList(newList);
                    setCompleteLoading(false);
                }
            })
            .catch((err) => {
                notification.error({
                    message: "Error while deleting category",
                });
                setCompleteLoading(false);
            });
    };

    const editProduct = (id) => {
        const currentProduct = [...productList].find((prod) => prod._id === id);
        setCurrentElement({ ...currentProduct });
        setAddModal(true);
    };

    const addProduct = () => {
        setCurrentElement({ ...productData });
        setAddModal(true);
    };

    const handleSave = useCallback(
        (data) => {
            const newList = [...deepClone(productList)];
            setCompleteLoading(true);
            if (data._id) {
                const formData = toFormData({ ...data, categoryId });
                protectedHttpProvider
                    .postAction(`/api/v1/product/${data._id}`, formData)
                    .then((res) => {
                        const { product } = res.data;
                        // editting category in local
                        const index = productList.findIndex(
                            (pro) => pro._id === product._id
                        );
                        newList[index] = { ...product };
                        setProductList([...newList]);
                        // setAddModal(false);

                        notification.success({
                            message: "Category Editted successfully",
                        });
                        setCompleteLoading(false);
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while Editting product",
                        });
                        // setAddModal(false);
                        setCurrentElement(null);
                        setCompleteLoading(false);
                    });
            } else {
                const formData = toFormData({ ...data, categoryId });
                protectedHttpProvider
                    .postAction("/api/v1/product", formData)
                    .then((res) => {
                        const { product } = res.data;
                        notification.success({
                            message: "Product added successfully",
                        });
                        // setting to local
                        newList.push({ ...product });
                        setProductList([...newList]);
                        // setAddModal(false);
                        setCompleteLoading(false);
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while Adding category",
                        });
                        // setAddModal(false);
                        setCurrentElement(null);
                        setCompleteLoading(false);
                    });
            }
            setProductList([...newList]);
            setAddModal(false);
            setCurrentElement(null);
        },
        [productList]
    );

    const handleCancel = () => {
        setAddModal(false);
        setCurrentElement(null);
    };

    const columns = [
        {
            title: "Status",
            dataIndex: "active",
            key: "active",
            render: (item, data) => (
                <Switch
                    checked={item}
                    onClick={(value) => changeProductStatus(data._id, value)}
                />
            ),
        },
        {
            title: "Name(English)",
            dataIndex: "productNameEnglish",
            key: "productNameEnglish",
        },
        {
            title: "Name(Malayalam)",
            dataIndex: "productNameMalayalam",
            key: "productNameMalayalam",
        },
        {
            title: "Actual Price",
            dataIndex: "actualPrice",
            key: "actualPrice",
        },
        {
            title: "Selling Price",
            dataIndex: "sellingPrice",
            key: "sellingPrice",
        },
        {
            title: "Validity",
            dataIndex: "startTime",
            key: "startTime",
            render: (item, data) => (
                <span>
                    {data.startTime &&
                        data.startTime !== "undefined" &&
                        data.endTime &&
                        data.startTime !== "undefined"
                        ? `${data.startTime} ${data.endTime}`
                        : `Not set`}
                </span>
            ),
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (item) => (
                <img className="image" src={`${SERVER}${item}`} alt={item} />
            ),
        },
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            render: (data) => (
                <Button
                    className="edit-button"
                    onClick={() => editProduct(data)}
                >
                    Edit
                </Button>
            ),
        },
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            render: (data) => (
                <Button
                    onClick={() => deleteProduct(data)}
                    type="primary"
                    danger
                >
                    Delete
                </Button>
            ),
        },
    ];
    return (
        <Spin size="large" spinning={completeLoading}>
            <div className="items-list">
                <div className="add-button">
                    <Button type="primary" onClick={addProduct}>
                        + Add New
                    </Button>
                </div>
                {addModal && (
                    <AddNew
                        visibility={addModal}
                        handleCancel={handleCancel}
                        value={curreElement}
                        handleSave={handleSave}
                    />
                )}
                <div className="list-table">
                    <Table
                        dataSource={deepClone(productList)}
                        columns={columns}
                    />
                </div>
            </div>
        </Spin>
    );
}
