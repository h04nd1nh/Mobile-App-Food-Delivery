import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
const Signup = () => {
  return (

    <KeyboardAvoidingView behavior="padding">
      <View className="flex mx-4 space-y-4 mt-4">
        <Text className="mb-0 text-[15px]">Số điện thoại</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập số điện thoại của bạn"/>
        </View>

        <Text className="mb-0 text-[15px]">Tên</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập số điện thoại của bạn"/>
        </View>

        <Text className="mb-0 text-[15px]">Họ</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập số điện thoại của bạn"/>
        </View>

        <Text className="mb-0 text-[15px]">Email</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập số điện thoại của bạn"/>
        </View>

        <Text className="mb-0 text-[15px]">Mật khẩu</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập mật khẩu" secureTextEntry/>
        </View>

        <Text className="mb-0 text-[15px]">Nhập lại Mật khẩu</Text>
        <View className="bg-black/5 p-3 rounded-lg w-full">
          <TextInput placeholder="Nhập mật khẩu" secureTextEntry/>
        </View>
        <TouchableOpacity>
          <View className="w-[100%] h-[45px] items-center justify-center rounded-full bg-[#c40015] mt-6">
            <Text className="text-[#ffffff] text-[16px] font-bold">Đăng nhập</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup;

