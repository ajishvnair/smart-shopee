import { AsyncStorage } from "react-native";

export const get = async (key, convertToJSON = true) => {
    const item = await AsyncStorage.getItem(key);
    return convertToJSON ? JSON.parse(item) : item;
};

export const set = async (key, value) => {
    let valueToSave = value;
    try {
        // Sometimes true and false values comes as string, so we are trying to parse it as boolean, if err just skips this
        valueToSave = typeof val === "string" ? JSON.parse(val) : val;
    } catch (err) {}

    // if the valueToSave is a boolean or falsy values don't stringify, store it
    valueToSave =
        typeof valueToSave === "boolean" || !valueToSave
            ? valueToSave
            : JSON.stringify(valueToSave);
    await AsyncStorage.setItem(key, valueToSave);
};

export const unset = async (key) => {
    await AsyncStorage.removeItem(key);
};
