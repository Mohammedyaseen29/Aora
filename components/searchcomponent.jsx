import React from 'react';
import { StyleSheet, TouchableOpacity, View ,Image, Alert} from 'react-native';
import { icons, images } from '../constants';
import { TextInput } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
const SearchComponent = ({initialQuery}) => {
    const pathname = usePathname();
    const [query, setquery] = useState(initialQuery || "");
    return (
    <View className="w-full rounded-2xl h-16 px-4 bg-slate-800 flex-row focus:border-yellow-600 items-center">
        <TextInput className='flex-1 text-white font-regular text-base mt-1.5' value={query} placeholder='Search for a video topic' placeholderTextColor='#7b7b8b' onChangeText={(e)=>setquery(e)}/>
        <TouchableOpacity onPress={()=>{
            if(!query){
                return Alert.alert("Missing Search!","Please enter title to search");
            }
            if(pathname.startsWith('/search')){
                router.setParams({query})
            }
            else{
                router.push(`/search/${query}`)
            }
        }}> 
            <Image source={icons.search} className="w-5 h-5" resizeMode='contain'/>
        </TouchableOpacity>
    </View>
    );
}


export default SearchComponent;
