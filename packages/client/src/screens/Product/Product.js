import React, { useState, useEffect } from "react";
import { Image, ScrollView, Text, View, Dimensions } from "react-native";
import { checkAvailability } from "../../common/commonMethods";
import styles from "./styles";
import CartImage from "../../components/CartImage";
import DeliveryDetails from "./DeliveryDetails";
import AddQuantity from "./AddQuantity";
import BottomNavigator from "./BottomNavigator";

const Product = ({ navigation }) => {
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const item = navigation.getParam("item");

    useEffect(() => {
        setQuantity(1);
        setTotal(quantity * item.sellingPrice);
    }, [item]);

    const quantityOperation = (action) => {
        if (action === "+") {
            setQuantity((quantity) => quantity + 1);
            setTotal((quantity + 1) * item.sellingPrice);
        } else if (quantity !== 1) {
            setQuantity((quantity) => quantity - 1);
            setTotal((quantity - 1) * item.sellingPrice);
        }
    };

    return (
        <>
            <ScrollView style={styles.container}>
                {/* for image */}
                <View style={styles.carouselContainer}>
                    <View style={styles.carousel}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.image }}
                            />
                        </View>
                    </View>
                </View>
                {/* title and price row */}

                <View style={styles.infoRecipeContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.infoRecipeName}>
                                {`${item.productNameEnglish}(${item.productNameMalayalam})`}
                            </Text>
                            <View style={styles.infoContainerSub}>
                                <Text style={styles.discountPrice}>
                                    ₹ {item.sellingPrice}
                                    <Text style={styles.actualPrice}>
                                        {" "}
                                        ₹ {item.actualPrice}
                                    </Text>
                                </Text>
                                <Text style={styles.unit}>{item.unit}</Text>
                            </View>
                        </View>
                        <Image
                            style={styles.infoHeartPhoto}
                            source={require("../../../assets/icons/heart.png")}
                        />
                    </View>

                    {/* <View style={styles.divider}></View> */}
                    {/* add quantity card */}
                    <View style={styles.validity}>
                        <View style={styles.validitySub}>
                            <Image
                                style={styles.infoPhoto}
                                source={require("../../../assets/icons/time.png")}
                            />
                            <Text
                                style={{
                                    ...styles.timer,
                                    color: checkAvailability(
                                        item.startTime,
                                        item.endTime
                                    )
                                        ? `#2cd18a`
                                        : `red`,
                                }}
                            >
                                {checkAvailability(item.startTime, item.endTime)
                                    ? `Available Now`
                                    : `Not Available`}{" "}
                            </Text>
                        </View>

                        {checkAvailability(item.startTime, item.endTime) ? (
                            <AddQuantity
                                quantityOperation={quantityOperation}
                                quantity={quantity}
                            />
                        ) : null}
                    </View>

                    {checkAvailability(item.startTime, item.endTime) ? (
                        <DeliveryDetails />
                    ) : null}
                </View>
            </ScrollView>
            {/* bottom buttons */}
            <BottomNavigator
                quantity={quantity}
                total={total}
                // checkAvailability={checkAvailability}
                item={item}
            />
        </>
    );
};

Product["navigationOptions"] = ({ navigation }) => ({
    headerRight: () => (
        <CartImage
            onPress={() => {
                navigation.navigate("Cart");
            }}
        />
    ),
});
export default Product;
