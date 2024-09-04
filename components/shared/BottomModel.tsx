import { View, Text } from 'react-native'
import React from 'react'
import { hp, wp } from '@/constants'

type Props = {
    title: string
}

const BottomModel = ({ title }: Props) => {
    return (
        <View style={{ width: wp(100), height: hp(100) }} className='bg-transparent/10 absolute '>
            <View className='absolute bottom-0 h-[200px] rounded-md bg-white p-2'></View>
        </View>
    )
}

export default BottomModel