import { View, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AuthContainer, BackButton, Button, Header, PrefrenceCard } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
const prefrences = [
    {
        name: "Hostel",
        icon: require("../../assets/images/hostel.jpg")
    },
    {
        name: "PG",
        icon: require("../../assets/images/PG.jpg")
    },
    {
        name: "Flat",
        icon: require("../../assets/images/flat.jpg")
    }
]

export interface IPrefrenceOptions {
    Hostel: boolean,
    PG: boolean,
    Flat: boolean
}

const PrefrenceScreen = () => {
    const [recomendations, setRecomendations] = useState<string[]>([]);


    const handleOptionClick = useCallback((value: string) => {

        let rec = recomendations
        const isExists = rec.findIndex(r => r === value);
        if (isExists !== -1) {
            rec.splice(isExists, 1);
            setRecomendations(rec)
        }

        rec.push(value);
        setRecomendations(rec)

    }, [recomendations.length])


    const handleRecomendation = () => {
        let recomendation: Record<string, boolean> = {
            Hostel: false,
            PG: false,
            Flat: false
        }

        // Update object values based on arra

        recomendations.forEach(text => {
            if (recomendation.hasOwnProperty(text)) {
                recomendation[text] = true
            }
        })

        return recomendation

    }

    console.log("final option", handleRecomendation())

    return (
        <SafeAreaView className='flex-1 pt-20 px-2'>
            <BackButton />
            <ScrollView className='flex-1 flex-grow '>
                <Header center title='Choose your prefrences' subtitle='For more personalised recomendations.' />

                <View className='flex-row self-center my-4'>
                    {
                        prefrences.map((item, index) => (
                            <PrefrenceCard isTrue={recomendations.includes(item.name)} key={index} label={item.name} iconName={item.icon} onPress={(value) => { handleOptionClick(value); }} />
                        ))
                    }
                </View>

            </ScrollView>
            <View className='absolute bottom-8  self-center w-full   '>
                <Button lable='Add prefrence' onPress={() => { }} Icon={"arrow-forward"} />
            </View>
        </SafeAreaView>
    )
}

export default PrefrenceScreen