import { Image, Text, TextInput, View, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderCard from '../components/OrderCard';
import orderData from '../data/Order.json'
import  { getUserToken }  from '../context/UserToken';

const Order = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[]);


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
          setUserData(user)

          const orderData = await fetch(`http://192.168.0.107:8000/user/order?token=${encodeURIComponent(userToken)}`, {
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          });
          const order = await orderData.json();
          setOrderData(order);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []); // Thực hiện một lần khi component được mount

  return (
    <SafeAreaView>
      <View className="flex-1 mx-5 mt-5">
        <Text className="text-[15px] ">Đơn hàng của</Text>
        <Text className="text-[25px] font-black">{userData.firstName}</Text>
      </View>

      <View className="mt-10 items-center">
        <FlatList
          data={orderData} 
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <OrderCard
              OrderID={item.orderId}
              time={item.time}
              OrderStatus={item.orderStatus}
              data={item.items}
            />
          )}
        />
      </View>

      <View className="items-center justify-center">
        <Text className="text-[15px]">Bạn đã xem hết danh sách</Text>
      </View>
    </SafeAreaView>
  )
}

export default Order

