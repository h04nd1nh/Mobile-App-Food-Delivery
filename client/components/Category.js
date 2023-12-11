import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheetLayout from "./BottomSheetLayout";
import ProductCard from "./ProductCard";


const Category = ({ id }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.107:8000/food", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        setProductData(data); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Thực hiện một lần khi component được mount

  const categoryName = id.name;
  const listProduct = id.productIds;

  // Thực hiện add list product vào filteredProducts
  const filteredProducts =
    listProduct.length > 0
      ? productData.filter((item) => listProduct.includes(item._id))
      : productData;

  return (
    <View>
      <Text className="text-[18px] font-black mb-3">{categoryName}</Text>
      <View className="flex-1 flex-row flex-wrap justify-between">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item._id.toString()}
            imageSource={item.image} // Assuming item.image is the correct path
            productName={item.name}
            price={`${item.price_primary} đ`}
            data={item}
            area="menuView"
          />
        ))}
      </View>
    </View>
  );
};

export default Category;
