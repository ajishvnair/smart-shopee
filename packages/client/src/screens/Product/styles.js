import { StyleSheet, Dimensions } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        // flex: 1,
        height: "90%",
    },
    carouselContainer: {
        minHeight: 250,
    },
    carousel: {},

    image: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: 250,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        width: viewportWidth,
        height: 250,
    },
    infoRecipeContainer: {
        flex: 1,
        margin: 7,
        marginTop: 10,

        // justifyContent: "center",
        // alignItems: "center",
    },
    infoContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // marginLeft: 5,
        // borderColor: "black",
        // borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        // backgroundColor: "#E5E4E2",
        backgroundColor: "#EEE8CD",
        opacity: 0.8,
    },
    sub: {
        width: "90%",
    },
    infoContainerSub: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    infoPhoto: {
        height: 20,
        width: 20,
        marginRight: 0,
    },
    infoHeartPhoto: {
        height: 22,
        width: 22,
        marginRight: 10,
        alignSelf: "auto",
    },
    timer: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
        // color: "#2cd18a",
    },
    discountPrice: {
        fontSize: 23,
        fontWeight: "bold",
        // margin: 10,
        color: "red",
        paddingEnd: 10,
        fontFamily: "sans-serif",
    },
    actualPrice: {
        fontSize: 14,
        color: "black",
        textDecorationLine: "line-through",
    },
    unit: {
        fontWeight: "bold",
        paddingBottom: 3,
        marginTop: 5,
    },
    infoDescriptionRecipe: {
        textAlign: "left",
        fontSize: 16,
        marginTop: 30,
        margin: 15,
    },
    infoRecipeName: {
        fontSize: 20,
        // margin: 10,
        fontWeight: "bold",
        color: "black",
    },
    divider: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    validity: {
        marginTop: 5,
        flexDirection: "row",
        padding: 5,
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#EEE8CD",
        opacity: 0.8,
    },
    validitySub: {
        flexDirection: "row",
    },
    discription: {
        margin: 0,
    },
    addToCart: {
        position: "absolute",
        width: "100%",
        backgroundColor: "#E5E4E2",
        height: 55,
        bottom: 0,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    addButtons: {
        flex: 1,
    },
    addQuantity: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 1,
        width: 70,
        marginRight: 10,
        borderRadius: 5,
        borderColor: "#C0C0C0",
    },
    quantityText: {
        fontWeight: "bold",
        fontSize: 17,
        paddingHorizontal: 5,
    },
    delivery: {
        marginTop: 5,
        padding: 10,
        borderRadius: 15,
        // backgroundColor: "#E5E4E2",
    },
    deliveryHeading: {
        fontWeight: "bold",
        padding: 2,
    },
    location: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 5,
    },
    locationIcon: {
        height: 16,
        width: 16,
        marginRight: 0,
    },
    address: {
        color: "#3b3bff",
        width: "100%",
        // top: 0,
    },
    subText: {
        paddingLeft: 2,
    },
});

export default styles;
