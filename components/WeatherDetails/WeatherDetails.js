import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/index';
import { FontAwesome5, MaterialComunityIcons} from '@expo/vector-icons';

const { PRIMARY_COLOR, SECONDERY_COLOR, BORDER_COLOR } = colors;

const componentName = ({ currentWeather, unitsSystem }) => {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed }
  } = currentWeather;

  const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`;
  return (
    <View style={styles.weatherDetails}>
      {/* First Line */}
      <View style={styles.weatherDetailsRow}>
        <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5 name='temperature-low' size={25} color={PRIMARY_COLOR}></FontAwesome5>
            <View style={styles.weatherDetailsItems}>
              <Text>Feels like: </Text>
              <Text style={styles.textSecondery}>{feels_like}°</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5 name='water' size={30} color={PRIMARY_COLOR}></FontAwesome5>
            <View style={styles.weatherDetailsItems}>
              <Text>Humidity: </Text>
              <Text style={styles.textSecondery}>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Second Line */}
      <View style={{...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR}}>
        <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}}>
          <View style={styles.weatherDetailsRow}>
            <MaterialComunityIcons name='weather-windy' size={30} color={PRIMARY_COLOR}></MaterialComunityIcons>
            <View style={styles.weatherDetailsItems}>
              <Text>Wind Speed: </Text>
              <Text style={styles.textSecondery}>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailsBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialComunityIcons name='speedometer' size={30} color={PRIMARY_COLOR}></MaterialComunityIcons>
            <View style={styles.weatherDetailsItems}>
              <Text>Pressure: </Text>
              <Text style={styles.textSecondery}>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default componentName;

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondery: {
    fontSize: 15,
    color: SECONDERY_COLOR,
    fontWeight: '700',
    margin: 7,
  },
})