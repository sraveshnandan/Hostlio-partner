import { gql } from "graphql-request";
import { gql_client } from "./helpers";
import { IRegistrationPayload } from "@/types";
import { setCategories } from "@/redux/reducers/main.reducers";

const handleLoginAction = async (data: { email: string, password: string }) => {
    try {
        const query = gql`
        query LOGIN($logindata: LoginInput) {
            login(data: $logindata) {
                message
                user {
      _id
      email
      email_verified
      first_name
      last_name
      avatar{
        public_id
        url
      }
      recomendation{
        Hostel
        PG
        flat
        city
      }
      role
      phone_no
      createdAt
    }
            token
            }
        }
        `;
        const variables = {
            logindata: {
                ...data
            }
        }
        const res = await gql_client.request(query, variables);
        return res
    } catch (error: any) {
        console.log("err occured while login:", error.response.errors[0].message);
        return error.response.errors[0].message

    }
}

const handleRegistrationAction = async (data: IRegistrationPayload) => {
    try {
        const query = gql`
        mutation Registration($registationdata: RegisterInput) {
            register(data: $registationdata) {
                message
                user {
      _id
      email
      email_verified
      first_name
      last_name
      avatar{
        public_id
        url
      }
      recomendation{
        Hostel
        PG
        flat
        city
      }
      role
      phone_no
      createdAt
    }
                token
            }
        }
        `
        const variables = {
            registationdata: { ...data }
        }

        const res = await gql_client.request(query, variables);
        return res
    } catch (error: any) {
        console.log("err occured while registration:", error.response.errors[0].message);
        return error.response.errors[0].message
    }
}

const handleFetchUserProfile = async (token: string) => {
    try {
        const query = gql`
        
        query GetUserProfile {
  fetchUserProfile {
    user {
      _id
      email
      email_verified
      first_name
      last_name
      avatar{
        public_id
        url
      }
      recomendation{
        Hostel
        PG
        flat
        city
      }
      role
      phone_no
      createdAt
    }
    token
  }
}
        `

        const resp: any = await gql_client.setHeader("token", token).request(query);
        return resp.fetchUserProfile
    } catch (error: any) {
        console.log("err occured while fetching user profile:", error.response.errors[0].message);
        return error.response.errors[0].message
    }
}

const handleOTPVerify = async (email: string, otp: string) => {
    try {

        const query = gql`
        query VERIFYACCOUNT($email: String!, $otp: String) {
            verifyAcount(email: $email, otp: $otp)
        }
        `
        const variables = {
            email, otp
        }

        const res: any = await gql_client.request(query, variables);
        return res.verifyAcount

    } catch (error: any) {
        console.log("err occured while verifying otp:", error.response.errors[0].message);
        return error.response.errors[0].message
    }
}

const HandleOTPResendAction = async (email: string) => {
    try {
        const query = gql`
        query ResendEmail($email: String!) {
  resendEmail(email: $email)
}
        `

        const variables = {
            email
        }

        const res: any = await gql_client.request(query, variables);
        return res.resendEmail
    } catch (error: any) {
        console.log("err occured while resending otp:", error.response.errors[0].message);
        return error.response.errors[0].message
    }
}



// password reset 


const handleForgotPasswordAction = async (email: string) => {
    try {

        const query = gql`
      query handleForgotPassword($email:String!){
        forgotPassword(email:$email)
      }
      `;
        const variables = {
            email
        }

        const res: any = await gql_client.request(query, variables);

        return {
            success: true,
            res
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.response.errors[0].message
        }
    }
}


const handlePasswordResetAction = async (data: any) => {
    try {

        const query = gql`
      query ResetPassword($data:PasswordResetInput){
    resetPassword(data:$data)
  }
      `;

        const variables = {
            data: { ...data }
        }

        const res = await gql_client.request(query, variables);
        return {
            success: true,
            res
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.response.errors[0].message
        }
    }
}

const handleGetAllCategories = async (dispatch: any) => {
    try {

        const query = gql`
        query GetAllCategory{
            categories(limit:10){
                _id
                name
                image{
                    public_id
                    url
                }
                creator{
                    _id
                }
            }
        }
        `;
        const res: any = await gql_client.request(query);
        dispatch(setCategories(res.categories))
    } catch (error: any) {
        console.log("err occured while resending otp:", error.response.errors[0].message);
        return error.response.errors[0].message
    }
}

const handleProfileUpdateAction = async (data: any, token: string) => {
    try {
        const query = gql`
        mutation UpdateUserProfile($dataToUpdate: UpdateProfileInput) {
            updateProfile(data: $dataToUpdate) {
                user {
      _id
      email
      email_verified
      first_name
      last_name
      avatar{
        public_id
        url
      }
      recomendation{
        Hostel
        PG
        flat
        city
      }
      role
      phone_no
      createdAt
    }
                message
                token
            }
        }
        `;
        const variables = {
            dataToUpdate: {
                ...data
            }
        }

        const res: any = await gql_client.setHeader("token", token).request(query, variables);
        return {
            success: true,
            res
        }


    } catch (error: any) {
        console.log("err occured while updating profile:", error.response.errors[0].message);
        return {
            success: false,
            message: error.response.errors[0].message
        }
    }
}

const handleListingCraeteAction = async (data: any, token: string) => {
    try {
        const query = gql`
                mutation CreateNewListing($newListData:CreateListingInput){
                    createListing(data:$newListData){
                        message
                        listing{
                            _id
                            name
                            monthly_rent
                            electricity_cost
                            banners{
                            url
                            public_id
                            }
                            extra{
                            main_city
                            details
                            distance{
                                railway_station
                                mall
                                library
                                medical_shop
                            }
                            for_all
                            for_boys
                            for_family
                            for_girls
                            }
                            category{
                            _id
                            }
                            facilities
                            opening_time
                            closing_time
                            address
                            no_of_rooms
                            monthly_rent
                            electricity_cost
                            owner{
                            _id
                            }
                        }
                    }
                }

        `;
        const variables = {
            newListData: {
                ...data
            }
        }
        const res: any = await gql_client.setHeader("token", token).request(query, variables);
        return {
            success: true,
            res
        }
    } catch (error: any) {
        console.log("err occured while resending otp:", error.response.errors[0].message);
        return {
            success: false,
            message: error.response.errors[0].message
        }

    }
}

const handleListingUpdateAction = async (data: any, listingId: string, token: string) => {

    try {
        const query = gql`
        mutation UpdateListing($newListData:CreateListingInput){
            updateListing(data:$newListData){
                message
                    listing{
                        _id
                            name
                            monthly_rent
                            electricity_cost
                            banners{
                            url
                            public_id
                            }
                            extra{
                            main_city
                            details
                            distance{
                                railway_station
                                mall
                                library
                                medical_shop
                            }
                            for_all
                            for_boys
                            for_family
                            for_girls
                            }
                            category{
                                _id
                            }
                            facilities
                            opening_time
                            closing_time
                            address
                            no_of_rooms
                            monthly_rent
                            electricity_cost
                            owner{
                            _id
                            }
                        }
            }
        }
        `;
        const variables = {
            newListData: {
                ...data,
            }
        }

        const res: any = await gql_client.setHeader("token", token).request(query, variables);
        return {
            success: true,
            res
        }

    } catch (error: any) {
        console.log("err occured while updating listing otp:", error.response.errors[0].message);
        return {
            success: false,
            message: error.response.errors[0].message
        }
    }

}


const GetUserListing = async (token: string) => {
    try {

        const query = gql`
        query GEtUserlisting {
            getUserListing{
                _id
                            name
                            monthly_rent
                            electricity_cost
                            banners{
                            url
                            public_id
                            }
                            contact_no
                            extra{
                            main_city
                            details
                            
                            distance{
                                railway_station
                                mall
                                library
                                medical_shop
                            }
                            for_all
                            for_boys
                            for_family
                            for_girls
                            }
                            category{
                            _id
                            name,
                            image{
                                public_id,
                                url
                            }
                            }
                            facilities
                            opening_time
                            closing_time
                            address
                            no_of_rooms
                            monthly_rent
                            electricity_cost
                            owner{
                            _id
                            first_name
                            last_name
                            avatar{
                                public_id
                                url
                            }
                            phone_no
                            email
                            }
                
            }
        }
        `;

        const res: any = await gql_client.setHeader("token", token).request(query);


        return res


    } catch (error: any) {
        console.log("err occured while  geting user listing:", error.response.errors[0].message);
        return error.response.errors[0].message
    }
}


const handleGetUserNotifications = async (token: string) => {
    try {
        const query = gql`query GETUSRNOtification{
            getAllNotifications(limit:10){
              _id
              unreaded
              title
              description
              createdAt
              updatedAt
            }
          }`;
        const res = await gql_client.setHeader("token", token).request(query);
        return res
    } catch (error: any) {
        console.log("err occured while  geting user notification:", error.response.errors[0].message);
        return {
            success: false,
            message: error.response.errors[0].message
        }
    }
}

const handleNotificationStatus = async (id: string, token: string) => {
    try {
        const query = gql`
        mutation updateNotification{
            updateNotification(ID:id){
                _id
                unreaded
                title
                description
                createdAt
                updatedAt
            }
        }
        `;

        const res = await gql_client.setHeader("token", token).request(query);
        return res

    } catch (error: any) {
        console.log("err occured while  updating user notification:", error.response.errors[0].message);
        return {
            success: false,
            message: error.response.errors[0].message
        }
    }
}


export { handleLoginAction, handleRegistrationAction, handleFetchUserProfile, handleOTPVerify, HandleOTPResendAction, handleGetAllCategories, handleProfileUpdateAction, handleListingCraeteAction, GetUserListing, handleListingUpdateAction, handleGetUserNotifications, handleNotificationStatus, handleForgotPasswordAction, handlePasswordResetAction }