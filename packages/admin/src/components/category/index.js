import React, { useEffect, useState, useCallback } from "react";
import { Table, Switch, Button, notification, Spin, Modal, Row } from "antd";
import { withRouter } from "react-router-dom";
import { categoryData } from "../../common/dataProvider/dataProvider";
import { deepClone, toFormData } from "../../common/helper/commonMethods";
import { protectedHttpProvider, httpProvider } from "../../common/http";
import { SERVER } from "../../environments/Environments";
import AddNew from "./add-new";

const { confirm } = Modal;

export default withRouter(function (props) {
    const { history } = props;
    const [completeLoading, setCompleteLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [curreElement, setCurrentElement] = useState(null);

    useEffect(() => {
        httpProvider
            .getAction("api/v1/category/all")
            .then((res) => {
                const { categories } = res.data;
                setCategoryList([...categories]);
                setCompleteLoading(false);
            })
            .catch((err) => {
                notification.error({
                    message: "Error while fetching categories please refresh",
                });
                setCompleteLoading(false);
            });
    }, []);
    /**
     *
     * @param {*String} id category id
     */
    const changeStatus = useCallback(
        (id, value) => {
            setCompleteLoading(true);
            protectedHttpProvider
                .postAction(`api/v1/category/update/${id}`, { active: value })
                .then((res) => {
                    let item = [...deepClone(categoryList)].find(
                        (cat) => cat._id === id
                    );
                    const index = [...deepClone(categoryList)].findIndex(
                        (cat) => cat._id === id
                    );
                    item.active = value;
                    const newList = [...deepClone(categoryList)];
                    newList[index] = item;
                    setCategoryList([...newList]);
                    setCompleteLoading(false);
                })
                .catch((err) => {
                    notification.error({
                        message: "Error while updating status",
                    });
                    setCompleteLoading(false);
                });
        },
        [categoryList]
    );
    /**
     *
     * @param {*String} id category id
     */
    const deleteCategory = (id) => {
        confirm({
            title: "Please remove all products before deleting Category",
            // icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    <Row>
                        Deleting Category with products will messed up Database
                    </Row>
                    <Row>Otherwise disable it</Row>
                </>
            ),
            onOk() {
                setCompleteLoading(true);
                protectedHttpProvider
                    .postAction(`api/v1/category/delete/${id}`, {})
                    .then((res) => {
                        if (res.status === 200) {
                            notification.success({
                                message: "Category deleted successfully",
                            });
                            const newList = [...deepClone(categoryList)].filter(
                                (cat) => cat._id !== id
                            );
                            setCategoryList(newList);
                            setCompleteLoading(false);
                        }
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while deleting category",
                        });
                        setCompleteLoading(false);
                    });
            },
            onCancel() {},
        });
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
            setAddModal(false);
            setCompleteLoading(true);
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
                        // setAddModal(false);

                        notification.success({
                            message: "Category Editted successfully",
                        });
                        setCompleteLoading(false);
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while Editting category",
                        });
                        // setAddModal(false);
                        setCurrentElement(null);
                        setCompleteLoading(false);
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
                <Switch
                    checked={item}
                    onClick={(value) => changeStatus(data._id, value)}
                />
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
        <Spin size="large" spinning={completeLoading}>
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
                    <Table
                        dataSource={deepClone(categoryList)}
                        columns={columns}
                    />
                </div>
            </div>
        </Spin>
    );
});
