import { Image, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { hp, wp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    label: string,
    iconName: string,
    onPress: (value: string) => void,
    isTrue?: boolean
}

const PrefrenceCard = ({ label, iconName, onPress, isTrue }: Props) => {
    const [selected, setselected] = useState(false)


    return (
        <TouchableOpacity onPress={() => {
            onPress(label);
            setselected(!selected)
        }} className={`items-center ${selected && "border-Primary bg-AscentTwo/80"}  m-2 border-[1px] p-1 rounded-md`} style={{ width: wp(28), height: hp(12) }}>
            <Image source={iconName as any} className='w-20 h-20 object-cover rounded-md' />
            <Text className={`text-md text-center p-1 rounded-md bg-Gray/80 z-50 shadow-md shadow-black w-full absolute bottom-1 text-white font-semibold ${selected && "text-white"}`}>{label}</Text>
        </TouchableOpacity>
    )
}

export default PrefrenceCard