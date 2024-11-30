import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Colors, UserProfileLinks } from '@/constants'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { RootState } from '@/redux/store'
import { logout } from '@/redux/reducers/auth.reducer'
import { showToast } from '@/utils'
import { removeAlldata } from '@/redux/reducers/main.reducers'
import { HelpModel } from '@/components'
import * as Linking from "expo-linking"

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { user, userListing } = useSelector((state: RootState) => state.auth)
    const [modelOpen, setmodelOpen] = useState(false);
    const [editOption, seteditOption] = useState({
        name: "Edit your listing",
        icon: "pencil-outline",
        link: "/(screens)/update-listing"

    },)


    const handleBtnClick = (data: any) => {
        if (data.link) {
            return router.push(data.link)
        }
        if (data.name === "Sign Out") {
            showToast("Logged out successfully.", "success", "");
            dispatch(logout());
            dispatch(removeAlldata())
            router.replace(`/(auth)/`)
        }
        if (data.name === "Help Center") {
            return setmodelOpen(true)
        }
        if (data.name === "Give Feedback") {
            return Linking.openURL(`https://play.google.com/store/apps/details?id=com.sravesh.hostlio_partner&hl=en`)

        }



    }
    return (
        <>

            {/* help model  */}
            <HelpModel isopen={modelOpen} setIsOpen={setmodelOpen} />
            <ScrollView className='flex-1  px-[5%] bg-white'>



                {/* user profileImage  */}
                <View className='p-2 bg-gray-200 shadow-sm shadow-black  justify-center items-center my-4 rounded-xl  min-h-[240px]'>
                    <View className='w-40 h-40 rounded-full border-2 border-opacity-10 border-Primary/40 overflow-hidden p-1'>
                        <Image className='rounded-full object-contain  h-[99%] w-[99%] shadow-md shadow-black ' source={{ uri: user?.avatar?.url }} width={10} height={10} />
                    </View>

                    <TouchableOpacity onPress={() => router.push("/(tabs)/Profile/editProfile")} className='absolute top-2 right-2 bg-Gray/40 p-2 rounded-full'>
                        <MaterialCommunityIcons name='pen' size={28} color={Colors.Primary} />
                    </TouchableOpacity>

                    <Text className='mt-2 text-Primary font-semibold text-2xl'>{user.first_name + " " + user.last_name}</Text>
                </View>

                {/* extra Links  */}

                {
                    userListing?.name && (
                        <TouchableOpacity onPress={() => handleBtnClick(editOption)} className={`border-b-[1px] flex-row pb-2`} >
                            {/* icon  */}
                            <Octicons name={"pencil"} size={25} className='font-bold ml2' color={Colors.AscentTwo} />

                            <View className='flex-grow mx-2 flex-row items-center justify-between'>
                                <Text className={`text-md font-semibold`}>{editOption.name}</Text>
                                <Ionicons name='chevron-forward' size={20} color={editOption.name === "Sign Out" ? "red" : Colors.AscentTwo} />
                            </View>
                        </TouchableOpacity>
                    )
                }

                {
                    UserProfileLinks.map((item, index) => (
                        <TouchableOpacity onPress={() => handleBtnClick(item)} className={`border-b-[1px] ${index === UserProfileLinks.length - 1 && " border-b-0"} mb-2 p-2 m flex-row items-center border-opacity-10 border-Gray mt-2`} key={index}>
                            {/* icon  */}
                            <Ionicons name={item.icon as any} size={25} className='font-bold' color={item.name === "Sign Out" ? "red" : Colors.AscentTwo} />

                            <View className='flex-grow mx-2 flex-row items-center justify-between'>
                                <Text className={`text-md ${item.name === "Sign Out" && "text-red-500"} font-semibold`}>{item.name}</Text>
                                <Ionicons name='chevron-forward' size={20} color={item.name === "Sign Out" ? "red" : Colors.AscentTwo} />
                            </View>
                        </TouchableOpacity>
                    ))
                }

            </ScrollView>
        </>

    )
}

export default HomeScreen