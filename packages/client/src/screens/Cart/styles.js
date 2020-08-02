import { RecipeCard } from "../../AppStyles";
import { StyleSheet, Dimensions } from "react-native";

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_MARGIN = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginLeft: RECIPE_ITEM_MARGIN,
        marginTop: 20,
        // width:
        //   (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
        //   recipeNumColums,
        height: RECIPE_ITEM_HEIGHT,
        borderColor: "#cccccc",
        borderWidth: 0.5,
        borderRadius: 15,
    },
    photo: {
        width:
            (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
            recipeNumColums,
        height: RECIPE_ITEM_HEIGHT,
        borderRadius: 15,
        // borderBottomLeftRadius: 0,
        // borderBottomRightRadius: 0,
    },

    info: {
        flex: 1,
        width: "100%",
        fontSize: 15,
        marginLeft: 10,
        flexDirection: "column",
        // fontWeight: "bold",
        // textAlign: "center",
        color: "#444444",
        // marginTop: 3,
        // marginRight: 5,
        // marginLeft: 5,
    },
    title: {
        fontWeight: "bold",
    },
    addQuantityContainer: {
        flexDirection: "row",
        // width: "100%",
        borderWidth: 1,
        // width: 70,
        height: 30,
        marginRight: 10,
        borderRadius: 5,
        borderColor: "#C0C0C0",
    },
    infoPhoto: {
        height: 20,
        width: 20,
        marginRight: 0,
    },
    addQuantity: {
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    trashContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    trashText: {
        fontWeight: "bold",
        color: "red",
    },
    quantityText: {
        fontWeight: "bold",
        fontSize: 19,
        paddingHorizontal: 5,
    },
    priceText: {
        fontWeight: "bold",
    },
    checkout: {
        position: "absolute",
        width: "100%",
        backgroundColor: "#eec248",
        height: 55,
        bottom: 0,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    checkoutText: {
        padding: 5,
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    totalText: {
        padding: 5,
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
    },
    removeBtn: {
        backgroundColor: "red",
        height: 25,
        width: 25,
        borderRadius: 25,
    },
});

export default styles;
