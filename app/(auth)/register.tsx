import React, { useEffect, useState } from 'react';
import { AuthContainer, BackButton, Button, Header, ImageSelector, InputBox, Loader } from '@/components';
import { Keyboard, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { handleFileUpload, showToast } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IRegistrationPayload } from '@/types';
import { register } from '@/redux/reducers/auth.reducer';

const RegisterScreen = () => {
    const dispatch = useDispatch()

    const { isLoading, isSuccess, isError, user, errMSg } = useSelector((state: RootState) => state.auth)
    const [RegistrationPayload, setRegistrationPayload] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "owner"  //only for owner app
    });
    const [avatarFile, setavatarFile] = useState<any>()
    const [uploading, setuploading] = useState(false)





    const handleRegistration = async () => {
        console.log("Registration fn  invoked.");
        Keyboard.dismiss();
        if (Object.values(RegistrationPayload).some(s => s === "")) {
            return showToast("All fields are required.", "info", "Please fill all details.")
        }
        if (!RegistrationPayload.email.includes("@")) {
            return showToast("Invalid email address", "error", "Please enter correct email.")
        }

        let registrationPayload: IRegistrationPayload = {
            avatar: undefined,
            ...RegistrationPayload
        };

        if (avatarFile && !registrationPayload.avatar) {
            const formdata = new FormData();

            formdata.append("file", {
                name: avatarFile.fineName || "userAvatar",
                uri: avatarFile.uri,
                type: avatarFile.mimeType || "image/jpeg"
            } as any);

            try {
                const fileUploadRes = await handleFileUpload(formdata, setuploading);

                if (!fileUploadRes.success) {
                    return showToast(fileUploadRes.message, "error", "Something went wrong uploading file.")
                }

                registrationPayload.avatar = {
                    public_id: fileUploadRes.response[0].public_id as any,
                    url: fileUploadRes.response[0].url as any
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            delete registrationPayload.avatar
        }

        dispatch(register(registrationPayload) as any)

    }

    useEffect(() => {
        if (!isLoading && user.first_name) {
            return router.push(`/(auth)/verification`)
        }
        if (errMSg.length > 0) {
            return showToast(errMSg, "error", "Something went wrong.")
        }

    }, [isSuccess, isLoading, errMSg])

    return (
        <AuthContainer>
            {
                uploading && <Loader loadingMessage='Uploading image to the server.' />
            }
            {
                isLoading && <Loader loadingMessage='Please wait...' />
            }
            <BackButton />
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <Header title='Register yourself' center={true} noSubtitle />

                <ImageSelector onImageSelected={(value) => setavatarFile(value)} />

                <InputBox value={RegistrationPayload.first_name} lable='Enter your first name' placeholder='First Name' onChange={(value) => setRegistrationPayload(prev => ({ ...prev, first_name: value }))} />

                <InputBox type='default' value={RegistrationPayload.last_name} lable='Enter your last name' placeholder='Last Name' onChange={(value) => setRegistrationPayload(prev => ({ ...prev, last_name: value }))} />

                <InputBox type='email' value={RegistrationPayload.email} lable='Enter your email' placeholder='Email address' onChange={(value) => setRegistrationPayload(prev => ({ ...prev, email: value }))} />

                <InputBox type='password' passwordBox value={RegistrationPayload.email} lable='Enter your password' placeholder='Password' onChange={(value) => setRegistrationPayload(prev => ({ ...prev, password: value }))} />

                <Button disabled={uploading} loading={uploading} lable='Register' onPress={() => handleRegistration()} />
            </ScrollView>


        </AuthContainer>
    )
}

export default RegisterScreen