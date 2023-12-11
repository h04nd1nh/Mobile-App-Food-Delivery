import { Image, Text, TextInput, View, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '../components/Category';



const Menu = () => {

  const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[]);

    const [categoryData, setcategoryData] = useState([]);

  useLayoutEffect(() => {
    // Your navigation options
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.107:8000/category", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        });
        const data = await response.json();
        setcategoryData(data); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Thực hiện một lần khi component được mount

  return (
    <SafeAreaView className="mt-5 mx-[5%]">
      <ScrollView
            vertical showsVerticalScrollIndicator={false}
      >
        {categoryData.map((item) => (
            <Category
              id={item}
            />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Menu

