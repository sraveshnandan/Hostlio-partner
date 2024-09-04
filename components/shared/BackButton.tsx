import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'
import { router } from 'expo-router'

type Props = {}

const BackButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={() => router.back()} className='absolute flex-row items-center top-12 left-4'>
            <Ionicons name='arrow-back' color={Colors.Primary} size={25} />
            <Text className='ml-2 text-md font-medium text-Primary'>Back</Text>
        </TouchableOpacity>
    )
}

export default BackButton