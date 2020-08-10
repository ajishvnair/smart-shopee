import React, { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    Image,
} from "react-native";
import http from "../../common/http";
import styles from "./styles";
import CartImage from "../../components/CartImage";
import Loader from "../../components/loader";

const ProductsScreen = ({ navigation }) => {
    // to store products
    const [productList, setProductList] = useState([]);
    const [loading, setLoader] = useState(true);

    const id = navigation.getParam("id", 1);
    useEffect(() => {
        http.getAction(`api/v1/product/active/all/${id}`)
            .then((res) => {
                const { products } = res.data;
                setProductList([...products]);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const onPressProduct = (item) => {
        navigation.navigate("Product", { item });
    };

    const renderProducts = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressProduct(item)}
        >
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.image }} />
                <Text style={styles.title}>{item.productNameEnglish}</Text>
                <Text style={styles.title}>{item.productNameMalayalam}</Text>
                <Text style={styles.discountPrice}>
                    ₹ {item.sellingPrice}
                    {item.actualPrice !== item.sellingPrice && (
                        <Text style={styles.actualPrice}>
                            {" "}
                            ₹ {item.actualPrice}
                        </Text>
                    )}{" "}
                    <Text style={styles.unit}>/{item.unit}</Text>
                </Text>
            </View>
        </TouchableHighlight>
    );

    return !loading ? (
        <View>
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={[...productList]}
                renderItem={renderProducts}
                keyExtractor={(item) => `${item._id}`}
            />
        </View>
    ) : (
        <Loader />
    );
};
ProductsScreen["navigationOptions"] = ({ navigation }) => ({
    headerRight: () => (
        <CartImage
            onPress={() => {
                navigation.navigate("Cart");
            }}
        />
    ),
});

export default ProductsScreen;
