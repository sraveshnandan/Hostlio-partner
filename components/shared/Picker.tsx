import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Octicons } from '@expo/vector-icons'

type Props = {
    label: string,
    value?: string,
    items: Record<string, unknown> | any,
    onValueChange: (name: string) => void
}

const Picker = ({ label, items, onValueChange, value }: Props) => {
    const [onOPen, setonOPen] = useState(false);
    const [selectedItem, setselectedItem] = useState<any>(value);

    const handleOnChangeselection = (data: any) => {
        setselectedItem(data);
        setonOPen(!onOPen)
        return onValueChange(data._id)
    }

    return (
        <View className=' my-2'>
            <Text className='font-medium  mb-1 text-md'>{label}</Text>
            <TouchableOpacity onPress={() => setonOPen(prev => !prev)} className='bg-gray-200 border border-gray-400 w-full px-2 py-3  rounded-md'>
                <View className='w-full flex-row flex-grow justify-between  items-center'>
                    <Text className='text-md flex-grow font-medium'>{selectedItem?._id ? selectedItem.name : "Choose Category"}</Text>
                    <TouchableOpacity className='w-[20%]  p-1 items-center  justify-center'>
                        <Octicons size={18} onPress={() => setonOPen(prev => !prev)} name={onOPen ? 'chevron-up' : 'chevron-down'} />
                    </TouchableOpacity>
                </View>
                {
                    onOPen && (
                        <View className='my-2'>
                            {items.map((item: any, index: number) => (
                                <TouchableOpacity className={` px-2 py-3 flex-grow w-full  justify-between  my-1 flex-row items-center rounded-md ${selectedItem?._id === item?._id ? "bg-Primary" : "bg-white"}`} onPress={() => handleOnChangeselection(item)} key={index}>
                                    <Text className={`text-lg font-medium ${item?._id === selectedItem?._id && "text-white"} `}>{item.name}</Text>

                                    <Image source={{ uri: item.image.url }} className='w-10 h-10 object-cover rounded-md shadow-md shadow-white' />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )
                }

            </TouchableOpacity>
        </View>
    )
}

export default Picker