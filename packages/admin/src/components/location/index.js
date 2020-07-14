import React, { useEffect, useState } from "react";
import { Table, Switch, Button, Spin } from "antd";
import { withRouter } from "react-router-dom";
import { locationData } from "../../common/dataProvider/dataProvider";
import { deepClone, createUUID } from "../../common/helper/commonMethods";
import { httpProvider } from "../../common/http";
import AddNew from "./add-new";

export default withRouter(function (props) {
    const { history } = props;
    const [locationsList, setLocationsList] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [curreElement, setCurrentElement] = useState({});
    const [completeLoading, setCompleteLoading] = useState(true);
    useEffect(() => {
        // setLocationsList([...locations]);
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
    const changeStatus = (id) => {
        let item = [...deepClone(locationsList)].find(
            (location) => location._id === id
        );
        const index = [...deepClone(locationsList)].findIndex(
            (cat) => cat._id === id
        );
        item.active = !item.active;
        const newList = [...deepClone(locationsList)];
        newList[index] = item;
        setLocationsList([...newList]);
    };

    const deleteLocation = (id) => {
        const newList = [...deepClone(locationsList)].filter(
            (cat) => cat._id !== id
        );
        setLocationsList(newList);
    };
    /**
     * to add location get initial data
     * and set to current in order to get it in add modal
     */
    const addCategory = () => {
        setCurrentElement(deepClone(locationData));
        setAddModal(true);
    };

    const editLocation = (id) => {
        const item = [...deepClone(locationsList)].find(
            (location) => location._id === id
        );
        setCurrentElement({ ...item });
        setAddModal(true);
    };
    /**
     * if _id exists thent it is edit
     * otherwise save
     * @param {*Objcet} data full category data
     */
    const handleSave = (data) => {
        const newList = [...deepClone(locationsList)];
        if (data._id) {
            const index = locationsList.findIndex(
                (cat) => cat._id === data._id
            );
            newList[index] = { ...data };
        } else {
            data._id = createUUID();
            data.active = true;
            newList.push(data);
        }
        setLocationsList([...newList]);
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
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Delivery Charge",
            dataIndex: "charge",
            key: "charge",
        },
        {
            title: "",
            dataIndex: "_id",
            key: "_id",
            render: (data) => (
                <Button
                    className="edit-button"
                    onClick={() => editLocation(data)}
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
                    onClick={() => deleteLocation(data)}
                    type="primary"
                    danger
                >
                    Delete
                </Button>
            ),
        },
    ];
    return (
        <Spin spinning={completeLoading}>
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
                        dataSource={deepClone(locationsList)}
                        columns={columns}
                    />
                </div>
            </div>
        </Spin>
    );
});
