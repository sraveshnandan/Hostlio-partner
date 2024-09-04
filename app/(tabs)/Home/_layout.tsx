import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants'

const StackLayout = () => {
    return (
        <Stack screenOptions={{
            animation: "ios",
            headerStyle: {
                backgroundColor: "#000"
            },
            statusBarStyle: "inverted",
            statusBarColor: "#212121",
            headerTitleStyle: {
                color: Colors.White
            }

        }}>
            <Stack.Screen name='index' options={{

            }} />
        </Stack>
    )
}

export default StackLayout