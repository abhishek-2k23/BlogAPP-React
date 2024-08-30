import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./slices/nav.slice";

const store = configureStore({
    reducer: {
        nav: navSlice,
    }
})

export default store;