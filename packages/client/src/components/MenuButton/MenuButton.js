import React from "react";
import { TouchableHighlight, Image, Text, View } from "react-native";
import PropTypes from "prop-types";
import { Badge } from "react-native-elements";
import styles from "./styles";

export default class MenuButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={styles.btnClickContain}
                underlayColor="rgba(128, 128, 128, 0.1)"
            >
                <View style={styles.btnContainer} elevation={5}>
                    <Image source={this.props.source} style={styles.btnIcon} />
                    <Text style={styles.btnText}>{this.props.title}</Text>
                    {this.props.badge && <Badge status="error" />}
                </View>
            </TouchableHighlight>
        );
    }
}

MenuButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string,
};
