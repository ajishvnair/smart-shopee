import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
// import { categories } from "../../dataProvider/dataArrays";
// import { getNumberOfRecipes } from "../../dataProvider/MockDataAPI";
import axios from "axios";
import MenuImage from "../../components/MenuImage/MenuImage";
import CartImage from "../../components/CartImage";

const HomeScreen = ({ navigation }) => {
    // for storing category
    const [categories, setCategories] = useState([]);
    // for fetching data
    useEffect(() => {
        axios
            .get("http://127.0.0.1:3001/api/v1/category/all")
            .then((res) => {
                const { categories } = res.data;
                setCategories([...categories]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onPressCategory = (item) => {
        const title = item.name;
        const category = item;
        navigation.navigate("Products", { id: item._id });
    };

    const renderCategory = ({ item }) => (
        <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressCategory(item)}
            key={item._id}
        >
            <View style={styles.categoriesItemContainer} key={item._id}>
                <Image
                    style={styles.categoriesPhoto}
                    source={{
                        uri:
                            "https://res.cloudinary.com/dkwvxrstj/image/upload/v1595048686/jg4gc2m3cikjj2roe4xj.jpg",
                    }}
                />
                <Text style={styles.categoriesName}>
                    {item.categoryNameEnglish}
                </Text>
                {/* <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} recipes
        </Text> */}
            </View>
        </TouchableHighlight>
    );

    return (
        <View>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => `${item._id}`}
            />
        </View>
    );
};

HomeScreen["navigationOptions"] = ({ navigation }) => ({
    title: "Home",
    headerLeft: () => (
        <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    ),
    headerRight: () => (
        <CartImage
            onPress={() => {
                navigation.navigate("Cart");
            }}
        />
    ),
});

export default HomeScreen;
