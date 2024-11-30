import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handlePasswordResetAction } from '@/utils/actions';
import { showToast } from '@/utils';
import { BackButton, Button, InputBox } from '@/components';

const ResetPasswordScreen = () => {
    const params: any = useLocalSearchParams();

    const [payload, setpayload] = useState({
        email: params.email?.split(" ").join("+"),
        otp: "",
        newPassword: ""
    })

    console.log("user", params.email?.split(" ").join("+"))

    const [confermNewPass, setconfermNewPass] = useState<string>("")

    const [loading, setloading] = useState<boolean>(false)

    const handlePasswordReset = async () => {
        try {
            setloading(true);

            const ispassMatch = confermNewPass.toString() === payload.newPassword.toString()
            if (!ispassMatch) {
                return showToast("Password did'nt matched.", "error", "")
            }
            const res = await handlePasswordResetAction(payload);
            if (!res.success) {
                setloading(false);
                return showToast(res.message, "error", "Something went wrong.")
            }
            showToast("Password reset successfully.", "success", "");

            setTimeout(() => {
                return router.back()
            }, 1000)

        } catch (error: any) {
            return showToast(error.message, "error", "Something went wrong.")

        } finally {
            setloading(false)
        }
    }


    return (
        <SafeAreaView className='py-8 px-[5%] items-center justify-center flex-1'>

            <BackButton />



            <Text className='text-2xl font-medium text-Primary'>Reset your Password</Text>
            <Text className='text-sm font-medium text-neutral-600'>you have a option to reset your password by just verifying your email address.</Text>



            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className=' w-full my-4'>
                <InputBox lable='OTP' placeholder='enter otp' onChange={(value) => setpayload(prev => ({ ...prev, otp: value.trim() }))} />


                <InputBox placeholder='Enter your password' passwordBox lable='Enter new Password' onChange={(value) => setpayload(prev => ({ ...prev, newPassword: value.trim() }))} />

                <InputBox placeholder='Confirm your password' passwordBox lable='Conferm new Password' onChange={(value) => setconfermNewPass(value)} />
            </KeyboardAvoidingView>

            <Button loading={loading} disabled={loading} lable={loading ? "Please wait..." : "Reset Password"} onPress={() => handlePasswordReset()} />

        </SafeAreaView>
    )
}

export default ResetPasswordScreen