import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Colors, hp, wp } from '@/constants'

type Props = {
    loadingMessage: string
}

const Loader = ({ loadingMessage }: Props) => {
    return (
        <View style={{ height: hp(100), width: wp(100) }} className='bg-transparent/20 items-center justify-center z-50 absolute'>
            <Animated.View className={` p-8 w-[60%] bg-white rounded-md items-center justify-center`}>
                <ActivityIndicator color={Colors.AscentTwo} size={"large"} />
                <Text className='text-md text-neutral-500 mt-4 font-medium'>{loadingMessage || "Please wait..."}</Text>
            </Animated.View>
        </View>
    )
}

export default Loader