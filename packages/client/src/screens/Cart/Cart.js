import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../state/actions/cart";
import { checkAvailability } from "../../common/commonMethods";
import styles from "./styles";
import CartItem from "./CartItem";
import http from "../../common/http";
import Loader from "../../components/loader";
import EmptyCart from "./EmptyCart";
import Warning from "./Warning";

const Cart = ({ navigation }) => {
    const dispatch = useDispatch();
    // state
    const [cartList, setCartList] = useState([]);
    const [warningMessage, setWarningMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [overlayLoader, setOverlayLoader] = useState(false);

    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

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
        } else {
            setLoading(false);
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
    const handleRemoveProduct = useCallback(
        (id) => {
            setOverlayLoader(true);
            const newCart = cart.filter((c) => c.productId !== id);
            http.postAction("api/v1/cart/set", {
                userId: user._id,
                products: [...newCart],
            })
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setCart(newCart));
                        const newCartList = cartList.filter(
                            (c) => c.product._id !== id
                        );
                        setCartList([...newCartList]);
                        setOverlayLoader(false);
                    } else {
                        // err
                        setOverlayLoader(false);
                    }
                })
                .catch((err) => {
                    //err
                    setOverlayLoader(false);
                });
        },
        [cart, cartList, setCartList, dispatch]
    );
    // to display total
    const calculateTotal = () => {
        let total = 0;
        cartList.forEach((c) => {
            if (checkAvailability(c.product.startTime, c.product.endTime)) {
                total +=
                    parseInt(c.quantity) * parseInt(c.product.sellingPrice);
            }
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
            handleRemoveProduct={handleRemoveProduct}
        />
    );

    const handleCheckout = useCallback(() => {
        if (Number(calculateTotal()) < 350) {
            setWarningMessage(true);
        } else {
            let newCartList = cartList.filter((c) => {
                checkAvailability(c.product.startTime, c.product.endTime);
            });
            newCartList = cartList.map((c) => ({
                quantity: c.quantity,
                productId: c.product._id,
                productNameEnglish: c.product.productNameEnglish,
                sellingPrice: c.product.sellingPrice,
            }));
            navigation.navigate("Checkout", {
                cart: [...newCartList],
                total: calculateTotal(),
            });
        }
    }, [setWarningMessage, cartList]);

    return !loading ? (
        cart.length > 0 ? (
            <>
                <View>
                    <FlatList
                        style={{ height: "90%", paddingHorizontal: 5 }}
                        vertical
                        showsVerticalScrollIndicator={false}
                        numColumns={1}
                        data={[...cartList]}
                        renderItem={renderProducts}
                        keyExtractor={(item) => `${item.product._id}`}
                    />
                    {overlayLoader && <Loader />}
                </View>
                <TouchableHighlight
                    style={styles.checkout}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={handleCheckout}
                >
                    <>
                        <Text style={styles.totalText}>
                            TOTAL ₹ {calculateTotal()}
                        </Text>

                        <Text style={styles.checkoutText}> CHECKOUT</Text>
                    </>
                </TouchableHighlight>
                {warningMessage && (
                    <Warning
                        visible={warningMessage}
                        setVisible={setWarningMessage}
                    />
                )}
            </>
        ) : (
            <EmptyCart />
        )
    ) : (
        <Loader />
    );
};

export default Cart;
