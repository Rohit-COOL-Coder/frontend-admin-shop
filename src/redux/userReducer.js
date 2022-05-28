import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        isFatching:false,
        currentUser:null,
        isError:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFatching=true
        },
        loginSuccess:(state,action)=>{
            state.isFatching=false
            state.currentUser=action.payload
            state.isError=false
        },
        loginFailed:(state)=>{
            state.isFatching=false
            state.isError=true
        }
    }
})

export const {loginStart,loginSuccess,loginFailed}=userSlice.actions
export default userSlice.reducer
