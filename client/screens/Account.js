import { Text, TextInput, View, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { getUserToken } from '../context/UserToken';

const Account = () => {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    })
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get user by token
        const userToken = await getUserToken();
        const userData = await fetch(`http://192.168.0.107:8000/user?token=${encodeURIComponent(userToken)}`,
          {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          });
        const user = await userData.json();
        setPhone(user.phone);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const changeHandler = async () => {
    const userToken = await getUserToken();
    if (!phone || !email || !firstName || !lastName) {
      ToastAndroid.show(
        `Vui lòng điền đầy đủ các trường`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {

      await fetch(`http://192.168.0.107:8000/user?token=${encodeURIComponent(userToken)}`,
        {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            email: email,
          }),
        });

        ToastAndroid.show(
          `Thay đổi thông tin thành công`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <View className="flex mx-4 space-y-4 mt-4">
          <Text className="mb-0 text-[15px]">Số điện thoại</Text>
          <View className="bg-black/5 p-3 rounded-lg w-full">
            <TextInput value={phone} onChangeText={(text) => setPhone(text)} />
          </View>

          <Text className="mb-0 text-[15px]">Họ</Text>
          <View className="bg-black/5 p-3 rounded-lg w-full">
            <TextInput value={firstName} onChangeText={(text) => setFirstName(text)} />
          </View>

          <Text className="mb-0 text-[15px]">Tên</Text>
          <View className="bg-black/5 p-3 rounded-lg w-full">
            <TextInput value={lastName} onChangeText={(text) => setLastName(text)} />
          </View>

          <Text className="mb-0 text-[15px]">Email</Text>
          <View className="bg-black/5 p-3 rounded-lg w-full">
            <TextInput value={email} onChangeText={(text) => setEmail(text)} />
          </View>

          <TouchableOpacity onPress={changeHandler}>
            <View className="w-[100%] h-[45px] items-center justify-center rounded-full bg-[#c40015] mt-6">
              <Text className="text-[#ffffff] text-[16px] font-bold">Thay đổi thông tin tài khoản</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Account

