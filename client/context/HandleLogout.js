import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const HandleLogout = () => {

    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
          // Perform logout actions here, such as clearing tokens, resetting state, etc.
    
          // For simplicity, let's assume you clear a token using AsyncStorage.
          await AsyncStorage.removeItem('token'); // Remove token from storage
    
          // Navigate to the LoginScreen after logout.
          navigation.navigate('Welcome');
        } catch (error) {
          // Handle errors, if any.
          console.error('Error during logout:', error.message);
        }
      };
}

export default HandleLogout