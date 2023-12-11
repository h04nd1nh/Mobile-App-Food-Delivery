import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthService = {
  authenticateUser: async (phone, password) => {
    try {
      const response = await fetch('http://192.168.0.107:8000/user/login', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const userToken = data.token;
  
        // Save token to AsyncStorage
        await AsyncStorage.setItem('userToken', userToken);

        return true; // Login successful
      } else {
        return false; // Login failed
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },
};




export default AuthService;
