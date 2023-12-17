import { Text, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { getUserToken } from "../context/UserToken";


const ProductTitle = ({ data }) => {
 
  const productId = data._id.toString();
  const productName = data.name; // Tên sản phẩm
  const productTitle = data.title; // Tiêu đề sản phẩm
  const productImage = data.image; // Đường dẫn hình ảnh sản phẩm
  const productPrice = data.price_primary; // Giá chính của sản phẩm
  // (Tùy chọn) Thông tin về biến thay đổi (variation)
  const variationName = data.variation_name; // Tên loại biến thay đổi
  const variations = data.variations;

  const [productCount, setProductCount] = useState(1);

  const handleIncrement = () => {
    setProductCount(productCount + 1);
  };

  const handleDecrement = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };



  const [optionSelected, setoptionSelected] = useState('');
  const resolvedImageSource = typeof productImage === 'string' ? { uri: productImage } : productImage;

  const updateCart = async () => {
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
              itemId: productId,
              itemName: productName,
              quantity: productCount,
              price: productPrice,
              variation: optionSelected,
            },
          ],
        }),
      });
      
      ToastAndroid.show(
        `Đã thêm ${data.name} vào giỏ hàng`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  

  return (
    <View >
      <Image source={resolvedImageSource} className="w-[100%] h-[300px]" />

      <View className="p-5">
        <View className="flex-row mb-6">
          <Text className="text-[#c40015] text-[20px] font-black">{productName}</Text>
          <Text className="text-[#000000] text-[20px] font-black absolute right-0">{productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
        </View>

        <Text className="text-[#000000] text-[16px] mb-10">{productTitle}</Text>

        <View>
          <Text className="text-[16px] font-black">{variationName}</Text>
          <View>
            {variations.map((item) => (
              <View key={item} className="flex-row justify-between my-2">
                <Text className="text-[#000000] text-[16px] ">{item.option}</Text>
                <Text className="text-[#000000] text-[16px] mr-[50px]">(+{item.prices_add}đ/phần)</Text>
                {item.option && (
                  <TouchableOpacity
                    className="w-[20px] h-[20px] border-[2px] rounded-full justify-center items-center"
                    onPress={() => setoptionSelected(item.option)}
                  >
                    {optionSelected == item.option && <View className="w-[12px] h-[12px] bg-[#c40015] rounded-full"></View>}
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="bg-[] w-[100%] h-[110px] border-t border-[#c7c4c4] items-center  ">
        <View className="flex-1 flex-row flex-wrap justify-between mt-3">
          <View>
            <View className="flex-row absolute right-[70px]">
              <TouchableOpacity className="bg-[#e6dddd] w-[33px] h-[30px] rounded-l-full items-center justify-center" onPress={handleDecrement}>
                <Text className="text-[20px] font-bold">-</Text>
              </TouchableOpacity >
              <View className="bg-white text-[20px] w-[33px] h-[30px] items-center border-[1px] border-[#e6dddd]">
                <Text className=" text-[20px] font-bold">{productCount}</Text>
              </View>
              <TouchableOpacity className="bg-[#e6dddd] w-[33px] h-[30px] rounded-r-full items-center justify-center" onPress={handleIncrement}>
                <Text className="text-[20px] ">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row absolute left-0">
            <Text className="text-[#000000] text-[16px] mr-2 mt-[2px]">Tổng cộng:</Text>
            <Text className="text-[#c40015] text-[20px] font-black">{(productPrice * productCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
          </View>
        </View>

        <TouchableOpacity className="mb-2" onPress={updateCart}>
          <View className="w-[350px] h-[45px] items-center justify-center rounded-full bg-[#c40015]">
            <Text className="text-[#ffffff] text-[16px] font-bold">Thêm vào giỏ hàng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductTitle
