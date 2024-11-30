import { View, Text, TextInput, KeyboardAvoidingView, InputModeOptions, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    lable?: string,
    value?: string,
    onChange: (value: string) => void,
    placeholder?: string,
    passwordBox?: boolean,
    type?: string,
    multiLine?: boolean
}

const InputBox = ({ placeholder, multiLine = false, value, lable, onChange, passwordBox, type }: Props) => {
    const [inputvalue, setinputvalue] = useState(value);
    const [hide, sethide] = useState(true)
    const handleChange = useCallback((value: any) => {
        setinputvalue(value)
        onChange(value)
    }, [value])


    return (
        <View className='w-full my-1'>
            <Text className='text-md'>{lable}</Text>
            <View className='flex-row items-center mt-1  border-2 border-Primary rounded-md overflow-hidden'>
                <TextInput multiline={multiLine} keyboardType={type as any} secureTextEntry={passwordBox && hide} className={` text-lg font-semibold flex-grow p-2`} value={inputvalue} placeholder={placeholder} onChangeText={(value) => handleChange(value)} />
                {passwordBox && <View className='mr-2'><Ionicons onPress={() => sethide(prev => !prev)} size={25} name={hide ? "eye-outline" : "eye-off-outline"} /></View>}
            </View>
        </View>
    )
}

export default InputBox