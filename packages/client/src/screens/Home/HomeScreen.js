import React from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { categories } from "../../dataProvider/dataArrays";
import { getNumberOfRecipes } from "../../dataProvider/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";

const HomeScreen = ({ navigation }) => {
  // static navigationOptions = {
  //   title: "Home",
  // };

  // constructor(props) {
  //   super(props);
  // }

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    navigation.navigate("Products");
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
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
        keyExtractor={(item) => `${item.id}`}
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
});

export default HomeScreen;
