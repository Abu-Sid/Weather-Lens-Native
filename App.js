import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'
import ReloadIcon from './components/ReloadIcon/ReloadIcon'
import UnitsPicker from './components/UnitsPicker/UnitsPicker'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import { colors } from './utils/index'

// API Key
const API_KEY = 'b381267e48a3a93fbd3768730eb8ae1d'
const URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
 

  useEffect(() => {
    load()
  }, [unitsSystem])

  const load = async () => {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage("Need access to the location in order to run the App")
        return
      }
      const location = await Location.getCurrentPositionAsync()
      setLocation(location)
      const { latitude, longitude } = location.coords
      const weatherUrl = `${URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      // alert(`Latitude is ${latitude} and Longitude is ${longitude}`)
      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  // return code part
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={{textAlign: 'center', alignItems: 'center'}}>
          <Text style={styles.titleText}>Weather Lens</Text>
        </View>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.PRIMARY_COLOR,
    paddingBottom: 20,
  },
});
