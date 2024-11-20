import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './custombutton'
import { router } from 'expo-router'

const EmptyState = ({title,subtitle}) => {
    return (
        <View className="justify-center items-center">
            <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode='contain' />
            <Text className="text-gray-300 text-sm">{subtitle}</Text>
            <Text className="text-white font-medium text-2xl">{title}</Text>
            <CustomButton title="Create videos" handlePress={()=>router.push('/create')} containerStyle="w-full  my-5"/>
        </View>
    )
}

export default EmptyState