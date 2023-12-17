import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';

const Signup = () => {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigation = useNavigation();

  const signupHandler = async () => {
    if (!phone || !firstName || !lastName || !email || !password || !rePassword) {
      ToastAndroid.show(
        `Vui lòng nhập đầy đủ thông tin`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else if (password != rePassword) {
      ToastAndroid.show(
        `Hai mật khẩu không giống nhau`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {
      const response = await fetch("http://192.168.0.107:8000/user/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }),
      });

      if (response.ok) {
        ToastAndroid.show(
          `Đăng kí thành công`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
  
        navigation.navigate('Welcome');
      } else {
        ToastAndroid.show(
          `Số điện thoại đăng kí đã được sử dụng`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
      

    }
  }

  return (

    <KeyboardAvoidingView behavior="padding">
      <View className="flex mx-4 space-y-4 mt-4">
        <Text className="mb-0 text-[15px]">Số điện thoại</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập số điện thoại của bạn" onChangeText={(text) => setPhone(text)} />
        </View>

        <Text className="mb-0 text-[15px]">Họ</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập họ của bạn" onChangeText={(text) => setFirstName(text)} />
        </View>

        <Text className="mb-0 text-[15px]">Tên</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập tên của bạn" onChangeText={(text) => setLastName(text)} />
        </View>

        <Text className="mb-0 text-[15px]">Email</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập email của bạn" onChangeText={(text) => setEmail(text)} />
        </View>

        <Text className="mb-0 text-[15px]">Mật khẩu</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập mật khẩu" secureTextEntry onChangeText={(text) => setPassword(text)} />
        </View>

        <Text className="mb-0 text-[15px]">Nhập lại Mật khẩu</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập lại mật khẩu" secureTextEntry onChangeText={(text) => setRePassword(text)} />
        </View>
        <TouchableOpacity onPress={signupHandler}>
          <View className="w-[100%] h-[45px] items-center justify-center rounded-full bg-[#c40015] mt-6">
            <Text className="text-[#ffffff] text-[16px] font-bold">Đăng kí tài khoản</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup;

