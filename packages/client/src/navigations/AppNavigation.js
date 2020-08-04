import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import ProductsScreen from "../screens/ProductsContainer/ProductsContainer";
import Product from "../screens/Product/Product";
import Cart from "../screens/Cart/Cart";
import Checkout from "../screens/Checkout/Checkout";

const MainNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Products: ProductsScreen,
        Product: Product,
        Cart: Cart,
        Checkout: Checkout,
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
        drawerWidth: 250,
        contentComponent: DrawerContainer,
    }
);

export default AppContainer = createAppContainer(DrawerStack);

console.disableYellowBox = true;
