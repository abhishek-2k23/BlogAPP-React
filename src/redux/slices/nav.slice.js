import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        showSliderMenu: false,
    },
    reducers: {
        setShowSlider( state, action) {
            state.showSliderMenu = action.payload;
        }
    }
})

export const  {setShowSlider} = navSlice.actions;

export default navSlice.reducer;