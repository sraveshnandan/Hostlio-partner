import { TextStyle, Modal, TouchableOpacity, View, Text } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import InputBox from '../shared/InputBox'
import Button from '../shared/Button'
import { Ionicons } from '@expo/vector-icons'
import { showToast } from '@/utils'
import { handleForgotPasswordAction } from '@/utils/actions'
import { router } from 'expo-router'


type Props = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<any>>,
    title: string,
    titleStyle?: TextStyle,
}

const ForgotPasswordModal = ({ isOpen, setIsOpen, title, titleStyle }: Props) => {
    const [userEmail, setuserEmail] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false)

    const handlemodalClose = () => {
        return setIsOpen(false)
    }


    console.log(userEmail)

    const handleforgotPassword = async () => {
        try {
            setloading(true);
            const res = await handleForgotPasswordAction(userEmail);

            if (!res.success) {
                setloading(false);
                return showToast(res.message, "error", "Something went wrong.")

            }

            showToast(`We have successfully sent OTP to ${userEmail} `, "success", "");

            setTimeout(() => {
                handlemodalClose()
                return router.push(`/(auth)/resetPassword?email=${userEmail}`)
            }, 1000)

        } catch (error: any) {
            return showToast(error.message, "error", "Something went wrong.")

        } finally {
            setloading(false)
        }

    }
    return (
        <Modal
            visible={isOpen}
            onRequestClose={() => handlemodalClose()}
            hardwareAccelerated={true}
            transparent={true}
            animationType='slide'

        >
            <TouchableOpacity activeOpacity={1} className='flex-1 justify-center bg-transparent/20' >
                <View className='bg-white w-[85%] mx-auto items-center p-4 z-50 rounded-2xl'>
                    <TouchableOpacity onPress={() => loading ? showToast("Please wait, we are procesing your request", "info", "") : handlemodalClose()} className='absolute bg-gray-200 rounded-full p-1 top-4 right-4'>
                        <Ionicons name='close-sharp' size={20} color={"red"} />
                    </TouchableOpacity>
                    <Text className='text-xl font-semibold mb-4'>Your email address</Text>

                    <View className='w-full '>
                        <InputBox placeholder='your email address' lable='Email address' onChange={(value) => setuserEmail(value.trim())} />

                        <Button disabled={loading} loading={loading} lable={loading ? "Please wait..." : "Send OTP"} onPress={() => handleforgotPassword()} />
                    </View>

                </View>

            </TouchableOpacity>


        </Modal>
    )
}



export default ForgotPasswordModal