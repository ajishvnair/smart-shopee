import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";

export default function ({ available, addTo, loading }) {
    return (
        <View style={styles.mainContainer}>
            <Button
                title={
                    <>
                        <Image
                            style={styles.infoPhoto}
                            source={require("../../../assets/icons/white-cart.png")}
                        />
                        <Text style={styles.text}>
                            {available ? ` ADD TO CART` : ` GO TO CART`}
                        </Text>
                    </>
                }
                buttonStyle={styles.mainContainer}
                containerStyle={styles.container}
                // operations
                onPress={() => addTo()}
                loading={loading}
            />
        </View>
    );
}
