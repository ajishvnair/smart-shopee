import React, { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    View,
    TouchableHighlight,
    Image,
} from "react-native";
import axios from 'axios';
import styles from "./styles";
import { recipes } from "../../dataProvider/dataArrays";
// import MenuImage from "../../components/MenuImage/MenuImage";
// import DrawerActions from "react-navigation";
import { getCategoryName } from "../../dataProvider/MockDataAPI";
import CartImage from "../../components/CartImage";

const ProductsScreen = ({ navigation }) => {

    const [productList, setProductList] = useState([]);

    const id = navigation.getParam('id', 1);
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:3001/api/v1/product/all/${id}`)
            .then((res) => {
                const { products } = res.data;
                setProductList([...products]);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id])

    onPressRecipe = (item) => {
        navigation.navigate("Product", { item });
    };

    const renderProducts = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressRecipe(item)}
        >
            <View style={styles.container}>
                <Image style={styles.photo} source={{ uri: item.image }} />
                <Text style={styles.title}>{item.productNameEnglish}</Text>
                <Text style={styles.discountPrice}>
                    ₹ 100<Text style={styles.actualPrice}> ₹ 150</Text>{" "}
                    <Text style={styles.unit}>/kg</Text>
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
