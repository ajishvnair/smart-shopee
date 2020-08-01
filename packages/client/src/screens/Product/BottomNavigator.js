import React from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../state/actions/cart";
import { checkAvailability } from "../../common/commonMethods";
import styles from "./styles";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import AddToCart from "../../components/AddToCart/AddToCart";

export default function ({ quantity, total, item }) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart || []);
    const addTo = () => {
        if (checkAvailability(item.startTime, item.endTime)) {
            let newCartList = [...cart];
            let cartItem = cart.find(
                (elements) => elements.productId === item._id
            );
            if (cartItem) {
                const index = cart.findIndex(
                    (elements) => elements.productId === item._id
                );
                cartItem.quantity += quantity;
                newCartList[index] = { ...cartItem };
            } else {
                newCartList.push({ productId: item._id, quantity });
            }
            dispatch(setCart([...newCartList]));
        }
    };
    return (
        <View style={styles.addToCart}>
            <View style={styles.addButtons}>
                <QuantitySelector
                    quantity={quantity}
                    total={total}
                    available={checkAvailability(item.startTime, item.endTime)}
                />
            </View>
            <View style={styles.addButtons}>
                <AddToCart
                    quantity={quantity}
                    available={checkAvailability(item.startTime, item.endTime)}
                    addTo={addTo}
                />
            </View>
        </View>
    );
}
