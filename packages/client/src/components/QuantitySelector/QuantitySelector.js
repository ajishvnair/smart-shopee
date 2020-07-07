import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuantitySelector = this.handleQuantitySelector.bind(this);
  }
  handleQuantitySelector(type) {
    if (type === "add") {
      this.props.setQuantity(this.props.quantity + 1);
    } else if (this.props.quantity > 0) {
      this.props.setQuantity(this.props.quantity - 1);
    }
  }
  render() {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>1 Item | ₹ 600</Text>
      </View>
    );
  }
}

QuantitySelector.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
