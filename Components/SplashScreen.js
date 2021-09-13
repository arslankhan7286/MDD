import React, { useEffect } from "react";
import { Text, View, TextInput, Button, Image, Animated, StyleSheet } from "react-native";
import { StatusBar } from 'react-native'

import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000)

    })
    return (
        <View style={styles.contianer}>
            <StatusBar backgroundColor="black" hidden={false} barStyle="light-content" />
            <Animatable.Image
                iterationCount="infinite"
                delay={200}
                useNativeDriver={true}
                style={styles.Splash_Img}
                source={require("../Assets/Img/splash.png")}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    contianer: {
        flex: 1,


    },
    Splash_Img: {
        height: '100%',
        width: '100%',

    }


})

export default SplashScreen;