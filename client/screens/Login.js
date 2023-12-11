import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import  AuthService  from '../context/AuthService';

const Login = () => {
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginNotice, setLoginNotice] = useState('');
  const navigation = useNavigation();

  const loginHandle = async () => {
    try {
      const success = await AuthService.authenticateUser(phone, password);

      if (success) {
        navigation.navigate('Direction');
      } else {
        setLoginNotice("Thông tin đăng nhập hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.log('Error during login:', error);
      setLoginNotice("Thông tin đăng nhập hoặc mật khẩu không chính xác");
    }
  };

  return (
    <View className="flex mx-4 space-y-4 mt-4">
      <Text className="mb-0 text-[15px]">Số điện thoại</Text>
      <View className="bg-black/5 p-3 rounded-lg w-full">
        <TextInput placeholder="Nhập số điện thoại của bạn" value={phone}
          onChangeText={(text) => setPhone(text)}/>
      </View>

      <Text className="mb-0 text-[15px]">Mật khẩu</Text>
      <View className="bg-black/5 p-3 rounded-lg w-full">
        <TextInput placeholder="Nhập mật khẩu" secureTextEntry value={password}
          onChangeText={(text) => setPassword(text)}/>
      </View>

      <TouchableOpacity>
        <Text className="text-[#c40015] text-[15px] font-bold absolute right-0 mt-3">Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={loginHandle}>
        <View className="w-[100%] h-[45px] items-center justify-center rounded-full bg-[#c40015] mt-8">
          <Text className="text-[#ffffff] text-[16px] font-bold">Đăng nhập</Text>
        </View>
      </TouchableOpacity>

        <View className="items-center justify-center">
          <Text className="text-[#c40015] text-[15px] font-bold mt-3">{loginNotice}</Text>
        </View>
      
      
    </View>
  )
}

export default Login