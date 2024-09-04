import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/constants'

const StackLayout = () => {
    return (
        <Stack screenOptions={{

            headerStyle: {
                backgroundColor: "#000"
            },
            statusBarStyle: "inverted",
            statusBarColor: "#212121",
            headerTitleStyle: {
                color: Colors.White
            },
            headerBackVisible: true,
            animation: "ios"

        }}>
            <Stack.Screen name='index' options={{ headerTitle: "Account", headerTitleAlign: "center", }} />
            <Stack.Screen name='editProfile' options={{ headerTitle: "Edit Profile", headerTitleAlign: "center" }} />


        </Stack>
    )
}

export default StackLayout