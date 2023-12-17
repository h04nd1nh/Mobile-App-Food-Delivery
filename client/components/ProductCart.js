import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserToken } from "../context/UserToken";

const ProductCart = ({ data, onItemChange }) => {
    // const [productQ, setProductQ] = useState();
    // setProductQ(data.quantity)
    const handleIncrement = () => {
        updateCart(1)
    };
    const variation  = data.variation ? data.variation : data.name;
    const handleDecrement = () => {
        if (data.quantity > 1) {
            updateCart(-1)
        }
    };

    const delIncrement = () => {
        updateCart(-data.quantity);
    };


    const updateCart = async (quantity) => {
        const userToken = await getUserToken();
    
        try {
          await fetch("http://192.168.0.107:8000/user/cart/update", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              token: userToken,
              item: [
                {
                  itemId: data._id,
                  itemName: data.name,
                  quantity: quantity,
                  price: data.price,
                  variation: data.variation,
                },
              ],
            }),
          });
          onItemChange();
          // Xử lý response ở đây nếu cần
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    return (
        <View className="flex-row justify-between w-[100%] h-[140px] border-b-2 border-[#dbd6d6]   mb-4  px-4">
            <View className="flex-col">
                <Text className="text-[18px] text-[#000000] font-bold">{data.name}</Text>
                <Text className="text-[15px] text-[#9b9494] mb-2">{variation}</Text>

                <View className="flex-row mb-2">
                    <TouchableOpacity
                        className="bg-[#e6dddd] w-[33px] h-[30px] rounded-l-full items-center justify-center"
                        onPress={handleDecrement}
                    >
                        <Text className="text-[20px] font-bold">-</Text>
                    </TouchableOpacity>
                    <View className="bg-white text-[20px] w-[33px] h-[30px] items-center border-[1px] border-[#e6dddd]">
                        <Text className=" text-[20px] font-bold">{data.quantity}</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-[#e6dddd] w-[33px] h-[30px] rounded-r-full items-center justify-center"
                        onPress={handleIncrement}
                    >
                        <Text className="text-[20px] ">+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className="w-[60px] h-[30px] rounded-full items-center justify-center border-[1px] border-[#c40015]"
                    onPress={delIncrement}
                >
                    <Text>Xoá</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-[20px] text-[#000000] font-bold">{(data.quantity*data.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
        </View>
    );
};

export default ProductCart;
