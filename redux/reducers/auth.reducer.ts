import { IRegistrationPayload, IUser } from "@/types";
import { handleFetchUserProfile, handleLoginAction, handleRegistrationAction } from "@/utils/actions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface IinitialState {
    isLoading: boolean
    isError: boolean,
    errMSg: string,
    isSuccess: boolean,
    user: IUser,
    userListing: any
    token: string,

};


const initialState: IinitialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    user: {} as any,
    userListing: {},
    token: "",
    errMSg: ""
}


const login = createAsyncThunk("login", async (params: { email: string, password: string }, thinkApi) => {
    const { email, password } = params;
    try {
        const resp = await handleLoginAction({ email, password });
        if (typeof (resp) === "string") {
            return thinkApi.rejectWithValue(resp)
        }
        return resp
    } catch (error: any) {
        thinkApi.rejectWithValue(error.message)
    }
})



const register = createAsyncThunk("register", async (params: IRegistrationPayload, thinkApi) => {
    try {
        const resp = await handleRegistrationAction(params);
        if (typeof (resp) === "string") {
            return thinkApi.rejectWithValue(resp)
        }
        return resp
    } catch (error: any) {
        return thinkApi.rejectWithValue(error.message)
    }
})

const fetUserProfile = createAsyncThunk("fetchUserProfile", async (params: { token: string }, thinkApi) => {
    try {
        const res = await handleFetchUserProfile(params.token);
        if (typeof (res) === "string") {
            return thinkApi.rejectWithValue(res)
        }
        return res
    } catch (error: any) {
        return thinkApi.rejectWithValue(error.message)
    }
})

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {} as any;
            state.token = ""
            state.userListing = {}
        },
        resetStatus: (state) => {
            state.isError = false;
            state.errMSg = "";
            state.isLoading = false;
            state.isSuccess = false;
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload
        },
        setUserListingState: (state, action) => {
            state.userListing = action.payload;
        }



    },
    extraReducers: builder => {
        // pending state 
        builder.addCase(login.pending, state => {
            state.isLoading = true;
            state.isError = false;
            state.errMSg = ""
        });
        // success state 
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.login.user;
            state.token = action.payload.login.token;
            state.isSuccess = true;
            state.errMSg = ""
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false
            state.errMSg = action.payload as any;
        })

        // registration cases 
        builder.addCase(register.pending, state => {
            state.isError = false;
            state.isLoading = true;
            state.errMSg = "";
            state.isSuccess = false;
        })

        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.register.token;
            state.user = action.payload.register.user;
            state.isSuccess = true;
        })

        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errMSg = action.payload as any;
            state.isSuccess = false;
        })





        builder.addCase(fetUserProfile.pending, state => {
            state.isError = false;
            state.isLoading = true;
            state.errMSg = "";
            state.isSuccess = false;
        })

        builder.addCase(fetUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isSuccess = true
        })
        // rehydration error fix 

        builder.addCase('persist/REHYDRATE', (state, action) => {
            state.isError = false;
            state.errMSg = "";
            state.isLoading = false;
            state.isSuccess = false;
        })
    }
})


export { login, register, fetUserProfile }
export default AuthSlice.reducer
export const { logout, resetStatus, updateUser, updateToken, setUserListingState } = AuthSlice.actions