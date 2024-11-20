import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GlobalContextProvider } from '../context/GlobalProvider';

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    // Prevent the splash screen from auto-hiding initially
    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, []);

    useEffect(() => {
        if (error) {
            console.error("Font loading error: ", error);
            // Optionally show some error UI
        }
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    // Render nothing until fonts are loaded
    if (!fontsLoaded) {
        return null;
    }

    return (
        <GlobalContextProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
            </Stack>
        </GlobalContextProvider>
    );
};

export default RootLayout;
