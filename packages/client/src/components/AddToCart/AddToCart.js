import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class AddToCart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableHighlight
                    underlayColor="rgba(73,182,77,1,0.9)"
                    onPress={this.props.onPress}
                >
                    <View style={styles.container}>
                        <Image
                            style={styles.infoPhoto}
                            source={require("../../../assets/icons/white-cart.png")}
                        />
                        <Text style={styles.text}>ADD TO CART</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

AddToCart.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
};
