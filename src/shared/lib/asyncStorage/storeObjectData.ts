import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreObjectDataProps = {
  key: string;
  value: string[];
};

export const storeObjectData = async ({value, key}: StoreObjectDataProps) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
    // saving error
  }
};
