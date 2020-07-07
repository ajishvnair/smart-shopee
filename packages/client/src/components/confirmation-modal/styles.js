import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE8CD",
    // height: "100%",
    // padding: 10,
  },
  displayCard: {
    marginTop: 5,
    flexDirection: "row",
    padding: 5,
    // justifyContent: "space-between",
    padding: 10,
    borderRadius: 15,
    // backgroundColor: "#EEE8CD",
    opacity: 0.8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },
  addToCart: {
    flex: 1,
    position: "absolute",
    width: "100%",
    backgroundColor: "#E5E4E2",
    height: 55,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  confirm: {
    flex: 1,
    backgroundColor: "#eec248",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  cancel: {
    flex: 1,
    backgroundColor: "#CDAF95",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  checkout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  checkoutText: {
    padding: 5,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  radio: {
    marginLeft: 10,
    flexDirection: "row",
  },
  radioTitle: {
    paddingHorizontal: 5,
  },
});
export default styles;
