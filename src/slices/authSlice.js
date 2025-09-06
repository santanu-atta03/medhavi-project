import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    signupData : null,
    loading : false,
    reset : false,
    token: localStorage.getItem("token") || null
};

const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setSignupData(state, value){
            state.signupData = value.payload
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setReset(state, value) {
            state.reset = value.payload
        },
        setToken(state, value){
            state.token = value.payload
        },
    }
})

export const {setToken, setSignupData, setLoading, setReset} = authSlice.actions;
export default authSlice.reducer;