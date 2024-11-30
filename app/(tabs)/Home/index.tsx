import { View, Image, ScrollView, Text, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { router, useNavigation } from 'expo-router'
import { Colors, hp } from '@/constants'
import { Button, Header, ImageSlider } from '@/components'
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { GetUserListing, handleGetAllCategories } from '@/utils/actions'
import { setUserListingState } from '@/redux/reducers/auth.reducer'
import { showToast } from '@/utils'


const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { user, token, userListing } = useSelector((state: RootState) => state.auth);
    const [refreshing, setrefreshing] = useState<boolean>(false);

    // settinh header data 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `Welcome  ${user.first_name}`,
            // user profile Photo 
            headerRight: () => (
                <TouchableOpacity onPress={() => router.push(`/(tabs)/Profile/`)} className='border border-white  shadow-md shadow-gray-200 bg-White   items-center justify-center w-10 h-10 rounded-full overflow-hidden'>
                    <Image source={{ uri: user.avatar.url }} resizeMethod='auto' className='w-full h-full  object-cover ' />
                </TouchableOpacity>
            )
        });

        handleGetAllCategories(dispatch)

        if (userListing && !userListing.name) {
            FetchUserListing()
        }
    }, [user]);


    const FetchUserListing = async () => {
        try {
            const res: any = await GetUserListing(token);

            if (typeof (res) === "string") {
                console.log("err while geting user listing", res);
                return showToast("You havent created any Listing yet!", "error", "Please create one to continue.")
            }

            const us = res.getUserListing
            dispatch(setUserListingState(us))
        } catch (error) {
            return showToast("Unable to fetch your listing", "error", "Please try again.")
        }
    }

    const handleRefresh = async () => {
        setrefreshing(true)
        try {
            const res: any = await FetchUserListing();
            if (typeof (res) === "string") {
                return showToast("Unable to fetch data", "error", "Please check your internet connection.")
            }
            return showToast("Data refreshed successfully.", "success", "")
        } catch (error) {
            return showToast("Unable to refreshed data", "error", "Please login again.")

        } finally {
            setrefreshing(false)
        }
    }



    return (

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />} centerContent className='flex-1 bg-white px-[2%]  py-2'>
            {
                !userListing.name ? (
                    <>
                        <View style={{ height: hp(30) }} className='p-2 rounded-md bg-white shadow-md shadow-gray-500 items-center justify-center mb-8 mt-4'>
                            <MaterialCommunityIcons name='resistor-nodes' size={90} color={"red"} />
                            <Text className='font-medium opacity-60 text-xl mt-4'>Looks like you don&apos;t created any listing.</Text>
                        </View>

                        <View style={{ height: hp(40) }} className='w-full  shadow-md shadow-gray-500  p-4 rounded-md bg-white '>
                            <Header title='Add Your First Listing' center subtitle='you are one step ahead to list your property.' />
                            <View className='items-center flex-grow pt-4'>
                                <Ionicons name='business-outline' size={100} color={Colors.Gray} />
                            </View>
                            <View className='absolute w-[95%]  self-center bottom-2 mx-auto '>
                                <Button Icon='storefront-outline' onPress={() => router.push("/(screens)/create-listing")} lable='Add my Property' />
                            </View>
                        </View>
                    </>
                ) : <View >
                    {
                        userListing.name && (
                            <View className=''>


                                <ImageSlider images={userListing.banners as any} />


                                <View className='flex-row items-center '>
                                    <Text numberOfLines={1} className='text-3xl text-Primary font-medium'>{userListing?.name.substring(0, 15)}...</Text>

                                    <Text className='ml-4 bg-gray-200 py-1 px-4 rounded-full text-AscentTwo font-semibold'>{userListing?.category?.name}</Text>
                                </View>

                                <Text className='mt-2 font-medium text-gray-500'>{userListing.address}</Text>


                                <View className='my-4 flex-row items-center justify-between'>

                                    <View className='w-[48%] border-2 border-gray-400 p-2 rounded-md  '>
                                        <Text className='text-lg font-semibold text-AscentTwo'>Monthly Rent</Text>
                                        <Text className='text-xl font-semibold text-green-600'>₹{userListing?.monthly_rent}/ month</Text>
                                    </View>

                                    <View className='w-[48%] border-2 border-gray-400 p-2 rounded-md'>
                                        <Text className='text-lg font-semibold text-AscentTwo'>Total Rooms</Text>
                                        <Text className='text-xl font-semibold text-green-600'>{userListing?.no_of_rooms}</Text>
                                    </View>
                                </View>

                                {/* for  */}

                                <View className='w-full flex-row items-center  my-4'>


                                    <View className={`bg-gray-200 mx-1 px-3 py-2 flex-row items-center rounded-full ${userListing?.extra?.for_all && "bg-green-600"}`}>
                                        <Text className={`font-semibold ${userListing?.extra?.for_all && "text-white"} mr-2`}>For All</Text>
                                    </View>
                                    <View className={`bg-gray-200 mx-1 px-3 py-2 flex-row items-center rounded-full ${userListing?.extra?.for_boys && "bg-green-600"}`}>
                                        <Text className={`font-semibold mr-2 ${userListing?.extra?.for_boys && "text-white"}`}>For Boys</Text>
                                    </View>

                                    <View className={`bg-gray-200 mx-1 px-3 py-2 flex-row items-center rounded-full ${userListing?.extra?.for_girls && "bg-green-600"}`}>
                                        <Text className={`font-semibold mr-2 ${userListing?.extra?.for_girls && "text-white"}`}>For Girls</Text>
                                    </View>

                                    <View className={`bg-gray-200 mx-1 px-3 py-2 flex-row items-center rounded-full ${userListing?.extra?.for_family === true && "bg-green-600"}`}>
                                        <Text className={`font-semibold mr-2 ${userListing?.extra?.for_family && "text-white"}`}>For Family</Text>
                                    </View>
                                </View>

                                {/* timings  */}

                                <View className='flex-row py-2  bg-gray-100 rounded-md my-4 items-center'>

                                    <View className='w-1/2 items-center justify-center'>
                                        <Octicons name='sun' size={35} />
                                        <Text className='text-AscentTwo mt-2 font-semibold'>Opening Time:</Text>
                                        <Text className='text-lg font-semibold'>{userListing?.opening_time}</Text>
                                    </View>

                                    <View className='w-1/2 items-center justify-center'>
                                        <Octicons name='moon' size={35} />
                                        <Text className='text-red-500 mt-2 font-semibold'>Closing Time:</Text>
                                        <Text className='text-lg font-semibold'>{userListing?.closing_time}</Text>
                                    </View>
                                </View>
                                {/* description  */}
                                <View className='mb-4'>
                                    <Header title='Description' />

                                    <Text className='text-md -mt-2 font-medium mb-4'>{userListing?.extra?.details}</Text>
                                </View>

                                {/* facilities  */}
                                <View className='mb-4'>
                                    <Header title='Facilities' />

                                    <View className='flex-row mt-2 flex-wrap'>
                                        {
                                            userListing?.facilities?.map((item: string, index: number) => (
                                                <Text className='bg-AscentTwo m-2 px-3 py-2 text-white font-semibold rounded-full' key={index}>{item}</Text>
                                            ))
                                        }
                                    </View>
                                </View>


                                {/* extra details  */}

                                <View className='my-4 p-2'>
                                    <Header title='Extra Details' />

                                    <View className='flex-row items-center justify-between my-2 border-b-2 border-b-gray-200 p-3 rounded-md '>
                                        <Text className='font-semibold text-lg text-AscentTwo'>Main City</Text>
                                        <Text className='font-semibold text-lg '>{userListing?.extra?.main_city}</Text>
                                    </View>

                                    <View className='flex-row items-center justify-between my-2 border-b-2 border-b-gray-200 p-3 rounded-md '>
                                        <Text className='font-semibold text-lg text-AscentTwo'>Railway Station</Text>
                                        <Text className='font-semibold text-lg '>{userListing?.extra?.distance?.railway_station / 1000} KM</Text>
                                    </View>

                                    <View className='flex-row items-center justify-between my-2 border-b-2 border-b-gray-200 p-3 rounded-md '>
                                        <Text className='font-semibold text-lg text-AscentTwo'>Library</Text>
                                        <Text className='font-semibold text-lg '>{userListing?.extra?.distance?.library / 1000} KM</Text>
                                    </View>

                                    <View className='flex-row items-center justify-between my-2 border-b-2 border-b-gray-200 p-3 rounded-md '>
                                        <Text className='font-semibold text-lg text-AscentTwo'>Medical Shop</Text>
                                        <Text className='font-semibold text-lg '>{userListing?.extra?.distance?.medical_shop / 1000} KM</Text>
                                    </View>

                                    <View className='flex-row items-center justify-between my-2  p-3 rounded-md '>
                                        <Text className='font-semibold text-lg text-AscentTwo'>Super Market</Text>
                                        <Text className='font-semibold text-lg '>{userListing?.extra?.distance?.mall / 1000} KM</Text>
                                    </View>

                                </View>



                            </View>
                        )
                    }

                </View>
            }
        </ScrollView>

    )
}

export default HomeScreen