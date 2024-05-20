import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreStringDataProps = {
  key: string;
  value: string;
};

export const storeStringData = async ({key, value}: StoreStringDataProps) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};
