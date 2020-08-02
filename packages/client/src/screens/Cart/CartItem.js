import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { Button, Icon } from "react-native-elements";
import styles from "./styles";

export default function ({
    item,
    quantity,
    handleQuantityOperation,
    handleRemoveProduct,
}) {
    // to calculate price based on quantity and price
    const calculatePrice = () =>
        parseInt(item.sellingPrice) * parseInt(quantity);

    return (
        <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: item.image }} />
            <View style={styles.info}>
                <Text style={styles.title}>{item.productNameEnglish}</Text>

                <View style={styles.addQuantity}>
                    <View style={styles.addQuantityContainer}>
                        <TouchableHighlight
                            activeOpacity={0.1}
                            underlayColor="red"
                            onPress={() =>
                                handleQuantityOperation("-", item._id)
                            }
                        >
                            <Text
                                style={{
                                    ...styles.quantityText,
                                    color: "#C0C0C0",
                                }}
                            >
                                -
                            </Text>
                        </TouchableHighlight>
                        <Text
                            style={{
                                ...styles.quantityText,
                                color: "#2cd18a",
                            }}
                        >
                            {quantity}
                        </Text>
                        <TouchableHighlight
                            activeOpacity={0.1}
                            underlayColor="#DDDDDD"
                            onPress={() =>
                                handleQuantityOperation("+", item._id)
                            }
                        >
                            <Text
                                style={{
                                    ...styles.quantityText,
                                    color: "#2cd18a",
                                }}
                            >
                                +
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.priceText}>₹ {calculatePrice()}</Text>
                    <View style={styles.trashContainer}>
                        <Button
                            buttonStyle={styles.removeBtn}
                            icon={
                                <Icon
                                    name="trash"
                                    type="font-awesome"
                                    color="white"
                                    size={12}
                                />
                            }
                            onPress={() => handleRemoveProduct(item._id)}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
