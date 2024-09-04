import React from 'react'
import { Stack } from 'expo-router'
import { Octicons } from '@expo/vector-icons'
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
            }
        }}>
            <Stack.Screen name='index' options={{
                headerTitle: "All Notifications", headerRight: () => (
                    <Octicons color={Colors.AscentTwo} size={25} name='bell' />
                )
            }} />
        </Stack>
    )
}

export default StackLayout