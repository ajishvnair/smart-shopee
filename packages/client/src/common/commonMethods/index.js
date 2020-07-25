import { AsyncStorage } from "react-native";

export const get = async (key, convertToJSON = true) => {
    const item = await AsyncStorage.getItem(key);
    return convertToJSON ? JSON.parse(item) : item;
};

// check availability of a product
export const checkAvailability = (startTime, endTime) => {
    if (
        startTime &&
        endTime &&
        startTime !== "" &&
        endTime !== "" &&
        startTime !== "undefined" &&
        endTime !== "undefined"
    ) {
        const date = new Date();
        // return `${currentTime.getHours()} : ${currentTime.getMinutes()}`;
        const currentTime = `${date.getHours()} : ${date.getMinutes()}`;
        const startTimes = startTime.split(":");
        const endTimes = endTime.split(":");
        if (startTimes[0] < date.getHours() < endTimes[0]) {
            if (startTimes[1] < date.getMinutes() < endTimes[1]) {
                return true;
            }
            return false;
        }
        return false;
    }
    return true;
};
