import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  const API_KEY = 'b381267e48a3a93fbd3768730eb8ae1d'
  const URL = 'https://api.openweathermap.org/data/2.5/weather?'
  useEffect(() => {
    load()
    
  }, [])
  const load=async()=>{
try {
  let {status}= await Location.requestPermissionsAsync()
  if(status!=='granted'){
    setErrorMessage("Need access to the location in order to run the App")
    return
  }
  const location = await Location.getCurrentPositionAsync()
  setLocation(location)
  const {latitude,longitude}=location.coords
  const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

    const response = await fetch(weatherUrl)

    const result = await response.json()

  alert (`Latitute is ${latitude} and Longitude is ${longitude}`)
  if (response.ok) {
    setCurrentWeather(result)
} else {
    setErrorMessage(result.message)
}
} catch (error) {
  setErrorMessage(error.message)
}
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
