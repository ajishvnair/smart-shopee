import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, Text, StyleSheet, Picker } from "react-native";
import { Input, Divider, CheckBox, Button } from "react-native-elements";
import SuccessModal from "./Success";
import http from "../../common/http";
import { setCart } from "../../state/actions/cart";

export default function ({ navigation }) {
    const dispatch = useDispatch();
    // redux data
    const user = useSelector((state) => state.user);
    const allLocations = useSelector((state) => state.locations);
    const cart = useSelector((state) => state.cart);
    // local state
    const [name, setName] = useState({ value: "", error: null });
    const [mobileNo, setMobileNo] = useState({ value: "", error: null });
    const [location, setLocation] = useState({ value: "", error: null });
    const [address, setAddress] = useState({ value: "", error: null });
    const [page, setPage] = useState("confirm");
    // loader
    const [btnLoader, setBtnLoader] = useState(false);
    // show Success modal
    const [showSuccess, setShowSuccess] = useState(false);
    // props data
    const cartList = navigation.getParam("cart");
    const total = navigation.getParam("total");

    // alert(total);

    useEffect(() => {
        setName({ value: user.userName, error: null });
        setMobileNo({ value: user.mobileNo, error: null });
        // const loc = allLocations.find((l) => l._id === user.location);
        setLocation({ value: user.location, error: null });
        setAddress({ value: user.address, error: null });
    }, []);
    // list all locations
    const getLocations = () => {
        const pickerItems = allLocations.map((loc) => (
            <Picker.Item label={loc.location} value={loc._id} key={loc._id} />
        ));
        return pickerItems;
    };
    // get delivery charge
    const getDeliveryCharge = () => {
        const loc = allLocations.find((lo) => lo._id === location.value);
        if (loc) return loc.deliveryCharge;
        else return "";
    };

    const confirmOrder = useCallback(() => {
        const phno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (name.value === "") {
            setName({ ...name, error: "Please enter name" });
        } else if (!mobileNo.value.match(phno)) {
            setMobileNo({
                ...mobileNo,
                error: "Please enter a valid mobile number",
            });
        } else if (address.value.length < 5) {
            setAddress({ ...address, error: "Please enter a valid address" });
        } else {
            setBtnLoader(true);
            const locationValue = allLocations.find(
                (loc) => loc._id === location.value
            );

            const payload = {
                userId: user._id,
                userName: name.value,
                address: address.value,
                location: locationValue.location,
                products: [...cartList],
                mobileNo: mobileNo.value,
                totalAmount: total + locationValue.deliveryCharge,
            };

            http.postAction("api/v1/orders/create", { ...payload })
                .then((res) => {
                    if (res.status === 200) {
                        const newCartList = cart.filter((c) => {
                            if (
                                cartList.find(
                                    (ca) => ca.productId === c.productId
                                )
                            ) {
                                return false;
                            }
                            return true;
                        });
                        // for clearing cart
                        http.postAction("api/v1/cart/set", {
                            userId: user._id,
                            products: [...newCartList],
                        })
                            .then((res) => {
                                if (res.status === 200) {
                                    dispatch(setCart([...newCartList]));
                                }
                                setLoader(false);
                            })
                            .catch((err) => {
                                //err
                                setLoader(false);
                            });
                        // dispatch(setCart(newCartList || []));
                        setBtnLoader(false);
                        // setShowSuccess(false);
                        setPage("success");
                    }
                })
                .catch((err) => {
                    // err
                });
        }
    }, [
        name,
        setName,
        mobileNo,
        setMobileNo,
        address,
        setAddress,
        setBtnLoader,
        setShowSuccess,
        user,
        total,
        cartList,
        setPage,
    ]);

    const getTotal = () => {
        return parseInt(total) + parseInt(getDeliveryCharge());
    };

    const showConfirm = () => {
        setPage("confirm");
        setShowSuccess(true);
    };
    return (
        <>
            <ScrollView style={styles.container}>
                <Input
                    label="Name"
                    value={name.value}
                    // operations
                    errorMessage={name.error}
                    onChangeText={(value) => setName({ value, error: null })}
                />
                <Input
                    label="Phone Number"
                    keyboardType="numeric"
                    // operations
                    value={mobileNo.value}
                    errorMessage={mobileNo.error}
                    onChangeText={(value) =>
                        setMobileNo({ value, error: null })
                    }
                />
                <Input
                    label="Address"
                    // operations
                    value={address.value}
                    errorMessage={address.error}
                    onChangeText={(value) => setAddress({ value, error: null })}
                />
                <Input
                    label="Select Location"
                    disabled
                    containerStyle={{ height: 15 }}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={location.value}
                    onValueChange={(value) =>
                        setLocation({ ...location, value })
                    }
                >
                    {getLocations()}
                </Picker>
                <Text style={styles.delivery}>
                    Delivery Charge ₹ {getDeliveryCharge()}
                </Text>
                <Text style={styles.title}>Payment Methods</Text>
                <Divider />
                <CheckBox
                    // center
                    title="Cash on delivery"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={true}
                />
            </ScrollView>
            <Button
                buttonStyle={styles.btn}
                title="CONFIRM ORDER"
                onPress={showConfirm}
                // loading={btnLoader}
            />
            {showSuccess && (
                <SuccessModal
                    visible={showSuccess}
                    setVisible={setShowSuccess}
                    navigation={navigation}
                    total={total}
                    getTotal={getTotal}
                    deliveryCharge={`${getDeliveryCharge()}`}
                    page={page}
                    confirmOrder={confirmOrder}
                    loading={btnLoader}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: "90%",
    },
    btn: {
        bottom: 0,
        height: 50,
        backgroundColor: "#eec248",
    },
    title: {
        margin: 10,
        fontWeight: "bold",
    },
    delivery: {
        fontWeight: "bold",
        marginHorizontal: 10,
        alignSelf: "flex-end",
    },
});
