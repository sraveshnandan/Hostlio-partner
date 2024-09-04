/* This file only exports all types declarations. */



export interface IRegistrationPayload {
    email: string
    password: string
    first_name: string
    last_name: string
    avatar?: {
        public_id: string,
        url: string
    }
}

export interface IUserProfilLinks {
    name: string,
    icon: string,
    link?: string
}




export interface IUser {
    _id: string,
    first_name: string,
    last_name: string,
    avatar: {
        public_id: string,
        url: string
    },
    email: string,
    email_verified: Boolean,
    role: string,
    phone_no: number,
    email_verification?: {
        otp: string,
        expiry: string
    },
    recomendation: {

    },
    createdAt: Date,
    updatedAt: Date
}


export interface Icategory {
    _id: string,
    image: {
        public_id: string,
        url: string
    },
    creator: IUser,
    cretedAt: Date,
    updatedAt: Date
}

export interface Inotifications {
    _id: string
}