import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableHighlight,
    BackHandler,
} from "react-native";
import styles from "./styles";
// import { categories } from "../../dataProvider/dataArrays";
// import { getNumberOfRecipes } from "../../dataProvider/MockDataAPI";
import http from "../../common/http";
import MenuImage from "../../components/MenuImage/MenuImage";
import CartImage from "../../components/CartImage";
import Loader from "../../components/loader";

const HomeScreen = ({ navigation }) => {
    // for storing category
    const [categories, setCategories] = useState([]);
    const [loading, setLoader] = useState(true);
    // for fetching data
    useEffect(() => {
        http.getAction("api/v1/category/all")
            .then((res) => {
                const { categories } = res.data;
                setCategories([...categories]);
                setLoader(false);
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

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

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
                        uri: `${item.image}`,
                    }}
                />
                <Text style={styles.categoriesName}>
                    {item.categoryNameEnglish}
                </Text>

                <Text style={styles.categoriesInfo}>
                    {item.categoryNameMalayalam}
                </Text>
            </View>
        </TouchableHighlight>
    );

    return !loading ? (
        <View>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => `${item._id}`}
            />
        </View>
    ) : (
        <Loader />
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
