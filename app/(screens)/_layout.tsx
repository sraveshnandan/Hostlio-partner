import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants'

const ScreenLayouts = () => {
    return (
        <Stack screenOptions={{ animation: "ios", headerTitleAlign: "center", headerTitleStyle: { color: Colors.Primary } }}>

            <Stack.Screen name='privacy-policy' options={{ headerTitle: "Our Privacy Policy" }} />
            <Stack.Screen name='terms-condition' options={{ headerTitle: "Terms & Condition" }} />
            <Stack.Screen name='create-listing' options={{ headerTitle: "Create New Listing" }} />
            <Stack.Screen name='update-listing' options={{ headerTitle: "Update your Listing" }} />

        </Stack>
    )
}

export default ScreenLayouts