import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import React, { useCallback } from 'react'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'


type Props = {
    lable: string,
    loading?: boolean,
    outline?: boolean,
    className?: string,
    onPress: () => void,
    Icon?: string,
    disabled?: boolean
}

const Button = ({ loading, lable, className, onPress, Icon, outline, disabled }: Props) => {




    return (
        <TouchableOpacity disabled={disabled} className={`py-3 my-2 bg-Primary justify-center rounded-md ${Icon && "px-8"} flex-row items-center w-full ${disabled && "bg-slate-800"} ${outline && "bg-transparent border-2 border-Primary"} ${disabled && "bg-Gray"}`} onPress={() => onPress()}>

            {loading && <ActivityIndicator size={"small"} color={outline ? Colors.Primary : Colors.White} />}
            <Text className={` font-semibold text-lg ${Icon ? null : "ml-4"} text-white text-center ${outline && "text-Primary"} ${loading && "opacity-70"}`}>{loading ? "pleae wait..." : lable}</Text>
            {Icon && <View className='flex-grow items-end justify-end '><Ionicons color={outline ? Colors.Primary : Colors.White} name={Icon as any} size={18} /></View>}
        </TouchableOpacity>
    )
}

export default Button