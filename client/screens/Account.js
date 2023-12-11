import { Image, Text, TextInput, View } from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
const Account = () => {

  const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[]);

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  )
}

export default Account

