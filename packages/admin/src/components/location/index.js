import React, { useEffect, useState, useCallback } from "react";
import { Table, Switch, Button, Spin, notification } from "antd";
import { withRouter } from "react-router-dom";
import { locationData } from "../../common/dataProvider/dataProvider";
import { deepClone, createUUID } from "../../common/helper/commonMethods";
import { httpProvider, protectedHttpProvider } from "../../common/http";
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
            .getAction("/api/v1/location/all")
            .then((res) => {
                const { locations } = res.data;
                setLocationsList([...locations]);
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
                .postAction(`api/v1/location/update/${id}`, { active: value })
                .then((res) => {
                    let item = [...deepClone(locationsList)].find(
                        (loc) => loc._id === id
                    );
                    const index = [...deepClone(locationsList)].findIndex(
                        (loc) => loc._id === id
                    );
                    item.active = value;
                    const newList = [...deepClone(locationsList)];
                    newList[index] = item;
                    setLocationsList([...newList]);
                    setCompleteLoading(false);
                })
                .catch((err) => {
                    notification.error({
                        message: "Error while updating status",
                    });
                    setCompleteLoading(false);
                });
        },
        [locationsList]
    );

    const deleteLocation = useCallback(
        (id) => {
            setCompleteLoading(true);
            protectedHttpProvider
                .postAction(`api/v1/location/delete/${id}`, {})
                .then((res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: "Location deleted successfully",
                        });
                        const newList = [...deepClone(locationsList)].filter(
                            (loc) => loc._id !== id
                        );
                        setLocationsList(newList);
                        setCompleteLoading(false);
                    }
                })
                .catch((err) => {
                    notification.error({
                        message: "Error while deleting location",
                    });
                    setCompleteLoading(false);
                });
        },
        [locationsList]
    );
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
    const handleSave = useCallback(
        (data) => {
            setAddModal(false);
            setCompleteLoading(true);
            const newList = [...deepClone(locationsList)];
            if (data._id) {
                // const index = locationsList.findIndex(
                //     (cat) => cat._id === data._id
                // );
                // newList[index] = { ...data };
                protectedHttpProvider
                    .postAction(`api/v1/location/${data._id}`, data)
                    .then((res) => {
                        const { location } = res.data;
                        const index = locationsList.findIndex(
                            (loc) => loc._id === location._id
                        );
                        newList[index] = { ...location };
                        setLocationsList([...newList]);
                        notification.success({
                            message: "Location Editted successfully",
                        });
                        setCompleteLoading(false);
                    })
                    .catch((err) => {
                        notification.error({
                            message: "Error while Editting location",
                        });
                        // setAddModal(false);
                        setCurrentElement(null);
                        setCompleteLoading(false);
                    });
            } else {
                protectedHttpProvider
                    .postAction("/api/v1/location", data)
                    .then((res) => {
                        const { location } = res.data;
                        notification.success({
                            message: "Location added successfully",
                        });
                        // setting to local
                        // newList.push({ ...location });
                        setLocationsList([location, ...newList]);
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
            // setLocationsList([...newList]);
            // setAddModal(false);
            // setCurrentElement(null);
        },
        [locationsList]
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
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Delivery Charge",
            dataIndex: "deliveryCharge",
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
        <Spin spinning={completeLoading} size="large">
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
