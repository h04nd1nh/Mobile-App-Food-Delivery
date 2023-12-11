import { Image, Text, View, TouchableOpacity, Platform } from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import COLORS from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Login from './Login';
import Signup from './Signup';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const Welcome = () => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [initialTab, setInitialTab] = useState('Đăng nhập');

    const openBottomSheet = (tab) => {
        setInitialTab(tab);
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

    return (
        <SafeAreaView className="bg-[#c40015] flex-1 relative">
            
            <View className="flex-1 relative items-center justify-center">
               <Image source={require('../assets/logo.png')} className="w-[200px] h-[auto]"/>

               <View className="absolute bottom-20 items-center justify-center">
                    <TouchableOpacity className="m-[15px]" onPress={() => openBottomSheet('Đăng nhập')}>
                        <View className="w-[360px] h-[45px] items-center justify-center rounded-full bg-[white]">
                            <Text className="text-[#c40015] text-[16px] font-bold">Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openBottomSheet('Đăng kí')}>
                        <View className="w-[350px] h-[45px] items-center justify-center rounded-full border-[1px] border-[white] bg-tranparent">
                            <Text className="text-[#ffffff] text-[16px] font-bold">Đăng kí</Text>
                        </View>
                    </TouchableOpacity>
               </View>
            </View>

            <Modal
                isVisible={isBottomSheetVisible}
                onBackdropPress={closeBottomSheet} // Đóng bottom sheet khi nhấn bên ngoài nó
                onBackButtonPress={closeBottomSheet} // Đóng bottom sheet khi nhấn nút back
                className="bg-[white]  m-0 mt-10 rounded-t-2xl"
            >
                {isBottomSheetVisible && (
                    <Tab.Navigator 
                    screenOptions={{
                        tabBarStyle: {
                          backgroundColor: 'rgba(255, 255, 255, 0)',
                          shadowOpacity: 0,
                          elevation: 0,
                        },
                        tabBarLabelStyle: {
                            textTransform: 'none', // Chữ không viết hoa
                            fontWeight: 'bold', // Chữ đậm
                            fontSize: 15,
                          },
                        tabBarActiveTintColor: '#c40015', // Màu chữ khi tab được chọn
                        tabBarInactiveTintColor: 'gray', // Màu chữ khi tab không được chọn
                        tabBarIndicatorStyle: {
                            backgroundColor: '#c40015', // Màu của đường viền
                          },
                        tabBarPressColor: 'transparent',
                      }}
                      initialRouteName={initialTab}>
                        <Tab.Screen name="Đăng nhập" component={Login}/>
                        <Tab.Screen name="Đăng kí" component={Signup} />
                    </Tab.Navigator>)}
            </Modal>

        </SafeAreaView>
    )
}

export default Welcome;
