import AsyncStorage from '@react-native-community/async-storage';

const getItem = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await AsyncStorage.getItem(key);
      resolve(JSON.parse(data));
    } catch (e) {
      reject(e);
    }
  });
};

const setItem = (key, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      resolve({
        message: 'Successfull',
      });
    } catch (e) {
      reject(e);
    }
  });
};

const asyncStorage = {
  setItem: setItem,
  getItem: getItem,
  clearStorage: AsyncStorage.clear,
  removeItem: AsyncStorage.removeItem,
};

export default asyncStorage;
