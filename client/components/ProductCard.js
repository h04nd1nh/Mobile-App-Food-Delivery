import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomSheetLayout from './BottomSheetLayout';
import ProductTitle from './ProductTitle';

const ProductCard = ({ imageSource, productName, price, data, area }) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const resolvedImageSource = typeof imageSource === 'string' ? { uri: imageSource } : imageSource;
  const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (area == 'homeView') {
    return (
      <View>
        <TouchableOpacity className="bg-[#fff] border-[1px] border-[#ece0e2]  rounded-lg p-[16px]drop-shadow-md w-[140px] h-[260px] mt-3 mx-2 align-middle items-center" onPress={openBottomSheet}>

          <Image
            source={resolvedImageSource}
            className="w-[139px] h-[139px] object-cover rounded-t-lg" />
          <Text className="text-[20px] text-[#c40015] font-bold mx-1 text-center mt-1">{productName}</Text>
          <Text className="text-[20px] text-[#000000] font-black absolute bottom-4">{formattedPrice}</Text>
        </TouchableOpacity>

        <BottomSheetLayout isVisible={bottomSheetVisible} onClose={closeBottomSheet} content={<ProductTitle data={data} />} title={"Chi tiết phần ăn"} />
      </View>
    );
  } else if (area === 'menuView') {
    return (
      <View>
        <TouchableOpacity className="bg-[#fff] border-[1px] border-[#ece0e2]  rounded-lg p-[16px]drop-shadow-md w-[180px] h-[170px] mb-3" onPress={openBottomSheet}>

          <Image
            source={resolvedImageSource}
            className="w-[99px] h-[99px] object-cover rounded-t-lg self-center" />
          <Text className="text-[13px] text-[#c40015] font-bold relative left-3  mt-1">{productName}</Text>
          <Text className="text-[20px] text-[#000000] font-black relative left-3 top-2">{formattedPrice}</Text>
        </TouchableOpacity>

        <BottomSheetLayout isVisible={bottomSheetVisible} onClose={closeBottomSheet} content={<ProductTitle data={data} />} title={"Chi tiết phần ăn"} />
      </View>
    );
  }
};


export default ProductCard;