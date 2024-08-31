import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        showSliderMenu: false,
        selectedCategory: 'none'
    },
    reducers: {
        setShowSlider( state, action) {
            state.showSliderMenu = action.payload;
        },
        setSelectedCategory(state, action){
            state.selectedCategory = action.payload;
        }
    }
})

export const  {setShowSlider, setSelectedCategory} = navSlice.actions;

export default navSlice.reducer;