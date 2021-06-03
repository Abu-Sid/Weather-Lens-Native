import * as Location from "expo-location";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null)
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
  const {latitude,longitude}=location.coords
  alert (`Latitute is ${latitude} and Longitude is ${longitude}`)
} catch (error) {
  
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
