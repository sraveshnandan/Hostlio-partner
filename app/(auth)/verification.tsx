import { useEffect, useRef, useState } from 'react';
import { AuthContainer, Button, Header, Loader, OTPInputBox, Timer } from '@/components';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { HandleOTPResendAction, handleOTPVerify } from '@/utils/actions';
import { showToast } from '@/utils';
import { router, useLocalSearchParams } from 'expo-router';
import { fetUserProfile } from '@/redux/reducers/auth.reducer';

const VerificationScreen = () => {
    const dispatch = useDispatch();
    const params = useLocalSearchParams()
    const { user, token, isLoading, isError, isSuccess, errMSg } = useSelector((state: RootState) => state.auth)
    const [verificationCode, setverificationCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [loading, setloading] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30); // 5 minutes = 300 seconds
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);


    const handleOTPVerification = async () => {
        const otp = verificationCode.join("")
        console.log(otp);

        if (otp.length !== 6) {
            return showToast("Please enter correct OTP", "error", "")
        }

        try {
            let useremail = params.email;
            if (user.email) {
                useremail = user.email as string
            }

            const otpRes = await handleOTPVerify(useremail as string, otp);

            if (otpRes !== "Email verified successfully.") {
                return showToast(otpRes, "error", "Please enter correct otp or resend it.")
            }
            dispatch(fetUserProfile({ token: token }) as any)
            showToast(otpRes, "success", "");
            return router.replace(`/(auth)/accountVerified`)

        } catch (error: any) {
            return showToast(error.message, "error", "")
        }



    }

    const HandleOTPResend = async () => {
        // Handle OTP resend logic
        setloading(true)
        try {
            let useremail = params.email;
            if (user.email) {
                useremail = user.email as string
            }
            const res: string = await HandleOTPResendAction(useremail as any);

            if (!res.includes("OTP sent successfully")) {
                return showToast(res, "error", "")
            }
            if (res === "Your account is already verified, no need to resend otp email.") {
                showToast(res, "success", "");
                return router.replace(`/(auth)/accountVerified`)
            }


            return showToast(res, "success", "");

        } catch (error: any) {
            if (error.message === "Your account is already verified, no need to resend otp email.") {
                showToast(error.message, "success", "");
                return router.replace(`/(auth)/accountVerified`)
            }
            return showToast(error.message, "error", "")
        } finally {
            setloading(false)
            setverificationCode(["", "", "", "", "", ""])
        }

    }



    console.log(params)

    return (
        <AuthContainer>

            {
                isLoading && <Loader loadingMessage='Verifying OTP.' />
            }
            <Header title='Verify Code' center subtitle='Please enter the code we just sent to your email.' />
            <OTPInputBox setotp={setverificationCode} />

            <View className='p-2 mb-8 items-center justify-center'>

                <Text>Don&apos;t recive OTP?</Text>
                <Timer time={timer} isDisabled={isResendDisabled} setIsDisabled={setIsResendDisabled} onTimerFunction={HandleOTPResend} message='Resend availabe in ' label='Resend OTP' />
            </View>
            <Button loading={loading && isLoading} disabled={loading && isLoading} lable='Verify' onPress={() => handleOTPVerification()} />



        </AuthContainer>
    )
}

export default VerificationScreen