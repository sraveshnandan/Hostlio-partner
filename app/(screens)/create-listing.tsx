import { View, ScrollView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { BannerSelector, Button, FacilitiesSelector, Header, InputBox, Loader, Picker, StepProgress, ToggleSwitches } from '@/components';
import { ImagePickerAsset } from 'expo-image-picker';
import { handleFileUpload, showToast } from '@/utils';
import { handleListingCraeteAction } from '@/utils/actions';
import { router } from 'expo-router';
import { setUserListingState } from '@/redux/reducers/auth.reducer';

const CreateListingScreen = () => {
    const dispatch = useDispatch()
    const { user, token } = useSelector((state: RootState) => state.auth);
    const { category } = useSelector((state: RootState) => state.main)
    const [steps, setsteps] = useState(["genral", "banners", "extra", "contact"]);
    const [currentStep, setcurrentStep] = useState<number>(0);
    const [loading, setloading] = useState(false);
    const [uploading, setuploading] = useState(false)
    const [NewListingData, setNewListingData] = useState({
        name: "",
        category: "",
        banners: [
        ],
        owner: user._id,
        facilities: [],
        opening_time: "",
        closing_time: "",
        address: "",
        contact_no: "",
        no_of_rooms: 1,
        monthly_rent: 0,
        electricity_cost: 0,
    })
    const [NewListingExtraData, setNewListingExtraData] = useState({
        main_city: "",
        details: "",
        friends_allowed: false,
        for_all: false,
        for_boys: false,
        for_girls: false,
        for_family: false
    });
    const [NewListingDistanceData, setNewListingDistanceData] = useState({
        railway_station: 0,
        library: 0,
        mall: 0,
        medical_shop: 0
    });

    const [ListingBanners, setListingBanners] = useState<ImagePickerAsset[]>([])
    // step handler 
    const onNext = async () => {
        if (currentStep === 3) {
            await handleCreateListing()

        }
        if (currentStep !== 3) {
            return setcurrentStep(prev => prev + 1)
        }

    }
    const onBack = () => {
        if (currentStep === 0) {
            return
        }

        setcurrentStep(prev => prev - 1)
    }

    // handling listing create fn 
    const handleCreateListing = async () => {
        Keyboard.dismiss()
        try {
            let newListingPayload = {
                ...NewListingData,
                banners: [],
                extra: { ...NewListingExtraData, distance: NewListingDistanceData },
            }

            // preparing listing banners 
            if (!NewListingData.banners.length) {
                const formData = new FormData();
                ListingBanners.forEach((item) => {
                    formData.append("file", {
                        name: item.fileName || "listing banner",
                        type: item.mimeType,
                        uri: item.uri
                    } as any)
                })

                const uploadedBanner = await handleFileUpload(formData, setuploading);
                if (!uploadedBanner.success) {
                    return showToast("Unable to upload Images", "error", "Please check your internet connection.")
                }

                newListingPayload.banners = uploadedBanner.response

                setNewListingData(prev => ({ ...prev, banners: uploadedBanner.response }))
            }

            setloading(true)


            // sending final request 
            const newListing = await handleListingCraeteAction(newListingPayload, token);
            if (!newListing.success) {
                return showToast(newListing.message, "error", "Something went wrong.")
            }
            dispatch(setUserListingState(newListing.res.createListing.listing));
            showToast("Listing created successfully.", "error", "Your is successfully created.");
            setTimeout(() => {
                return router.replace(`/(tabs)/Home/`)
            }, 1500)


        } catch (error: any) {
            console.log("err while creating new listing", error);
            return showToast("Something went wrong.", "error", "Unable to create your listing.")
        } finally {
            setloading(false);
            setuploading(false)
        }
    }


    const handleFacilitiesUPdate = (data: string[]) => {
        setNewListingData(prev => ({ ...prev, facilities: data as any }))
    }

    return (


        <View className='flex-1 bg-white pt-2 px-[2%]'>
            {
                loading && (
                    <Loader loadingMessage='Please wait...' />
                )
            }
            {
                uploading && (
                    <Loader loadingMessage='Uploading Images...' />
                )
            }
            {/* steps  */}
            <StepProgress steps={steps} currentStep={currentStep} />

            {
                currentStep === 0 && (
                    // genral details 
                    <>
                        <ScrollView className=' mt-4 border-t-2 border-gray-100 mx-[1%]'>

                            <Header center title='Genral Details' subtitle='Please fill the field to enhance your listing SEO.' />

                            <View className='mt-4'>
                                <InputBox value={NewListingData.name} lable='Enter your listing name' placeholder='Listing name' onChange={(value) => setNewListingData(prev => ({ ...prev, name: value.trim() }))} />

                                <Picker label='Listing Ctaegory' items={category} onValueChange={(value) => { setNewListingData(prev => ({ ...prev, category: value.trim() })) }} />

                                <InputBox value={NewListingData.opening_time} lable='Opening Time' placeholder='Opening Time e.g: 08:00 AM' onChange={(value) => setNewListingData(prev => ({ ...prev, opening_time: value.trim() }))} />

                                <InputBox value={NewListingData.closing_time} lable='Closing Time' placeholder='Closing Time e.g: 09:00 PM' onChange={(value) => setNewListingData(prev => ({ ...prev, closing_time: value.trim() }))} />

                                <InputBox value={NewListingData.address} multiLine lable='Address' placeholder='e.g:  Bus Stand, Bihar Sahrif,(Nalanda),803101' onChange={(value) => setNewListingData(prev => ({ ...prev, address: value.trim() }))} />

                                <InputBox type='numeric' value={String(NewListingData.contact_no)} lable='Contact No:-' placeholder='e.g:  +91 9126126126' onChange={(value) => setNewListingData(prev => ({ ...prev, contact_no: String(value) }))} />

                                <InputBox type='numeric' value={String(NewListingData.monthly_rent)} lable='Montlly Rent' placeholder='e.g: ₹5000' onChange={(value) => setNewListingData(prev => ({ ...prev, monthly_rent: Number(value.trim()) }))} />

                                <InputBox type='numeric' value={String(NewListingData.electricity_cost)} lable='Electricty Cost' placeholder='e.g: ₹5000' onChange={(value) => setNewListingData(prev => ({ ...prev, electricity_cost: Number(value.trim()) }))} />

                                <InputBox type='numeric' value={String(NewListingData.no_of_rooms)} lable='Availabe Rooms' placeholder='e.g: 5' onChange={(value) => setNewListingData(prev => ({ ...prev, no_of_rooms: Number(value.trim()) }))} />

                            </View>
                        </ScrollView>


                    </>
                )
            }

            {
                currentStep === 1 && (
                    <>
                        <ScrollView className=' py-2'>
                            <Header title='Listing Images' center subtitle='Add some images of your  property.' />
                            <BannerSelector onBannerSellected={(value) => setListingBanners(value)} />
                        </ScrollView>
                    </>
                )
            }
            {
                currentStep === 2 && (
                    <>
                        <ScrollView className=' py-2'>
                            <Header title='Amanities' center subtitle='Add the facilities that your property has.' />
                            <FacilitiesSelector selectedItem={NewListingData.facilities} onItemSelected={(value) => handleFacilitiesUPdate(value)} />
                        </ScrollView>


                    </>
                )
            }
            {
                currentStep === 3 && (
                    <>
                        <ScrollView className='py-2 px-[2%]'>
                            <Header title='Extra Details' center subtitle='Provide some extra details about your  property.' />

                            <View className='mt-4'>
                                <InputBox lable='Main City' placeholder='Property main city' onChange={(value) => setNewListingExtraData(prev => ({ ...prev, main_city: value }))} />

                                <InputBox lable='Description' placeholder='Property short description.' multiLine onChange={(value) => setNewListingExtraData(prev => ({ ...prev, details: value }))} />

                                <View
                                    className='my-4 border-b-2 '
                                >
                                    <Header title='Recomendation Details' center />
                                </View>

                                <View className=' bg-gray-200 p-2 rounded-md'>
                                    <ToggleSwitches title={"For All"} subtitle="This property is for all." onValueChange={(value) => setNewListingExtraData(prev => ({ ...prev, for_all: !value }))} />

                                    <ToggleSwitches title={"For Boys Only"} subtitle="This property is only for Boys." onValueChange={(value) => setNewListingExtraData(prev => ({ ...prev, for_boys: !value }))} />

                                    <ToggleSwitches title={"For Girls Only"} subtitle="This property is only for Girls." onValueChange={(value) => setNewListingExtraData(prev => ({ ...prev, for_girls: !value }))} />
                                    <ToggleSwitches title={"For Family Only"} subtitle="This property is only for Family." onValueChange={(value) => setNewListingExtraData(prev => ({ ...prev, for_family: !value }))} />
                                </View>

                                <View
                                    className='my-4 border-b-2 '
                                >
                                    <Header title='Distance  Details' center subtitle='Add nearest distance from your property in Meater.' />
                                </View>

                                <View className='my-2'>
                                    <InputBox type='numeric' lable='Nearest Railway station' placeholder='e.g: 900 M' onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, railway_station: Number(value) }))} />

                                    <InputBox type='numeric' lable='Nearest Library' placeholder='e.g: 100 M' onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, library: Number(value) }))} />

                                    <InputBox type='numeric' lable='Nearest Mall/Supermarket' placeholder='e.g: 500 M' onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, mall: Number(value) }))} />

                                    <InputBox type='numeric' lable='Nearest Medical Shop' placeholder='e.g: 250 M' onChange={(value) => setNewListingDistanceData(prev => ({ ...prev, medical_shop: Number(value) }))} />
                                </View>

                            </View>
                        </ScrollView>


                    </>
                )
            }

            {/* Action Buttons  */}
            <View className='-mx-[2%] px-2 rounded-t-md  bg-gray-200 flex-row items-center justify-between'>
                {
                    currentStep > 0 && (
                        <View className={`w-[48%] `}>
                            <Button outline lable='Go Back' onPress={() => onBack()} />
                        </View>
                    )
                }
                <View className={`${currentStep > 0 ? "w-[48%]" : "w-full "}`}>
                    <Button lable={currentStep === 3 ? "Post Listing" : "Next"} onPress={() => onNext()} />
                </View>
            </View>

        </View>
    )
}

export default CreateListingScreen