import { View, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants';

type Props = {
    imageSrc?: string,
    onImageSelected: (value: ImagePicker.ImagePickerAsset) => void,


}

const ImageSelector = ({ imageSrc, onImageSelected }: Props) => {
    const [file, setfile] = useState<ImagePicker.ImagePickerAsset | null>(null);



    const handleOnImageChange = useCallback((value: ImagePicker.ImagePickerAsset) => {
        onImageSelected(value)
    }, [file])

    const handleImageSelect = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1, 1],
            allowsEditing: true
        });

        if (!result.canceled) {
            setfile(result.assets[0]);
            Toast.show({
                type: "success",
                text1: "Image selected successfully."
            })
            return handleOnImageChange(result.assets[0]);


        } else {
            return Toast.show({
                type: "error",
                text1: "No any image selected.",
                text2: "Please select at least one image."
            })
        }
    }

    return (
        <View className='my-4 w-full items-center justify-center'>

            <View className='p-2 rounded-full bg-AscentTwo/40  items-center justify-center w-32 h-32'>

                <TouchableOpacity onPress={() => handleImageSelect()} className='bg-AscentTwo w-8 z-50 h-8 absolute right-1 bottom-2 items-center justify-center rounded-full '><Ionicons name='cloud-upload-outline' size={20} color={Colors.White} /></TouchableOpacity>
                {
                    file?.uri ? (
                        <Image className='border-2 rounded-full w-full h-full' resizeMethod='auto' source={{ uri: file.uri }} />
                    ) : imageSrc ? (
                        <Image className='border-2 rounded-full w-full h-full' resizeMethod='auto' source={{ uri: imageSrc }} />
                    ) : (
                        <Ionicons name='person' size={85} color={Colors.AscentTwo} />
                    )
                }

            </View>
        </View>
    )
}

export default ImageSelector