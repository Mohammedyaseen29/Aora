import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import Trending from '../../components/trending';
import EmptyState from '../../components/EmptyState';
import { useAppwrite } from '../../lib/useAppwrite';
import { getLatest, getPosts } from '../../lib/appwrite';
import Videocard from '../../components/videocard';
import SearchComponent from '../../components/searchcomponent';
import { useGlobalContext } from '../../context/GlobalProvider';




const home = () => {
    const [refreshing, setrefreshing] = useState(false);
    const {data:posts , refetch} = useAppwrite(getPosts);
    const {data:latestPosts} = useAppwrite(getLatest);
    const {user,setuser} = useGlobalContext();
    const onRefresh = async()=>{
        setrefreshing(true);
        // fetch the new data from the server
        await refetch();
        setrefreshing(false);
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
            data={posts}
            keyExtractor={(item)=>item.$id}
            renderItem={({ item }) => <Videocard videos={item}/>}
            ListHeaderComponent={()=>(
                <View className="my-6 px-4 space-y-6">
                    <View className="flex-row items-start justify-between">
                        <View className="mb-6">
                            <Text className="font-medium text-sm text-gray-400">Welcome Back</Text>
                            <Text className="text-white text-2xl font-semibold">{user?.username}</Text>
                        </View>
                        <View className="mt-1.5">
                            <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain'/>
                        </View>
                    </View>
                    <SearchComponent/>
                    <View className="">
                        <Text className="text-gray-300">Latest Videos</Text>
                        <Trending posts = {latestPosts ?? []}/>
                    </View>
                </View>
            )}
            ListEmptyComponent={()=>(
                <View>
                    <EmptyState title="No videos Found" subtitle="Be the first one to uploading a video"/>
                </View>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </SafeAreaView>
    );
}

export default home

const styles = StyleSheet.create({})