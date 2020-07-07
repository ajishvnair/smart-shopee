import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  Image,
} from "react-native";
import styles from "./styles";
import { recipes } from "../../dataProvider/dataArrays";
// import MenuImage from "../../components/MenuImage/MenuImage";
// import DrawerActions from "react-navigation";
import { getCategoryName } from "../../dataProvider/MockDataAPI";

const ProductsScreen = ({ navigation }) => {
  onPressRecipe = (item) => {
    navigation.navigate("Product", { item });
  };

  const renderProducts = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
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
        data={recipes}
        renderItem={renderProducts}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
};

export default ProductsScreen;
