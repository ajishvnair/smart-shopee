import React from "react";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import ProductsScreen from "../screens/ProductsContainer/ProductsContainer";
import Product from "../screens/Product/Product";
import Cart from "../screens/Cart/Cart";
import Checkout from "../screens/Checkout/Checkout";
import LoginScreen from "../../App";
import { Text } from "react-native";

const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Products: ProductsScreen,
        Product: Product,
        Cart: Cart,
        Checkout: Checkout,
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            },
        },
        // Categories: CategoriesScreen,
        // Recipe: RecipeScreen,
        // RecipesList: RecipesListScreen,
        // Ingredient: IngredientScreen,
        // Search: SearchScreen,
        // IngredientsDetails: IngredientsDetailsScreen,
    },
    {
        initialRouteName: "Home",
        // headerMode: 'float',
        defaulfNavigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                fontWeight: "bold",
                textAlign: "center",
                alignSelf: "center",
                flex: 1,
            },
        }),
    }
);

const DrawerStack = createDrawerNavigator(
    {
        Main: MainNavigator,
    },
    {
        drawerPosition: "left",
        initialRouteName: "Main",
        drawerWidth: 200,
        contentComponent: DrawerContainer,
    }
);

const AppContainer = createAppContainer(DrawerStack);

export default function (props) {
    return <AppContainer setAuthenticated={props.setAuthenticated} />;
}

console.disableYellowBox = true;
