import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function WeatherInfo({currentWeather}) {
    const {main:{temp},
    weather: [details]
} = currentWeather;
const {icon} = details
const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style = {styles.weatherInfo}>
            <Image source ={{uri : iconUrl}} />
            <Text>{temp}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo : {
        alignItems: 'center',
    }
})