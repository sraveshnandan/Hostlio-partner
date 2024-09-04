import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='register' />
            <Stack.Screen name='verification' />
            <Stack.Screen name='prefrence' />
            <Stack.Screen name='accountVerified' />
        </Stack>
    )
}

export default AuthLayout