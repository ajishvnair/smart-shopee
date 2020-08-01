import React, { useState } from "react";
import {
    Modal,
    Text,
    View,
    TouchableHighlight,
    Image,
    ScrollView,
} from "react-native";
import styles from "./styles";
import Input from "../input-box";
import Radio from "../radio-button";
import Dropdown from "../dropdown";
import Success from "../success";

export default function ({ visible, setVisibility }) {
    const [name, setName] = useState("");
    const [pincode, setPincode] = useState("686513");

    // for setting success modal
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <>
            {showSuccess && (
                <Success
                    title="Order placed successfully"
                    visible={showSuccess}
                    setVisibility={setShowSuccess}
                />
            )}
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    setVisibility(false);
                }}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.displayCard}>
                            <Text style={styles.title}>DELIVERY ADDRESS</Text>
                            <Image
                                style={styles.infoPhoto}
                                source={require("../../../assets/icons/truck.png")}
                            />
                        </View>
                        <Input
                            value={name}
                            onChange={setName}
                            placeholder="Name "
                            type="default"
                        />
                        <Input
                            value={name}
                            onChange={setName}
                            placeholder="Mobile Number"
                            type="numeric"
                        />
                        <Dropdown value={pincode} onChange={setPincode} />
                        <Input
                            value={name}
                            onChange={setName}
                            placeholder="House Name"
                            type="default"
                        />
                        <View style={styles.displayCard}>
                            <Text style={styles.title}>PAYMENT METHODS</Text>
                            <Image
                                style={styles.infoPhoto}
                                source={require("../../../assets/icons/pay.png")}
                            />
                        </View>
                        <View style={styles.radio}>
                            <Radio selected={true} />
                            <Text style={styles.radioTitle}>
                                Cash on Delivery
                            </Text>
                        </View>
                    </ScrollView>

                    {/* Bottom buttons */}
                    <View style={styles.addToCart}>
                        <View style={styles.cancel}>
                            <TouchableHighlight
                                style={styles.checkout}
                                activeOpacity={4}
                                underlayColor="#DDDDDD"
                                onPress={() => setVisibility(false)}
                            >
                                <Text style={styles.text}>GO BACK</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.confirm}>
                            <TouchableHighlight
                                style={styles.checkout}
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => setVisibility(false)}
                            >
                                <Text
                                    style={styles.text}
                                    onPress={() => setShowSuccess(true)}
                                >
                                    PLACE ORDER
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
