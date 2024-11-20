import {Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { icons} from '../constants';

const Formfield = ({title,value,otherStyle,placeholder,handleChange,...props}) => {
    const [showPassword, setshowPassword] = useState(false);
    return (
        <View className={`space-y-2 ${otherStyle}`}>
            <Text className='text-gray-100 text-base font-medium'>{title}</Text>
            <View className='w-full rounded-2xl h-16 px-4 bg-black-100 border-black-200 border-2 flex-row focus:border-yellow-600 items-center'>
                <TextInput className='flex-1 text-white font-semibold text-base' value={value} placeholder={placeholder} placeholderTextColor='#7b7b8b' onChangeText={handleChange} secureTextEntry={title === "Password" && !showPassword} />
                {title === 'Password' && (
                    <TouchableOpacity onPress={()=>setshowPassword(()=>!showPassword)}>
                        <Image source={!showPassword ? icons.eye :icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Formfield
