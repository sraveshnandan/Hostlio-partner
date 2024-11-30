import React, { useEffect, useState } from 'react'
import { AuthContainer, Button, Header, InputBox, Loader } from '@/components'
import { Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import { showToast } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { login, resetStatus } from '@/redux/reducers/auth.reducer'
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal'


const MainAuthScreen = () => {
    const dispatch = useDispatch()
    const { isLoading, isSuccess, isError, user, errMSg } = useSelector((state: RootState) => state.auth)
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [forgotPassModalState, setforgotPassModalState] = useState<boolean>(false)

    // handling login action 
    const handleLoginFn = async () => {
        Keyboard.dismiss()
        if (!email.includes("@") || email.length === 0) {
            return showToast("Invalid or empty email address", "error", "pleae enter correct email address.")
        }
        if (password.length === 0) {
            return showToast("Invalid or empty Password", "error", "pleae enter your password.")
        }
        console.log("handle login fn started.");
        const trimedEmail = email.trim();
        const trimedPassword = password.trim();
        dispatch(login({ email: trimedEmail, password: trimedPassword }) as any);
    }


    // handling forgot password 
    const handleForgotPassword = () => {
        if (Keyboard.isVisible()) {
            Keyboard.dismiss()
            return setforgotPassModalState(prev => !prev)

        }
        setforgotPassModalState(prev => !prev)
    }



    useEffect(() => {
        if (!isLoading && user.first_name && user.email_verified) {
            return router.replace(`/(tabs)/Home/`)
        } else if (user && user.first_name && !user.email_verified) {
            return router.push("/(auth)/verification")
        } else if (errMSg.length > 0) {
            if (errMSg === "Your account is not verified yet, please verify your account.") {
                return router.push(`/(auth)/verification?email=${email}`)
            }

            return showToast(errMSg, "error", "Something went wrong.")
        }
    }, [isSuccess, isLoading, errMSg])

    useEffect(() => {
        dispatch(resetStatus())
    }, [])
    return (
        <AuthContainer verticallyCenter={true}>
            {
                forgotPassModalState && (
                    <ForgotPasswordModal title='Password Recovery' isOpen={forgotPassModalState} setIsOpen={setforgotPassModalState as any} />
                )
            }

            {isLoading && (
                <Loader loadingMessage='Please wait...' />
            )}
            <View className='mb-4'>
                <Header title='Hi,Welcome' subtitle='Let&apos;s login ' />
            </View>
            <InputBox type='email' onChange={(data) => setemail(data)} lable='Enter your email address' placeholder='email address' value={email} />
            <InputBox passwordBox onChange={(data) => setpassword(data)} lable='Enter your password' placeholder='password' value={password} />

            <View className='w-full flex-row items-center justify-end'>
                <Text onPress={() => handleForgotPassword()} className='border-b-2 border-b-gray-200 pb-1 text-Primary'>Forgot Password</Text>

            </View>

            {/* login Button  */}
            <Button lable='Login' loading={isLoading} disabled={isLoading} onPress={() => handleLoginFn()} />

            {/* already have an account section  */}
            <View className='flex-row w-full items-center justify-center mt-8'>
                <Text>Don't have an account? </Text>
                <Text onPress={() => router.push(`/(auth)/register`)} className='underline font-medium text-md'>Register</Text>
            </View>


        </AuthContainer>

    )
}

export default MainAuthScreen