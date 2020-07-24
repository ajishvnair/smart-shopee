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
import { recipes } from "../../dataProvider/dataArrays";
// import MenuImage from "../../components/MenuImage/MenuImage";
// import DrawerActions from "react-navigation";
import { getCategoryName } from "../../dataProvider/MockDataAPI";
import CartImage from "../../components/CartImage";

const ProductsScreen = ({ navigation }) => {
    const [productList, setProductList] = useState([]);

    const id = navigation.getParam("id", 1);
    useEffect(() => {
        http.getAction(`api/v1/product/all/${id}`)
            .then((res) => {
                const { products } = res.data;
                setProductList([...products]);
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
                    <Text style={styles.actualPrice}>
                        {" "}
                        ₹ {item.actualPrice}
                    </Text>{" "}
                    <Text style={styles.unit}>{item.unit}</Text>
                </Text>
            </View>
        </TouchableHighlight>
    );

    return (
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
