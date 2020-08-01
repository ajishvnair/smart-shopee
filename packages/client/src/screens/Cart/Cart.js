import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import CartItem from "./CartItem";
import http from "../../common/http";

const Cart = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (cart.length > 0) {
            const products = cart.map((c) => c.productId);
            http.postAction("api/v1/product/all/byId", { products })
                .then((res) => {
                    if (res.status === 200) {
                        const { products } = res.data;
                        setCartList([...products]);
                    }
                })
                .catch((err) => {
                    //err
                });
        }
    }, []);

    const onPressProduct = (item) => {
        navigation.navigate("Product", { item });
    };

    const renderProducts = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressProduct(item)}
        >
            <CartItem item={item} />
        </TouchableHighlight>
    );

    return (
        <>
            <View>
                <FlatList
                    style={{ height: "90%" }}
                    vertical
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    data={[...cartList]}
                    renderItem={renderProducts}
                    keyExtractor={(item) => `${item.recipeId}`}
                />
            </View>
            <TouchableHighlight
                style={styles.checkout}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setConfirmationModal(true)}
            >
                <>
                    <Text style={styles.totalText}>TOTAL ₹ 999</Text>

                    <Text style={styles.checkoutText}> CHECKOUT</Text>
                </>
            </TouchableHighlight>
        </>
    );
};

export default Cart;
