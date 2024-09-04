import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    title: string,
    subtitle?: string,
    center?: boolean,
    noSubtitle?: boolean
}

const Header = ({ subtitle, title, noSubtitle, center }: Props) => {
    return (
        <View className='w-full'>
            <Text className={`text-2xl  ${center && "text-center"} font-medium text-Primary`}>{title}</Text>
            <Text className={`text-lg ${center && "text-center"} ${noSubtitle && "hidden"} mt-1 opacity-40 text-Black font-medium`}>{subtitle}</Text>
        </View>
    )
}

export default Header