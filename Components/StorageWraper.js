import AsyncStorage from '@react-native-async-storage/async-storage';
export async function setValue(key, value) {
    try {
        var jsonOfItem = await AsyncStorage.setItem(key, value);
        console.log("jsonOfItem", jsonOfItem)
        return 'true';
    } catch (error) {
        console.warn('error while saving ' + error);
        return 'false';
    }
}

export async function getValue(key) {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value !== null) {
            console.log("value", value)
            return value
        }
        else {
            console.log("read data error")
        }


    } catch (error) {
        return '';
    }
}
export async function removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) { }
}
export async function clearValues() {
    try {
        await AsyncStorage.clear();
    } catch (error) { }
}