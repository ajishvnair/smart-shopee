import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "row",
        // marginTop: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: 20,
        // backgroundColor: "#ECEFF1",
        // padding: 5,
        // margin: 5,
        // borderRadius: 15,
    },
    crossLine: {
        borderColor: "black",
    },
    profile: {
        alignSelf: "center",
        // borderWidth: 1,
        // borderColor: "black",
        margin: 10,
    },
    userIcon: {
        width: 100,
        height: 100,
        alignSelf: "center",
    },
    userName: {
        alignSelf: "center",
        marginTop: -30,
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 5,
        alignSelf: "center",
    },
    button: {
        borderRadius: 15,
        backgroundColor: "#ECEFF1",
        width: "100%",
    },
});

export default styles;
