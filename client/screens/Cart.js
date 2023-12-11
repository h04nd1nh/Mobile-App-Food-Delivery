import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react';
import ProductCart from '../components/ProductCart';
import  { getUserToken }  from '../context/UserToken';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get user by token
        const userToken = await getUserToken();
        const userCart = await fetch(`http://192.168.0.107:8000/user/cart?token=${encodeURIComponent(userToken)}`, 
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        });
        const data = await userCart.json();
        setCartData(data)
        
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
        renderItem={({ item }) => (
          <ProductCart data={item}/>
        )}
      />
    </View>
  )
}

export default Cart

