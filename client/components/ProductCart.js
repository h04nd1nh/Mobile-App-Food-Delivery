import { Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const ProductCart = ({data}) => {
    // const [productCount, setProductCount] = useState();
    // setProductCount(data.quantity)
    
    const handleIncrement = () => {
        // setProductCount(productCount + 1);
    };

    const handleDecrement = () => {
        if (productCount > 1) {
            // setProductCount(productCount - 1);
        }
    };

    if (data.variation == null) {
        data.variation = data.name;
    }
    return (
        <View className="flex-row justify-between w-[100%] h-[140px] border-b-2 border-[#dbd6d6]   mb-4  px-4">
            <View className="flex-col">
                <Text className="text-[18px] text-[#000000] font-bold">{data.name}</Text>
                <Text className="text-[15px] text-[#9b9494] mb-2">{data.variation}</Text>

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
                >
                    <Text>Xoá</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-[20px] text-[#000000] font-bold">{data.quantity*data.price}đ</Text>
        </View>
    );
};

export default ProductCart;
