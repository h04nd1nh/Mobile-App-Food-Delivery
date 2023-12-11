import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const images = [
  '../assets/banner/banner1.png',
  '../assets/banner/banner2.png',
];

const SlideShow = () => {
  return (
    <Swiper showsButtons={false}>
        <View key="1" className="flex-1 justify-center">
          <Image source={require('../assets/banner/banner1.png')} className="w-[400px] h-[100%]" />
        </View>
        <View key="2" className="flex-1 justify-center">
          <Image source={require('../assets/banner/banner2.png')} className="w-[400px] h-[100%]" />
        </View>
    </Swiper>
  );
};


export default SlideShow;