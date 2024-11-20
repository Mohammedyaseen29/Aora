import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAppwrite } from '../../lib/useAppwrite';
import { getPosts, getQueryPost } from '../../lib/appwrite';
import Videocard from '../../components/videocard';
import SearchComponent from '../../components/searchcomponent';
import EmptyState from '../../components/EmptyState';
import { useEffect } from 'react';

const Search = () => {
        const { query } = useLocalSearchParams();
        const {data,refetch} = useAppwrite(()=>getQueryPost(query));

        useEffect(() => {
            refetch();
        }, [query]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
            data={data}
            keyExtractor={(item)=>item.$id}
            renderItem={({item})=><Videocard videos={item}/>}
            ListHeaderComponent={()=>(
                <View className="my-8 px-6">
                    <Text className="font-medium text-sm text-gray-400">Query Result</Text>
                    <Text className="text-white text-2xl font-semibold">{query}</Text>
                    <SearchComponent initialQuery = {query}/>
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

export default Search
