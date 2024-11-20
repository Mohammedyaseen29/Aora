import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '../constants'
import { useState } from 'react'
import { ResizeMode, Video } from 'expo-av'

const Videocard = ({videos:{title,thumbnail,videos,creator:{username,Avatar}}}) => {
    const [play, setplay] = useState(false);
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-yellow-600 justify-center items-center p-0.5">
                            <Image source={{uri:Avatar}} resizeMode='cover' className="w-full h-full rounded-lg"/>
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-semibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-xs text-gray-100 font-regular" numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
            </View>
            {play ? (<Video source={{uri:videos}} resizeMode={ResizeMode.CONTAIN} className="w-full h-60 relative mt-3 rounded-3xl justify-center items-center bg-white/10"
                shouldPlay
                useNativeControls
                onPlaybackStatusUpdate={(status)=>{
                    if(status.didJustFinish){
                        setplay(false);
                    }
                }}
            />) :(
                <TouchableOpacity className="w-full h-60 relative mt-3 rounded-xl justify-center items-center" activeOpacity={0.7} onPress={()=>setplay(true)}>
                    <Image source={{uri:thumbnail}} className="w-full h-full rounded-xl mt-3" resizeMode='cover'/>
                    <Image source={icons.play} className="absolute w-12 h-12" resizeMode='contain'/>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Videocard