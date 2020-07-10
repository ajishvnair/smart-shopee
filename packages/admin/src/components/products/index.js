import React, { useEffect, useState } from "react";
import { Table, Switch, Button } from "antd";
import { deepClone, createUUID } from "../../common/helper/commonMethods";
import { products } from "../../common/dataProvider/dummyData";
import { productData } from "../../common/dataProvider/dataProvider";
import AddNew from "./add-new";

export default function (props) {
    const [productList, setProductList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [curreElement, setCurrentElement] = useState(null);

    useEffect(() => {
        const { id } = props.match.params;
        const list = products.filter((prod) => prod.categoryId === id);
        setProductList([...list]);
    }, [props.match.params]);

    const changeProductStatus = (id) => {
        const product = productList.find((prod) => prod._id === id);
        const productIndex = productList.findIndex((prod) => prod._id === id);
        product.active = !product.active;
        const newProductsList = [...deepClone(productList)];
        newProductsList[productIndex] = product;
        setProductList([...newProductsList]);
    };

    const deleteProduct = (id) => {
        const newList = [...productList].filter((prod) => prod._id !== id);
        setProductList([...newList]);
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

    const handleSave = (data) => {
        const newList = [...deepClone(productList)];
        if (data._id) {
            const index = newList.findIndex((prod) => prod._id === data._id);
            newList[index] = { ...data };
        } else {
            data._id = createUUID();
            data.active = true;
            newList.push({ ...data });
        }
        setProductList([...newList]);
        setAddModal(false);
        setCurrentElement(null);
    };

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
                    onClick={() => changeProductStatus(data._id)}
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
            dataIndex: "validity",
            key: "validity",
            render: (item) => (
                <span>{`${item.startTime} ${item.endTime}`}</span>
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
                <Table dataSource={deepClone(productList)} columns={columns} />
            </div>
        </div>
    );
}
