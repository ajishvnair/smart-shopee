// import React, { useRef, useState } from "react";
// import { View, Text, Button, TextInput } from "react-native";
// import firebase from "firebase";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { firebaseConfig } from "../../../config";
// import { set } from "react-native-reanimated";

// export default function ({ setAuthenticated }) {
//     const [otp, setOtp] = useState("");
//     const [verificationId, setVerificationId] = useState(null);
//     const recaptchaVerifier = React.useRef(null);
//     const handleClick = async () => {
//         const phoneProvider = new firebase.auth.PhoneAuthProvider();
//         const verificationId = await phoneProvider.verifyPhoneNumber(
//             "+919656565944",
//             recaptchaVerifier.current
//         );
//         setVerificationId(verificationId);
//     };

//     const handleCheck = async () => {
//         const credential = firebase.auth.PhoneAuthProvider.credential(
//             verificationId,
//             otp
//         );
//         await firebase.auth().signInWithCredential(credential);
//         setAuthenticated(true);
//     };
//     return (
//         <View>
//             <FirebaseRecaptchaVerifierModal
//                 ref={recaptchaVerifier}
//                 firebaseConfig={firebaseConfig}
//             />
//             <Text>Login</Text>
//             <Button title="Click" onPress={handleClick} />
//             <TextInput
//                 keyboardType="numeric"
//                 onChangeText={(text) => setOtp(text)}
//             />
//             <Button title="Check" onPress={handleCheck} />
//         </View>
//     );
// }
