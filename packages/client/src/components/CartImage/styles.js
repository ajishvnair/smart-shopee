import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerButtonContainer: {
        padding: 10,
    },
    headerButtonImage: {
        justifyContent: "center",
        width: 25,
        height: 25,
        margin: 6,
    },
    cartCount: {
        position: "absolute",
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: "rgba(95,197,123,0.9)",
        bottom: 15,
        right: 20,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});

export default styles;
