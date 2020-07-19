import React, { useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { recipes } from "../../dataProvider/dataArrays";
// import MenuImage from "../../components/MenuImage/MenuImage";
// import DrawerActions from "react-navigation";
import { getCategoryName } from "../../dataProvider/MockDataAPI";

const Cart = ({ navigation }) => {
    const [confirmationModal, setConfirmationModal] = useState(false);

    const onPressRecipe = (item) => {
        navigation.navigate("Product", { item });
    };

    const renderProducts = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressRecipe(item)}
        >
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.photo_url }} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>

                    <View style={styles.addQuantity}>
                        <View style={styles.addQuantityContainer}>
                            <Text
                                style={{
                                    ...styles.quantityText,
                                    color: "#C0C0C0",
                                }}
                            >
                                -
                            </Text>
                            <Text
                                style={{
                                    ...styles.quantityText,
                                    color: "#2cd18a",
                                }}
                            >
                                1
                            </Text>
                            <Text
                                style={{
                                    ...styles.quantityText,
                                    color: "#2cd18a",
                                }}
                            >
                                +
                            </Text>
                        </View>
                        <Text style={styles.priceText}>₹ 100</Text>
                        <View style={styles.trashContainer}>
                            <Image
                                style={styles.infoPhoto}
                                source={require("../../../assets/icons/cross.png")}
                            />
                        </View>
                    </View>
                </View>
            </View>
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
                    data={recipes}
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
