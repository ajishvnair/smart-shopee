import React from "react";
import { Modal, Text } from "react-native";
import Animation from "lottie-react-native";

import anim from "../../../assets/lottie/success.json";

export default function ({ title, visible, setVisibility }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setVisibility(false);
      }}
    >
      <Animation
        style={{
          width: 80,
          height: 80,
        }}
        loop={true}
        source={anim}
      />
    </Modal>
  );
}
