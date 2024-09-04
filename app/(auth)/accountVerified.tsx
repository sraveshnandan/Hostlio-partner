
import { AuthContainer, Button, Header } from "@/components"
import { hp, wp } from "@/constants"
import { fetUserProfile } from "@/redux/reducers/auth.reducer"
import { RootState } from "@/redux/store"
import { showToast } from "@/utils"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Image, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
const AccountVerifiedScreen = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, user, token, errMSg } = useSelector((state: RootState) => state.auth);
    const [loading, setloading] = useState(false)
    const handleFinalProcess = async () => {
        // refetching profile 
        if (!user.email) {
            return router.replace(`/(auth)/`)
        }
        setloading(true)
        try {

            dispatch(fetUserProfile({ token: token }) as any)

        } catch (error) {

        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (!isLoading && user.first_name && user.email_verified) {
            return router.replace(`/(tabs)/Home/`)
        }
    }, [isSuccess, isLoading, errMSg]);


    return (
        <AuthContainer >
            <Image style={{ width: wp(80), height: hp(40), alignSelf: "center", marginBottom: hp(10) }} source={require("../../assets/images/verified.png")} />
            <Header title="OTP Verified" center subtitle="Your account  has been verified successfully." />
            <View className="self-center w-[95%] mt-12">
                <Button loading={loading} disabled={loading} lable="Done" onPress={() => handleFinalProcess()} />
            </View>
        </AuthContainer>
    )

}

export default AccountVerifiedScreen