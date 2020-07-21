import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

// import SplashScreen from "./splash";
import MainScreen from "./main";

function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default function () {
    const [showImage, setShowImage] = useState(false);

    const _loadAssetsAsync = async () => {
        const imageAssets = cacheImages([require("../../../assets/bg.jpg")]);
        await Promise.all([...imageAssets]);
    };

    return !showImage ? (
        <AppLoading
            startAsync={_loadAssetsAsync}
            onFinish={() => setShowImage(true)}
            onError={console.warn}
        />
    ) : (
        <MainScreen />
    );
}
