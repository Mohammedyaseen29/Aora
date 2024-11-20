import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '../../lib/useAppwrite';
import Videocard from '../../components/videocard';
import SearchComponent from '../../components/searchcomponent';
import EmptyState from '../../components/EmptyState';
import { useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getUserPost, signOut } from '../../lib/appwrite';
import { icons, images } from '../../constants';
import InfoBox from '../../components/InfoBox';

const Profile = () => {
    const { user, setuser, setloggedIn } = useGlobalContext();
    const {data} = useAppwrite(()=>getUserPost(user.$id));

    const logOut = async()=>{
        await signOut();
        setuser(null);
        setloggedIn(false);
        router.replace('/sign-in')
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
            data={data}
            keyExtractor={(item)=>item.$id}
            renderItem={({item})=><Videocard videos={item}/>}
            ListHeaderComponent={()=>(
                <View className="mt-12 mb-12 px-4 w-full justify-center items-center">
                    <TouchableOpacity className="w-full items-end" onPress={logOut}>
                        <Image source={icons.logout} resizeMode='contain' className="w-6 h-6"/>
                    </TouchableOpacity>
                    <View className="w-16 h-16 border border-yellow-600 rounded-lg justify-center items-center">
                        <Image source={{uri:user?.Avatar}} className="rounded-lg w-[90%] h-[90%]"/>
                    </View>
                    <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />
                    <View className="mt-5 flex-row">
                        <InfoBox title={data.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />
                        <InfoBox title="1.3k" subtitle="Followers" titleStyles="text-xl" />
                    </View>
                    
                </View>
            )}
            ListEmptyComponent={()=>(
                <View>
                    <EmptyState title="No videos Found" subtitle="No videos Found for the Query"/>
                </View>
            )}
            />
        </SafeAreaView>
    )
}

export default Profile;
