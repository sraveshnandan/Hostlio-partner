import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants'

type Props = {
    title: string,
    subtitle: string,
    onValueChange: (value: boolean) => void,
    previous_data?: boolean
}

const Toggleswitches = ({
    title,
    subtitle,
    onValueChange,
    previous_data = false
}: Props) => {
    const [on, seton] = useState<boolean>(previous_data);
    const handleChange = () => {
        seton(prev => !prev);
        return onValueChange(on)
    }
    return (
        <View className='w-full bg-white shadow-md shadow-black my-2 flex-row items-center justify-between py-1 px-2 rounded-xl'>
            <View className=''>
                <Text className='text-lg font-semibold'>{title}</Text>
                <Text className='text-xs font-medium text-gray-400'>{subtitle}</Text>
            </View>
            <Switch value={on} thumbColor={Colors.Primary} onValueChange={handleChange} />
        </View>
    )
}

export default Toggleswitches