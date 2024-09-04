import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'
import { Colors, hp, wp } from '@/constants'

type Props = {
    title?: string
}

const EmptyAlert = ({ title }: Props) => {
    return (
        <View style={{ width: wp(100), height: "100%", alignItems: "center", justifyContent: "center" }} >
            <Animated.View entering={FadeInDown.delay(100).springify()} className='bg-white shadow-lg shadow-black/40 gap-4 rounded-md w-[90%] p-8 mx-auto items-center justify-center'>
                <AntDesign name='exclamationcircleo' color={Colors.Primary} size={80} />
                <Text className='text-2xl text-primary font-semibold'>{title || "No data found"}</Text>
            </Animated.View>
        </View>
    )
}

export default EmptyAlert