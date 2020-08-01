import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#eec248",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

        // backgroundColor: '#2cd18a'
    },
    infoPhoto: {
        height: 20,
        width: 20,
        marginRight: 5,
    },
    text: {
        padding: 5,
        fontSize: 14,
        color: "white",
        fontWeight: "bold",
    },
});

export default styles;
