import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { ImagePickerAsset } from 'expo-image-picker'
import * as ImagePicker from "expo-image-picker"
import { showToast } from '@/utils'
import Button from './Button'
import { hp, wp } from '@/constants'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    banners?: Record<string, any>
    onBannerSellected: Dispatch<SetStateAction<ImagePickerAsset[]>>
}

const BannerSelector = ({ onBannerSellected, banners }: Props) => {
    const [uploadedData, setuploadedData] = useState<Record<string, any>[]>(banners as any)
    const [Banners, setBanners] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const handleImageSelect = async () => {
        if (Banners.length === 5) {
            return showToast("Only 5 images are allowed.", "info", "You can only choose 5 images.")
        }
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            allowsEditing: true,
            quality: 0.9,
            exif: true
        })

        if (!result.canceled) {
            setBanners(prev => [...prev, result.assets[0]]);
            return onBannerSellected(Banners);

        } else {
            return showToast("No image selected", "error", "Pleae select at least one images")
        }
    }

    const handleImageDelete = (data: ImagePickerAsset) => {
        setBanners(Banners.filter(b => b.fileName !== data.fileName));
        return onBannerSellected(Banners.filter(b => b.fileName !== data.fileName))
    };





    return (
        <View className='bg-gray-200 rounded-md p-2 mt-4 items-center justify-center '>

            {
                uploadedData && uploadedData.length && (
                    <ScrollView horizontal className='my-4' >
                        {
                            uploadedData.map((item, index) => (
                                <View key={index} className=''>

                                    <Image source={{ uri: item.url }} width={wp(55)} className='rounded-xl mx-4' height={hp(15)} />
                                </View>
                            ))
                        }
                    </ScrollView>
                )
            }
            {
                Banners.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full p-2 mb-8'>
                        {Banners.map((item, index) => (
                            <View key={index} style={{ width: wp(80), marginHorizontal: 10 }} className='border-2 my-2 rounded-xl w-full  border-gray-300'>
                                <TouchableOpacity onPress={() => handleImageDelete(item)} className='bg-white p-2 rounded-md absolute z-50 right-1 top-2'><Ionicons color={"red"} name='trash' size={20} /></TouchableOpacity>
                                <Image source={{ uri: item.uri }} key={index} className='m-2  h-48 shadow-md shadow-black rounded-xl object-cover' />
                            </View>
                        ))}
                    </ScrollView>
                )
            }
            <View className='w-[60%]'>
                <Button disabled={Banners.length === 5 || uploadedData?.length ? true : false} Icon='cloud-upload-outline' lable={Banners.length === 5 || uploadedData?.length === 5 ? "Not Allowed" : "Add Images"} onPress={() => handleImageSelect()} />
            </View>
        </View>
    )
}

export default BannerSelector