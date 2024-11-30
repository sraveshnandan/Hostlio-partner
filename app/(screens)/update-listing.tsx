import { View, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { BannerSelector, Button, FacilitiesSelector, Header, InputBox, Loader, Picker, StepProgress, ToggleSwitches } from '@/components';
import { ImagePickerAsset } from 'expo-image-picker';
import { showToast } from '@/utils';
import { handleListingUpdateAction } from '@/utils/actions';
import { router } from 'expo-router';
import { setUserListingState } from '@/redux/reducers/auth.reducer';

const UpdateListingScreen = () => {
    const dispatch = useDispatch();
    const { user, token, userListing } = useSelector((state: RootState) => state.auth);
    const { category } = useSelector((state: RootState) => state.main);

    const [steps, setsteps] = useState(["genral", "banners", "extra", "contact"]);
    const [currentStep, setcurrentStep] = useState<number>(0);
    const [loading, setloading] = useState(false);
    const [uploading, setuploading] = useState(false);
    const [ListingData, setListingData] = useState<Record<string, any>>({...userListing,category:userListing?.category?._id})
    const [ListingBanners, setListingBanners] = useState<ImagePickerAsset[]>(userListing?.banners);
    const [ListingExtraData, setListingExtraData] = useState({
        main_city: userListing.extra.main_city,
        details: userListing.extra.details,
        friends_allowed: false,
        for_all: userListing.extra.for_all,
        for_boys: userListing.extra.for_boys,
        for_girls: userListing.extra.for_girls,
        for_family: userListing.extra.for_family
    })
    const [NewListingDistanceData, setNewListingDistanceData] = useState({
        railway_station: userListing?.extra?.distance?.railway_station | 100,
        library: userListing?.extra?.distance?.library | 100,
        mall: userListing?.extra?.distance?.mall | 100,
        medical_shop: userListing?.extra?.distance?.medical_shop | 100
    });
    const handleUpdateListing = async () => {
        Keyboard.dismiss();
        try {
            setloading(true);
            delete ListingData._id

            const updatePayload =
            {
                ...ListingData,
                category: ListingData?.category?._id ? ListingData?.category?._id : category,
                id: userListing._id,
                owner: user._id,
                extra: {
                    ...ListingExtraData, distance: NewListingDistanceData
                }
            }


            const updatedListing = await handleListingUpdateAction(updatePayload, userListing._id, token);
            if (!updatedListing.success) {
                return showToast(updatedListing.message, "error", "Something went wrong.");
            }

            dispatch(setUserListingState(updatedListing?.res?.updateListing.listing));
            showToast("Listing updated successfully.", "success", "Your listing has been successfully updated.");
            setTimeout(() => {
                return router.replace(`/(tabs)/Home/`);
            }, 1500);

        } catch (error: any) {
            console.log("err while updating listing", error);
            return showToast("Something went wrong.", "error", "Unable to update your listing.");
        } finally {
            setloading(false);
            setuploading(false);
        }
    };


    console.log(ListingData.category)


    return userListing && (
        <KeyboardAvoidingView behavior={
            Platform.OS === "ios" ? 'padding' : 'height'
        } className='flex-1 bg-white pt-2 px-[2%]'>
            {loading && <Loader loadingMessage='Please wait...' />}
            {uploading && <Loader loadingMessage='Uploading Images...' />}

            <StepProgress steps={steps} currentStep={currentStep} />

            {currentStep === 0 && (
                <ScrollView className=' mt-4 border-t-2 border-gray-100 mx-[1%]'>
                    <Header center title='General Details' subtitle='Update the fields below to edit your listing.' />
                    <View className='mt-4'>
                        <InputBox value={ListingData.name} lable='Enter your listing name' placeholder='Listing name' onChange={(value) => setListingData(prev => ({ ...prev, name: value.trim() }))} />

                        <Picker label='Listing Ctaegory' value={userListing.category} items={category} onValueChange={(value: any) => { setListingData(prev => ({ ...prev, category: value })) }} />

                        <InputBox value={ListingData.opening_time} lable='Opening Time' placeholder='Opening Time e.g: 08:00 AM' onChange={(value) => setListingData(prev => ({ ...prev, opening_time: value.trim() }))} />

                        <InputBox value={ListingData.closing_time} lable='Closing Time' placeholder='Closing Time e.g: 09:00 PM' onChange={(value) => setListingData(prev => ({ ...prev, closing_time: value.trim() }))} />

                        <InputBox value={ListingData.address} multiLine lable='Address' placeholder='e.g:  Bus Stand, Bihar Sahrif,(Nalanda),803101' onChange={(value) => setListingData(prev => ({ ...prev, address: value.trim() }))} />

                        <InputBox type='numeric' lable='Contact No:-' value={ListingData.contact_no ? String(ListingData.contact_no) : String(user.phone_no)} placeholder='e.g:  +91 9126126126' onChange={(value) => setListingData(prev => ({ ...prev, contact_no: String(value) }))} />

                        <InputBox type='numeric' value={String(ListingData.monthly_rent)} lable='Montlly Rent' placeholder='e.g: ₹5000' onChange={(value) => setListingData(prev => ({ ...prev, monthly_rent: Number(value.trim()) }))} />

                        {/* <InputBox type='numeric' value={ListingData.electricty_cost ? String(ListingData.electricty_cost) : String(0)} lable='Electricty Cost' placeholder='e.g: ₹5000' onChange={(value) => setListingData(prev => ({ ...prev, electricty_cost: Number(value.trim()) }))} /> */}

                        <InputBox type='numeric' value={String(ListingData.no_of_rooms)} lable='Availabe Rooms' placeholder='e.g: 5' onChange={(value) => setListingData(prev => ({ ...prev, no_of_rooms: Number(value.trim()) }))} />

                    </View>
                </ScrollView>
            )}
            {
                currentStep === 1 && (
                    <View className='mt-4' >
                        <Header title='Listing Images' center subtitle='Edit your listings banners.' />

                        <View className='my-4'>
                            <BannerSelector banners={ListingData.banners} onBannerSellected={(value) => console.log(value.length)} />
                        </View>
                    </View>
                )
            }

            {
                currentStep === 2 && (
                    <ScrollView className='my-4'>
                        <View className='border-b-2 border-b-gray-200'>
                            <Header title='Facilities' center />


                            <FacilitiesSelector selectedItem={ListingData.facilities} onItemSelected={(value) => setListingData(prev => ({ ...prev, facilities: value }))} />
                        </View>
                    </ScrollView>
                )
            }

            {
                currentStep === 3 && (
                    <ScrollView className='my-4'>
                        <Header title='Extra Details' center subtitle='update extra details about your  property.' />

                        <View className='mt-4'>
                            <InputBox lable='Main City' value={ListingData?.extra?.main_city} placeholder={ListingData?.extra?.main_city} onChange={(value) => setListingExtraData(prev => ({ ...prev, main_city: value }))} />
                            <InputBox value={ListingData?.extra?.details} lable='Description' placeholder={ListingData?.extra?.details} multiLine onChange={(value) => setListingExtraData(prev => ({ ...prev, details: value }))} />

                            <View
                                className='my-4 border-b-2 border-b-gray-200'
                            >
                                <Header title='Recomendation Details' center />
                            </View>

                            <View className=' bg-gray-200 p-2 rounded-md'>
                                <ToggleSwitches previous_data={ListingData?.extra?.for_all} title={"For All"} subtitle="This property is for all." onValueChange={(value) => setListingExtraData(prev => ({ ...prev, for_all: !value }))} />

                                <ToggleSwitches previous_data={ListingData?.extra?.for_boys} title={"For Boys Only"} subtitle="This property is only for Boys." onValueChange={(value) => setListingExtraData(prev => ({ ...prev, for_boys: !value }))} />

                                <ToggleSwitches previous_data={ListingData?.extra?.for_girls} title={"For Girls Only"} subtitle="This property is only for Girls." onValueChange={(value) => setListingExtraData(prev => ({ ...prev, for_girls: !value }))} />
                                <ToggleSwitches previous_data={ListingData?.extra?.for_family} title={"For Family Only"} subtitle="This property is only for Family." onValueChange={(value) => setListingExtraData(prev => ({ ...prev, for_family: !value }))} />
                            </View>


                            <View
                                className='my-4 border-b-2 border-b-gray-200 pb-4 '
                            >
                                <Header title='Distance  Details ' center subtitle='Add nearest distance from your property in Meater.' />
                            </View>


                            <View className='my-2'>
                                <InputBox type='numeric' value={`${String(userListing?.extra?.distance?.railway_station)}`} lable='Nearest Railway station' placeholder={`${userListing?.extra?.distance?.railway_station} M`} onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, railway_station: Number(value) }))} />

                                <InputBox type='numeric' value={`${String(userListing?.extra?.distance?.mall)}`} lable='Nearest Library' placeholder={`${userListing?.extra?.distance?.library}`} onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, library: Number(value) }))} />

                                <InputBox type='numeric' value={`${String(userListing?.extra?.distance?.mall)}`} lable='Nearest Mall/Supermarket' placeholder={`${userListing?.extra?.distance?.mall} M`} onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, mall: Number(value) }))} />

                                <InputBox type='numeric' value={`${String(userListing?.extra?.distance?.mall)}`} lable='Nearest Medical Shop' placeholder={`${userListing?.extra?.distance?.medical_shop} M`} onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, medical_shop: Number(value) }))} />
                            </View>




                        </View>

                    </ScrollView>
                )
            }

            <View className='-mx-[2%] px-2 rounded-t-md bg-gray-200 flex-row items-center justify-between'>
                {currentStep > 0 && (
                    <View className={`w-[48%]`}>
                        <Button outline lable='Go Back' onPress={() => setcurrentStep(prev => prev - 1)} />
                    </View>
                )}
                <View className={`${currentStep > 0 ? "w-[48%]" : "w-full "}`}>
                    <Button lable={currentStep === 3 ? "Update Listing" : "Next"} onPress={currentStep === 3 ? handleUpdateListing : () => setcurrentStep(prev => prev + 1)} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default UpdateListingScreen;
