import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Animatable from "react-native-animatable";
import { useState } from 'react';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
    0:{
        scale:0.9
    },
    1:{
        scale:1
    }
}
const zoomOut = {
    0:{
        scale:1
    },
    1:{
        scale:0.9
    }
}

const TrendingItem = ({activeItem,item})=>{
    const [play, setplay] = useState(false);
    return (
        <Animatable.View className="mr-5" animation={activeItem  === item.$id ? zoomIn : zoomOut} duration={500}>
            {play ? <Video source={{uri:item.videos}} resizeMode={ResizeMode.CONTAIN} className="w-52 h-72 rounded-3xl mt-3 bg-white/10"
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status)=>{
                    if(status.didJustFinish){
                        setplay(false);
                    }
                }}
            /> : (  
                <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={()=>setplay(true)}>
                    <ImageBackground source={{uri:item.thumbnail}} className="w-52 h-72 rounded-3xl shadow-lg shadow-black/40 overflow-hidden my-5" resizeMode='cover'/>
                    <Image source={icons.play} resizeMode='contain' className="w-12 h-12 absolute"/>
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
}
const Trending = ({posts}) => {
    const [ActivePosts, setActivePosts] = useState(posts[0]);
    const viewableItemsChanged = ({viewableItems})=>{
        if(viewableItems.length > 0){
            setActivePosts(viewableItems[0].key);
        }
    }
    return (
        <FlatList 
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
            <TrendingItem activeItem = {ActivePosts} item={item}/>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold:70}}
        contentOffset={{x:170}}
        horizontal
        />
    )
}

export default Trending

const styles = StyleSheet.create({})