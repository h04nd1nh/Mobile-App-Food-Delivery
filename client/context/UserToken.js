import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    return userToken;
  } catch (error) {
    console.error('Error retrieving user token:', error);
    throw error;
  }
};

export { getUserToken };