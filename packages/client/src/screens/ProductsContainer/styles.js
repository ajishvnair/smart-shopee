import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  discountPrice: RecipeCard.discountPrice,
  actualPrice: RecipeCard.actualPrice,
  unit: RecipeCard.unit,
});

export default styles;
