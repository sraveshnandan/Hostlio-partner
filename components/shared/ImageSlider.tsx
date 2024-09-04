import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { wp } from '@/constants'

type Props = {
    images: { public_id: string, url: string }[]
}

const ImageSlider = ({ images }: Props) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full p-2 mb-2'>
            {images && images.map((item, index) => (
                <View key={index} style={{ width: wp(90) }} className='border-2 my-2 rounded-xl w-full  border-gray-300 mr-1'>
                    <Image source={{ uri: item.url }} key={index} className='m-2  w-[95%] h-48 shadow-md shadow-black rounded-xl object-cover' />
                </View>
            ))}
        </ScrollView>
    )
}

export default ImageSlider