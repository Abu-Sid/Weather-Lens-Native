import React from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ReloadIcon() {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
        <View style = {StyleSheet.reloadIcon}>
            <Ionicons name={ reloadIconName }size={24} color="black" />
        </View>
    )
}

const style = StyleSheet.create({
    reloadIcon : {
        position: 'absolute',
        top: 30,
        right: 20,

    }
})
