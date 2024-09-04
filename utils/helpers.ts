import { GraphQLClient } from "graphql-request"
import { Dispatch, SetStateAction } from "react";
import Toast from "react-native-toast-message";
const calculatePercentage = (originalPrice: number, discountPrice: number) => {
    const discountAmount = originalPrice - discountPrice;

    const percent = discountAmount / originalPrice * 100

    return parseFloat(percent.toFixed(2))
}



const gql_client = new GraphQLClient("https://nutritious-lisbeth-testingxyz-5f3d2a31.koyeb.app/graphql", {
})



const handleFileUpload = async (data: FormData, setuploadingStatus: Dispatch<SetStateAction<boolean>>) => {
    setuploadingStatus(true)
    try {
        console.log("uploading...")

        const res = await fetch("https://nutritious-lisbeth-testingxyz-5f3d2a31.koyeb.app/api/v1/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: data
        })

        const apiRes = await res.json();
        console.log(apiRes)
        console.log("uploaded successfully.")
        return {
            success: true,
            message: apiRes.message,
            response: apiRes.files
        }
    } catch (error) {
        console.log("uploading error", error)
        return {
            success: false,
            message: "Unable to upload file."
        }
    } finally {
        setuploadingStatus(false)
    }
}



const handleFileDelete = async (data: string[], setDeletingStatus: Dispatch<SetStateAction<boolean>>) => {
    setDeletingStatus(true);
    try {

    } catch (error) {
        return {
            success: false,
            message: "Unable to Delete file."
        }

    } finally {
        setDeletingStatus(false)
    }
}


function timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return `${interval} years ago`;
    }

    const months = Math.floor(seconds / 2592000);
    if (months > 1) {
        return `${months} months ago`;
    }

    const weeks = Math.floor(seconds / 604800);
    if (weeks > 1) {
        return `${weeks} weeks ago`;
    }

    const days = Math.floor(seconds / 86400);
    if (days > 1) {
        return `${days} days ago`;
    }

    const hours = Math.floor(seconds / 3600);
    if (hours > 1) {
        return `${hours} hours ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes > 1) {
        return `${minutes} minutes ago`;
    }

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    }

    return 'just now'; // Fallback for very recent times
}





const showToast = (message: string, type: string, message2: string) => {

    return Toast.show({
        type: type,
        text1: message,
        text2: message2 ? message2 : undefined
    })
}

export { calculatePercentage, gql_client, showToast, handleFileUpload, timeAgo }