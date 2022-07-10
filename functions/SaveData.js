import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLevel = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value + "");
  } catch (e) {
    console.log(e);
  }
};

export const saveScore = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value + "");
  } catch (e) {
    console.log(e);
  }
};
