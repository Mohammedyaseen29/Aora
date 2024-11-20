    import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
    import React from "react";


    const CustomButton = ({title,handlePress,containerStyle,isLoading,textStyles}) => {
    return (
        <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        className={`bg-yellow-600 rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50': ''}`}
        >
        <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
            {title}
        </Text>
        </TouchableOpacity>
    );
    };

    export default CustomButton;


