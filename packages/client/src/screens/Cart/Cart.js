import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import CartItem from "./CartItem";
import http from "../../common/http";
import Loader from "../../components/loader";

const Cart = ({ navigation }) => {
    const [cartList, setCartList] = useState([]);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (cart.length > 0) {
            const products = cart.map((c) => c.productId);
            http.postAction("api/v1/product/all/byId", { products })
                .then((res) => {
                    if (res.status === 200) {
                        const { products } = res.data;
                        // making new list with qunatity
                        const newProductList = (products || []).map(
                            (product) => {
                                const cartItem = cart.find(
                                    (c) => c.productId === product._id
                                );
                                return {
                                    product,
                                    quantity: cartItem.quantity,
                                };
                            }
                        );
                        setCartList([...newProductList]);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    //err
                });
        }
    }, []);

    const handleQuantityOperation = useCallback(
        (operator, id) => {
            let newCartList = [];
            switch (operator) {
                case "+":
                    newCartList = cartList.map((c) => {
                        if (c.product._id === id) {
                            return {
                                product: c.product,
                                quantity: c.quantity + 1,
                            };
                        }
                        return c;
                    });
                    setCartList([...newCartList]);
                    break;
                case "-":
                    newCartList = cartList.map((c) => {
                        if (c.product._id === id) {
                            if (c.quantity > 1) {
                                return {
                                    product: c.product,
                                    quantity: c.quantity - 1,
                                };
                            }
                            return c;
                        }
                        return c;
                    });
                    setCartList([...newCartList]);
                    break;
                default:
                    return;
            }
        },
        [cartList, setCartList]
    );
    // to display total
    const calculateTotal = () => {
        let total = 0;
        cartList.forEach((c) => {
            total += parseInt(c.quantity * c.product.sellingPrice);
        });
        return total;
    };
    const onPressProduct = (item) => {
        navigation.navigate("Product", { item });
    };

    const renderProducts = ({ item }) => (
        <CartItem
            item={item.product}
            quantity={item.quantity}
            handleQuantityOperation={handleQuantityOperation}
        />
    );

    return !loading ? (
        <>
            <View>
                <FlatList
                    style={{ height: "90%", paddingHorizontal: 5 }}
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
                    <Text style={styles.totalText}>
                        TOTAL ₹ {calculateTotal()}
                    </Text>

                    <Text style={styles.checkoutText}> CHECKOUT</Text>
                </>
            </TouchableHighlight>
        </>
    ) : (
        <Loader />
    );
};

export default Cart;
