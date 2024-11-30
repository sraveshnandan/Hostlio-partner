import { Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Animated from 'react-native-reanimated'
import { hp, wp } from '@/constants'
import Header from './Header'
import * as Linking from "expo-linking"
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'

type Props = {
    isopen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const HelpModel = ({ isopen, setIsOpen }: Props) => {
    return isopen && (
        <View style={{ height: hp(80), width: wp(100) }} className='bg-transparent/80 items-center justify-center z-50 absolute '>
            <Animated.View className={` p-8 w-[90%] bg-white rounded-md items-center justify-center`}>

                {/* close icon  */}
                <TouchableOpacity onPress={() => setIsOpen(false)} className='absolute font-bold z-50 top-4 right-4'>
                    <Ionicons className='font-bold' name='close-circle-outline' size={25} color={"red"} />
                </TouchableOpacity>

                <View className='mb-4'>
                    <Header title='We are here to help.' center />
                </View>

                <TouchableOpacity onPress={() => {
                    return Linking.openURL(`mailto:help@hostlio.in`)
                }} className='flex-row items-center bg-gray-200 w-full p-2 rounded-md'>
                    <Octicons name='mail' size={22} />
                    <Text className='ml-4 font-semibold text-lg' numberOfLines={1}>help@hostlio.in</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    return Linking.openURL(`tel:7634075521`)
                }} className='flex-row items-center bg-gray-200 mt-4 w-full p-2 rounded-md'>
                    <MaterialCommunityIcons name='phone' size={22} />
                    <Text className='ml-4 font-semibold text-lg' numberOfLines={1}> +91 7634075521</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    return Linking.openURL(`https://wa.link/geqhgw`)
                }} className='flex-row items-center bg-gray-200 mt-4 w-full p-2 rounded-md'>
                    <MaterialCommunityIcons name='whatsapp' size={22} />
                    <Text className='ml-4 font-semibold text-lg' numberOfLines={1}>Hostlio</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
    )
}

export default HelpModel