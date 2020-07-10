import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
    getIngredientName,
    getCategoryName,
    getCategoryById,
} from "../../dataProvider/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import AddToCart from "../../components/AddToCart/AddToCart";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import CartImage from "../../components/CartImage";

const { width: viewportWidth } = Dimensions.get("window");

const Product = ({ navigation }) => {
    const [quantity, setQuantity] = useState(0);

    const renderImage = ({ item }) => (
        <TouchableHighlight>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item }} />
            </View>
        </TouchableHighlight>
    );

    const onPressIngredient = (item) => {
        var name = getIngredientName(item);
        let ingredient = item;
        // this.props.navigation.navigate("Ingredient", { ingredient, name });
    };

    const item = navigation.getParam("item");
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.carouselContainer}>
                    <View style={styles.carousel}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.photosArray[0] }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.infoRecipeContainer}>
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.infoRecipeName}>
                                {item.title}
                            </Text>
                            <View style={styles.infoContainerSub}>
                                <Text style={styles.discountPrice}>
                                    ₹ 150
                                    <Text style={styles.actualPrice}>
                                        {" "}
                                        ₹ 100
                                    </Text>
                                </Text>
                                <Text style={styles.unit}>/Kg</Text>
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
                            <Text style={styles.timer}>Available Now </Text>
                        </View>
                        <View style={styles.addQuantity}>
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
                    </View>
                    {/* Delivery card */}
                    <View style={styles.delivery}>
                        <Text style={styles.deliveryHeading}>
                            Delivery Details
                        </Text>
                        <View style={styles.divider}></View>

                        <View style={styles.location}>
                            <Image
                                style={styles.locationIcon}
                                source={require("../../../assets/icons/pin.png")}
                            />
                            <Text style={styles.address}>
                                Pulimudu, Parathodu, 686512{" "}
                            </Text>
                        </View>
                        <Text style={styles.subText}>
                            We will reach out you with in 5 hours
                        </Text>
                        <Text style={styles.subText}>
                            Delivery time will vary depending on products in
                            your cart
                        </Text>
                        <Text style={styles.subText}>
                            For any queries contact our customer support
                        </Text>
                        <Text style={styles.subText}>+91 9988776655</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.addToCart}>
                <View style={styles.addButtons}>
                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </View>
                <View style={styles.addButtons}>
                    <AddToCart quantity={quantity} />
                </View>
            </View>
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
