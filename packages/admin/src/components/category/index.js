import React, { useEffect, useState, useCallback } from "react";
import { Table, Switch, Button, notification } from "antd";
import { withRouter } from "react-router-dom";
import { categoryData } from "../../common/dataProvider/dataProvider";
import { deepClone, toFormData } from "../../common/helper/commonMethods";
import { protectedHttpProvider, httpProvider } from "../../common/http";
import AddNew from "./add-new";

export default withRouter(function (props) {
    const { history } = props;
    const [categoryList, setCategoryList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [curreElement, setCurrentElement] = useState(null);

    useEffect(() => {
        httpProvider
            .getAction("api/v1/category/all")
            .then((res) => {
                const { categories } = res.data;
                setCategoryList([...categories]);
            })
            .catch((err) => {
                notification.error({
                    message: "Error while fetching categories please refresh",
                });
            });
    }, []);
    /**
     *
     * @param {*String} id category id
     */
    const changeStatus = (id) => {
        let item = [...deepClone(categoryList)].find((cat) => cat._id === id);
        const index = [...deepClone(categoryList)].findIndex(
            (cat) => cat._id === id
        );
        item.active = !item.active;
        const newList = [...deepClone(categoryList)];
        newList[index] = item;
        setCategoryList([...newList]);
    };
    /**
     *
     * @param {*String} id category id
     */
    const deleteCategory = (id) => {
        const newList = [...deepClone(categoryList)].filter(
            (cat) => cat._id !== id
        );
        setCategoryList(newList);
    };
    /**
     * to add category get initial data
     * and set to current in order to get it in add modal
     */
    const addCategory = () => {
        setCurrentElement(deepClone(categoryData));
        setAddModal(true);
    };

    const editCategory = (id) => {
        const item = [...deepClone(categoryList)].find((cat) => cat._id === id);
        setCurrentElement({ ...item });
        setAddModal(true);
    };
    /**
     * if _id exists thent it is edit
     * otherwise save
     * @param {*Objcet} data full category data
     */
    const handleSave = useCallback(
        (data) => {
            const newList = [...deepClone(categoryList)];
            if (data._id) {
                const formData = toFormData(data);
                protectedHttpProvider
                    .postAction(`api/v1/category/${data._id}`, formData)
                    .then((res) => {
                        const { category } = res.data;
                        // editting category in local
                        const index = categoryList.findIndex(
                            (cat) => cat._id === category._id
                        );
                        newList[index] = { ...category };
                        setCategoryList([...newList]);
                        setAddModal(false);

                        notification.success({
                            message: "Category Editted successfully",
                        });
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while Editting category",
                        });
                        setAddModal(false);
                        setCurrentElement(null);
                    });
            } else {
                const formData = toFormData(data);
                protectedHttpProvider
                    .postAction("api/v1/category", formData)
                    .then((res) => {
                        const { category } = res.data;
                        notification.success({
                            message: "Category added successfully",
                        });
                        // setting to local
                        newList.push({ ...category });
                        setCategoryList([...newList]);
                        setAddModal(false);
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while Adding category",
                        });
                        setAddModal(false);
                        setCurrentElement(null);
                    });
            }
        },
        [categoryList]
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
                <Switch checked={item} onClick={() => changeStatus(data._id)} />
            ),
        },
        {
            title: "Category(English)",
            dataIndex: "categoryNameEnglish",
            key: "categoryNameEnglish",
            render: (item, data) => (
                <span onClick={() => history.push(`/products/${data._id}`)}>
                    {item}
                </span>
            ),
        },
        {
            title: "Category(Malayalam)",
            dataIndex: "categoryNameMalayalam",
            key: "categoryNameEnglish",
            render: (item, data) => (
                <span onClick={() => history.push(`/products/${data._id}`)}>
                    {item}
                </span>
            ),
        },
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            render: (data) => (
                <Button
                    className="edit-button"
                    onClick={() => editCategory(data)}
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
                    onClick={() => deleteCategory(data)}
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
                <Button type="primary" onClick={addCategory}>
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
                <Table dataSource={deepClone(categoryList)} columns={columns} />
            </div>
        </div>
    );
});
