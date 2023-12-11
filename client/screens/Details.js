import { Image, Text, View, TouchableOpacity} from 'react-native';
import React, { useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Details = () => {
  const navigation = useNavigation();

  const openAccount = () => {
    navigation.navigate('Account');
  };

  const openAbout = () => {
    navigation.navigate('About');
  };

  const openContact = () => {
    navigation.navigate('Contact');
  };


  const handleLogout = async () => {
    try {
      // Perform logout actions here, such as clearing tokens, resetting state, etc.
      // For simplicity, let's assume you clear a token using AsyncStorage.
      await AsyncStorage.removeItem('token'); // Remove token from storage

      // Navigate to the Welcome screen after logout.
      navigation.navigate('Welcome');
    } catch (error) {
      // Handle errors, if any.
      console.error('Error during logout:', error.message);
    }
  };


  

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[]);

  return (
    <SafeAreaView>
      <View className="flex-1 mt-5 mx-5">
        <TouchableOpacity className="border-b-[1px] border-[#dbd6d6]" onPress={openAccount}>
          <Text className="text-[20px] font-bold text-[[#c40015] mb-2 mt-2">Thông tin tài khoản</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b-[1px] border-[#dbd6d6]" onPress={openAbout}>
          <Text className="text-[20px] font-bold text-[[#c40015] mb-2 mt-2">Về chúng tôi</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b-[1px] border-[#dbd6d6]" onPress={openContact}>
          <Text className="text-[20px] font-bold text-[[#c40015] mb-2 mt-2">Liên hệ hỗ trợ</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-b-[1px] border-[#dbd6d6]" onPress={handleLogout}>
          <Text className="text-[20px] font-bold text-[[#c40015] mb-2 mt-2">Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center mt-20">
        <Image source={require('../assets/logo.png')} className="w-[220px] h-[240px] mb-5"/>
        <Text className="text-[20px] font-bold text-[[#c40015]">MANG TỪNG MIẾNG GÀ TƯƠI NGON</Text>
        <Text className="text-[20px] font-bold text-[[#c40015]">ĐẾN GIA ĐÌNH CỦA BẠN</Text>
      </View>
    </SafeAreaView>
  )
}

export default Details

