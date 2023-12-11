import { Image, Text, TextInput, View, ScrollView, SafeAreaView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import  { getUserToken }  from '../context/UserToken';


const Home = () => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
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
        setUserData(user)
        // get product
        const productData = await fetch("http://192.168.0.107:8000/food", 
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        });
        const products = await productData.json();
        setProductData(products); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Thực hiện một lần khi component được mount

  return (
    <SafeAreaView>
      <View className="bg-[#c40015] h-[150px]">
        <View className="flex-row items-center mt-2">
          <View className="w-[35px] h-[35px] items-center justify-center rounded-full bg-[#ffffff] m-2 ml-4">
            <Image
              source={require("../assets/logo.png")}
              className="w-[25px] h-[25px]"
            />
          </View>

          <Text className="text-[#ffffff] text-[20px] font-black">
            Xin chào, {userData.firstName}
          </Text>
        </View>

        <View className="bg-white p-3 rounded-lg w-[370px] m-4">
          <TextInput placeholder="Nhập địa chỉ của bạn" />
        </View>
      </View>
      <View className="flex-1 mt-[5px]">
        <Image
          source={require("../assets/banner/banner1.png")}
          className="w-[420px] h-[200px]"
        />
      </View>
      <View className="ml-3 mt-8">
        <Text className="text-[20px] font-black ml-2">Món ngon phải thử</Text>
        <ScrollView
          horizontal // Đặt thuộc tính horizontal để cho phép cuộn theo chiều ngang
          showsHorizontalScrollIndicator={false}
        >
          {productData.map((item) => (
            <ProductCard
              key={item._id.toString()}
              imageSource={item.image} // Assuming item.image is the correct path
              productName={item.name}
              price={`${item.price_primary} đ`}
              data={item}
              area="homeView"
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
