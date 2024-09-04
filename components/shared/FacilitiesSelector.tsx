import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, Facilities } from '@/constants'
import { Octicons } from '@expo/vector-icons'

type Props = {
    onItemSelected: (data: string[]) => void,
    selectedItem?: string[]
}

const FacilitiesSelector = ({ onItemSelected, selectedItem }: Props) => {
    const [facilities, setfacilities] = useState(Facilities);
    const [selectedFacilities, setselectedFacilities] = useState<string[]>(selectedItem ? selectedItem : []);

    const handleItemTap = (data: string) => {
        const isExists = selectedFacilities.findIndex(f => f.toLowerCase() === data.toLowerCase());
        if (isExists !== -1) {
            setselectedFacilities(selectedFacilities.filter(f => f.toLowerCase() !== data.toLowerCase()));
        } else {
            setselectedFacilities(prev => [...prev, data]);
        }
    }

    useEffect(() => {
        onItemSelected(selectedFacilities)
    }, [selectedFacilities.length])

    return (
        <View className='my-2'>
            <Text className='text-lg font-medium'>Add some Facilitiess</Text>
            {selectedFacilities && setfacilities?.length && (
                <View className='w-full p-2 flex-row flex-wrap  rounded-md'>
                    {selectedFacilities.map((item, index) => (
                        <View key={index} className='bg-gray-200 m-2 px-3 py-1 rounded-2xl '>
                            <Text className='text-Primary font-medium'>{item}</Text>
                        </View>
                    ))}
                </View>
            )}

            <View className=' mt-2'>
                {
                    facilities.map((item, index) => (
                        <View key={index} className='flex-row mb-1 p-2 items-center justify-between '>
                            <Text className='text-lg'>{item}</Text>
                            <TouchableOpacity onPress={() => handleItemTap(item)} className={`${selectedFacilities?.includes(item) ? "bg-green-500 border-0" : "border"} rounded-md items-center justify-center w-8 h-8 `}>
                                {
                                    selectedFacilities.includes(item) && (
                                        <Octicons name='check' size={25} color={Colors.White} />
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default FacilitiesSelector