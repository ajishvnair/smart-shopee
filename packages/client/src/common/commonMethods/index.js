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
        if (
            parseInt(startTimes[0]) <= parseInt(date.getHours()) &&
            parseInt(date.getHours()) <= parseInt(endTimes[0])
        ) {
            if (
                parseInt(startTimes[1]) < parseInt(date.getMinutes()) &&
                parseInt(date.getMinutes()) < parseInt(endTimes[1])
            ) {
                return true;
            }
            return false;
        }
        return false;
    }
    return true;
};
