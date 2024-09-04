import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { handleGetUserNotifications } from '@/utils/actions'
import { showToast, timeAgo } from '@/utils'
import { setNotifications } from '@/redux/reducers/main.reducers'
import { EmptyBox } from '@/components'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants'
import Animated, { FadeInDown } from 'react-native-reanimated'

const NotificationsScreen = () => {
    const dispatch = useDispatch()
    const { user, token } = useSelector((state: RootState) => state.auth);
    const { notifications } = useSelector((state: RootState) => state.main);
    const [loading, setloading] = useState<boolean>(false);
    const [refreshing, setrefreshing] = useState<boolean>(false)

    useEffect(() => {
        setAllUserNotifications()
    }, [])

    const setAllUserNotifications = async () => {
        setloading(true)
        try {
            const allNotification: any = await handleGetUserNotifications(token);
            if (typeof (allNotification) === "string") {
                return showToast("Unable to fetch your notifications", "error", "Please try again.")
            }
            dispatch(setNotifications(allNotification.getAllNotifications));
            return showToast("Notifications fetched successfully.", "success", "Everything is up to dated.")
        } catch (error) {
            console.log("err while fetching notifications", error);
            return showToast("Unable to fetch your notifications", "error", "")
        } finally {
            setloading(false)
        }
    }




    return (
        <>
            {!notifications.length && (
                <EmptyBox title='No notification found.' />
            )}

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={setAllUserNotifications} />} className='flex-1 px-[2%] py-2'>

                {notifications &&
                    notifications.length > 0 && (
                        <View>
                            {
                                notifications.map((item: any, index) => (
                                    <Animated.View key={index} entering={FadeInDown.delay(index * 100).springify()}>
                                        <View className={`p-2 rounded-md bg-white mb-3`} >

                                            {/* header  */}
                                            <View className='flex-row  p-2  items-center justify-between'>
                                                <Ionicons
                                                    color={Colors.Primary}
                                                    size={22}
                                                    name='notifications-circle-outline' />
                                                <View className='flex-row items-center'>
                                                    <Ionicons name='time-outline' size={18} />
                                                    <Text className='text-gray-500 font-semibold ml-2'>{timeAgo(new Date(item?.createdAt))}</Text>
                                                </View>
                                            </View>

                                            {/* body  */}

                                            <View className='mt-1 pl-2'>
                                                <Text className='text-xl font-semibold text-Primary'>{item.title}</Text>
                                            </View>

                                            <View className='p-2'>
                                                <Text className='text-md text-gray-800 font-medium'>{item.description}</Text>
                                            </View>

                                        </View>
                                    </Animated.View>
                                ))
                            }
                        </View>
                    )
                }


            </ScrollView>
        </>
    )
}

export default NotificationsScreen