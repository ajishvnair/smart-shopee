import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    btnClickContain: {
        flexDirection: "row",

        marginTop: 5,
        marginBottom: 5,
    },
    btnContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "red",
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#ECEFF1",
    },
    btnIcon: {
        height: 25,
        width: 25,
    },
    btnText: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 2,
    },
});

export default styles;
