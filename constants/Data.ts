import { IUserProfilLinks } from "@/types"
import { Dimensions } from "react-native"


const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("screen")


const wp = (value: number): number => {
    return ScreenWidth / 100 * value
}


const hp = (value: number): number => {
    return ScreenHeight / 100 * value
}


const UserProfileLinks: IUserProfilLinks[] = [
    // {
    //     name: "Get verified badge",
    //     icon: "checkmark-circle-outline",

    // },
    {
        name: "Give Feedback",
        icon: "star-outline",

    },

    {
        name: "Help Center",
        icon: "headset-outline",

    },
    {
        name: "Privacy Policy",
        icon: "lock-closed-outline",
        link: "/(screens)/privacy-policy"
    },
    {
        name: "Terms & Condition",
        icon: "newspaper-outline",
        link: "/(screens)/terms-condition"
    },
    {
        name: "Sign Out",
        icon: "log-out-outline",

    }
]

const Facilities: string[] = [
    "Bed", "AC/Cooler", "Attached Kitchen/Bathrooms", "Study Table", "Chair", "Parking", "Wifi", "Security Guards", "CCTV Camera", "Fan"
]


export { ScreenWidth, ScreenHeight, wp, hp, UserProfileLinks, Facilities }