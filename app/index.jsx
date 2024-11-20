import { ScrollView, Text, View,Image } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../constants"
import CustomButton from '../components/custombutton'
import { StatusBar } from 'expo-status-bar'
import { router,Redirect } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'




const index = () => {
    const {isLoading,loggedIn} = useGlobalContext();
    if(!isLoading && loggedIn) return <Redirect href='/home'/>
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className="w-full h-full justify-center items-center px-4">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain'/>
                    <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode='contain'/>
                    <View className="relative mt-5">
                    <Text className="text-3xl text-white font-bold text-center">Discover Endless possibilities with{' '}<Text className="text-yellow-600">Aora</Text></Text>
                    <Image source={images.path} className="w-[106px] h-[25px] absolute -right-7 -bottom-4" resizeMode='contain'/>
                </View>
                <Text className="text-xs text-gray-100 mt-7 text-center font-semibold">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
                    <CustomButton title="Continue with Email" handlePress={()=>{router.push('/sign-in')}} containerStyle="mt-7 w-full"/>
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
    ) 
}

export default index;

