import React from 'react';
import { View, Modal, Text , TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomSheetLayout = ({ isVisible, onClose, content, title }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="">
        <View className="bg-[white] h-[50px]">
          <TouchableOpacity onPress={onClose} className="flex-row items-center ml-3 mt-3">
            <Icon name="arrow-back" android="md-add" size={30}  color="#000"/>
            <Text className="text-[20px] font-black ml-3">{title}</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-[#f8f4f4] h-[100%]">
            {content}
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetLayout;