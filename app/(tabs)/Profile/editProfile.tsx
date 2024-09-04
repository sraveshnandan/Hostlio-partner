import { View, ScrollView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Button, ImageSelector, InputBox, Loader } from '@/components'
import { ImagePickerAsset } from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { handleProfileUpdateAction } from '@/utils/actions'
import { handleFileUpload, showToast } from '@/utils'
import { updateToken, updateUser } from '@/redux/reducers/auth.reducer'
import { router } from 'expo-router'

const EditProfileScreen = () => {
    const dispatch = useDispatch()
    const { token, user } = useSelector((state: RootState) => state.auth)
    const [editAvatar, seteditAvatar] = useState<ImagePickerAsset>();
    const [loading, setloading] = useState<boolean>(false);
    const [uploading, setuploading] = useState(false)

    const [editedPayload, seteditedPayload] = useState<Record<string, any>>({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_no: user.phone_no,

    })

    const handleProfileUpdate = async () => {
        Keyboard.dismiss()
        setloading(true)
        try {
            let updatePayload = { ...editedPayload }
            // if user wants to update profile picture 
            if (editAvatar?.uri) {
                const formData = new FormData()
                formData.append("file", {
                    name: editAvatar.fileName || "User_avatar",
                    type: editAvatar.mimeType,
                    uri: editAvatar.uri
                } as any)
                const uploadres = await handleFileUpload(formData, setuploading);
                if (!uploadres.success) {
                    return showToast("Unable to upload new Image", "error", "Someting wrong.")
                }
                updatePayload.avatar = {
                    public_id: uploadres.response[0].public_id,
                    url: uploadres.response[0].url
                }
            }

            const resp = await handleProfileUpdateAction(updatePayload, token);

            if (!resp.success) {
                return showToast(resp.message, "error", "Something went wrong.")
            }
            const updatedUser = resp.res?.updateProfile?.user
            const updatedToken = resp.res?.updateProfile?.token
            dispatch(updateUser({ ...updatedUser }))
            dispatch(updateToken(updatedToken));
            showToast("Profile updated successfully.", "success", "Your profile updated successfully.");

            setTimeout(() => {
                return router.back()
            }, 1500);



        } catch (error: any) {
            console.log("err while handleProfileUpdate fn runs. ")
            return showToast(error.message, "error", "Something went wrong.")
        } finally {
            setloading(false)
        }

    }

    return (
        <>
            {
                loading && (
                    <Loader loadingMessage='Updateing Profile...' />
                )
            }
            <ScrollView className='flex-1 px-[5%] bg-white'>
                <ImageSelector imageSrc={user.avatar.url} onImageSelected={(value) => seteditAvatar(value)} />
                <View>
                    <InputBox value={editedPayload.first_name} lable='First Name' placeholder='Enter Your First Name' onChange={(value) => seteditedPayload(prev => ({ ...prev, first_name: value }))} />
                    <InputBox value={editedPayload.last_name} lable='Last Name' placeholder='Enter Your Last Name' onChange={(value) => seteditedPayload(prev => ({ ...prev, last_name: value }))} />
                    <InputBox type='numeric' lable='Mobile No:' placeholder={`${user.phone_no ? `+91 ${user
                        .phone_no}` : "e.g: +91 "}`} onChange={(value) => seteditedPayload(prev => ({ ...prev, phone_no: value }))} />
                </View>


            </ScrollView>
            <View className='p-[5%] bg-white'><Button Icon='arrow-forward-outline' loading={loading} disabled={loading} lable='Update Profile' onPress={() => handleProfileUpdate()} /></View>
        </>
    )
}

export default EditProfileScreen