import React, { useEffect, useState } from "react";
import { Table, Switch, Button } from "antd";
import { withRouter } from "react-router-dom";
import { category } from "../../common/dataProvider/dummyData";
import { categoryData } from "../../common/dataProvider/dataProvider";
import { deepClone, createUUID } from "../../common/helper/commonMethods";
import AddNew from "./add-new";

export default withRouter(function (props) {
    const { history } = props;
    const [categoryList, setCategoryList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [curreElement, setCurrentElement] = useState(null);

    useEffect(() => {
        setCategoryList([...category]);
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
    const handleSave = (data) => {
        const newList = [...deepClone(categoryList)];
        if (data._id) {
            const index = categoryList.findIndex((cat) => cat._id === data._id);
            newList[index] = { ...data };
        } else {
            data._id = createUUID();
            data.active = true;
            newList.push(data);
        }
        setCategoryList([...newList]);
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
                <span onClick={() => editCategory(data)}>
                    <a>Edit</a>
                </span>
            ),
        },
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            render: (data) => (
                <span onClick={() => deleteCategory(data)}>
                    <a>Delete</a>
                </span>
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
