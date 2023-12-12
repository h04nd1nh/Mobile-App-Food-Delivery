import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import ProductCart from "../components/ProductCart";
import { getUserToken } from "../context/UserToken";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const [userNote, setUserNote] = useState();
  const [subTotal, setSubTotal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get user by token
        const userToken = await getUserToken();
        const userCart = await fetch(
          `http://192.168.0.107:8000/user/cart?token=${encodeURIComponent(userToken)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
          }
        );
        const data = await userCart.json();
        setCartData(data);

        var total = 0;
        data.forEach((item) => {
          total += (item.quantity*item.price);
        })
        setSubTotal(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="mt-4 mx-2">
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id} // Sử dụng key là name hoặc một trường nào đó duy nhất để đảm bảo sự duy nhất
        renderItem={({ item }) => <ProductCart data={item} />}
      />
      <Text className="mb-2">Giao hàng đến</Text>
      <View className="bg-black/5 p-3 rounded-lg w-full mb-4">
        <TextInput
          placeholder="Nhập địa chỉ giao hàng"
          value={userLocation}
          onChangeText={(text) => setUserLocation(text)}
        />
      </View>
      <Text className="mb-2">Ghi chú</Text>
      <View className="bg-black/5 p-3 rounded-lg w-full mb-4">
        <TextInput
          placeholder="Nhập ghi chú"
          value={userNote}
          onChangeText={(text) => setUserNote(text)}
        />
      </View>
      <Text className="text-[18px] text-[#000000] font-bold">Tổng cộng</Text>
      <View className="flex-row justify-between">
        <View>
          <Text>Tổng tạm tính</Text>
          <Text>Phí giao hàng</Text>
          <Text>Tổng thanh toán</Text>
        </View>
        <View>
          <Text>{subTotal}đ</Text>
          <Text>20.000đ</Text>
          <Text>{(subTotal + 20000)}đ</Text>
        </View>
      </View>
      <TouchableOpacity >
        <View className="w-[100%] h-[45px] items-center justify-center rounded-full bg-[#c40015] mt-4">
          <Text className="text-[#ffffff] text-[16px] font-bold">Đặt giao hàng</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
