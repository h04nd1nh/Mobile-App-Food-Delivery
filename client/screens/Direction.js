import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import BottomSheetLayout from "../components/BottomSheetLayout";
import { getUserToken } from "../context/UserToken"



import Home from "./Home";
import Menu from "./Menu";
import Order from "./Order";
import Details from "./Details";
import Cart from "./Cart";


const homeName = "Trang chủ";
const menuName = "Thực đơn";
const orderName = "Đơn hàng";
const detailName = "Xem thêm";

const Tab = createBottomTabNavigator();


const Direction = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState();

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const navigation = useNavigation();

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
          const userCartQuantity = await fetch(
            `http://192.168.0.107:8000/user/cart/quantity?token=${encodeURIComponent(userToken)}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json",
              },
            }
          );
          const data = await userCartQuantity.json();
          setCartQuantity(data.quantity);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <TailwindProvider>
        <Tab.Navigator 
          initialRouteName={homeName}
          screenOptions={
            
            ({route}) => ({
                tabBarLabelStyle: {
                    textTransform: 'none', // Chữ không viết hoa
                    fontWeight: 'bold', // Chữ đậm
                    fontSize: 14,
                },
                tabBarActiveTintColor: '#c40015', // Màu chữ khi tab được chọn
                tabBarInactiveTintColor: 'gray', // Màu chữ khi tab không được chọn
                tabBarIndicatorStyle: {
                    backgroundColor: '#c40015', // Màu của đường viền
                  },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === menuName) {
                    iconName = focused ? 'clipboard' : 'clipboard-outline'
                    } 
                    else if (rn === orderName) {
                        iconName = focused ? 'cart' : 'cart-outline'
                    } else if (rn === detailName) {
                        iconName = focused ? 'menu' : 'menu-outline'
                    }


                return <Icon name={iconName} android="md-add" size={size} color={color}/>
              },
        })}>

          <Tab.Screen name={homeName} component={Home}/>
          <Tab.Screen name={menuName} component={Menu}/>
          <Tab.Screen name={orderName} component={Order}/>
          <Tab.Screen name={detailName} component={Details}/>
          
        </Tab.Navigator>

        <TouchableOpacity className="absolute bottom-[50px] right-0 m-5 bg-[#c40015] w-[100px] h-[50px] rounded-3xl items-center justify-center drop-shadow-2xl" onPress={openBottomSheet}>
          <View className="flex-row">
            <Icon  name="cart" android="md-add" size={30}  color="#fff"/>
            <View className="w-[30px] h-[30px] bg-white items-center justify-center rounded-full mx-2">
              <Text className="text-[18px] font-extrabold">{cartQuantity}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <BottomSheetLayout isVisible={bottomSheetVisible} onClose={closeBottomSheet} content={<Cart/>} title={"Thanh toán đơn hàng"} />
    </TailwindProvider>
  );
}

export default Direction

