import { Icategory, Inotifications } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


type InitialStateTypes = {
    category: Icategory[],
    notifications: Inotifications[]
}

const InitialState: InitialStateTypes = {
    category: [],
    notifications: []

}
const MainSlice = createSlice({
    name: "main",
    initialState: InitialState,
    reducers: {
        setCategories: (state, action) => {
            state.category = action.payload
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload
        },
        updateNotificationStatus: (state, action) => {
            const isExists = state.notifications.findIndex(n => n._id.toString() === action.payload._id.toString());

            if (!isExists) {
                return
            }
            state.notifications[isExists] = action.payload
        },
        removeAlldata: (state) => {
            state.category = [];
            state.notifications = [];
        }
    }

})

export const { setCategories, setNotifications, updateNotificationStatus, removeAlldata } = MainSlice.actions

export default MainSlice.reducer