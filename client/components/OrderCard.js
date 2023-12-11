import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({OrderID, time, OrderStatus, data}) => {
  return (
    <TouchableOpacity className="flex-row w-[370px] h-[200px] border-[1px] border-[#dbd6d6] rounded-2xl p-[20px] mb-4">
        <View>
            <View className="mb-2">
                <Text className="text-[15px] text-[#9b9494] font-bold">Đơn hàng</Text>
                <Text className="text-[18px] text-[#000000] font-bold">{OrderID}</Text>
            </View>

            <View className="mb-2">
                <Text className="text-[15px] text-[#9b9494] font-bold">Thời gian giao hàng</Text>
                <Text className="text-[18px] text-[#000000] font-bold">{time}</Text>
            </View>

            <View>
                <Text className="text-[15px] text-[#9b9494] font-bold">Tình trạng đơn hàng</Text>
                <Text className="text-[18px] text-[#c40015] font-bold">{OrderStatus}</Text>
            </View>
        </View>

        <View className="absolute right-5 top-8">
            <Image source={require('../assets/logo.png')} className="w-[120px] h-[130px]"/>
        </View>

    </TouchableOpacity>
  )
}

export default OrderCard

