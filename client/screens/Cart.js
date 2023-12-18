import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ToastAndroid
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import ProductCart from "../components/ProductCart";
import { useNavigation } from '@react-navigation/native';
import { getUserToken } from "../context/UserToken";

const Cart = ({ onOrderPlaced }) => {
  const [cartData, setCartData] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const [userNote, setUserNote] = useState();
  const [subTotal, setSubTotal] = useState();
  const [flatListKey, setFlatListKey] = useState(Date.now());
  const navigation = useNavigation();
  const [cartNotice, setCartNotice] = useState(null);



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
          total += (item.quantity * item.price);
        })
        setSubTotal(total);
      } catch (error) {
        setCartNotice("Bạn chưa có sản phầm nào ở giỏ hàng")
      }
    };

    fetchData();
  }, [flatListKey]);

  const handleItemChange = () => {
    setFlatListKey(Date.now());
  };

  const checkOut = async (location, note) => {
    if (cartNotice != null) {
      ToastAndroid.show(
        `Bạn chưa có món ăn nào ở giỏ hàng`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {
      if (!location) {
        ToastAndroid.show(
          `Vui lòng điền địa chỉ giao hàng`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      } else {

        const userToken = await getUserToken();
        await fetch("http://192.168.0.107:8000/user/cart/checkout", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            token: userToken,
          }),
        });
        onOrderPlaced();
        ToastAndroid.show(
          `Đặt hàng thành công, đơn hàng sẽ được giao đến bạn trong vòng 30 đến 45 phút`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );

        // navigation.navigate('Direction')
      }
    }

  };

  return (
    <ScrollView
      className="bg-[#f8f4f4] h-[100%]"
      vertical showsVerticalScrollIndicator={true}
    >
      <View className="mt-4 mx-2">
        {cartData.map((item) => (
          <ProductCart
            key={item.id} // Sử dụng key là name hoặc một trường nào đó duy nhất để đảm bảo sự duy nhất
            data={item}
            onItemChange={handleItemChange}
          />
        ))}
        <Text className="flex-1 text-center mb-4">{cartNotice}</Text>
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
            <Text>{subTotal ? subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ' : ''}</Text>
            <Text>20.000đ</Text>
            <Text>{(subTotal ? subTotal + 20000 : 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'}</Text>
          </View>
        </View>
        <View>
        <TouchableOpacity onPress={() => checkOut(userLocation, userNote)}>
          <View className="w-[100%] h-[45px] items-center justify-center rounded-full bg-[#c40015] mt-4 mb-20">
            <Text className="text-[#ffffff] text-[16px] font-bold">Đặt giao hàng</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;
