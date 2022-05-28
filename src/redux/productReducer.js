import { createSlice } from "@reduxjs/toolkit";


const productSlice=createSlice({
    name:"product",
    initialState:{
      isUploding:false,
      isSuccess:false,
      isError:false
    },
    reducers:{
        addProductStart:(state)=>{
           state.isUploding=true
           state.isSuccess=false
        },
        addProductSuccess:(state)=>{
            state.isUploding=false
            state.isSuccess=!state.isSuccess
        },
        addProductFailed:(state)=>{
            state.isUploding=false
            state.isError=true
        },
    }
})

export let {addProductStart,addProductSuccess,addProductFailed}=productSlice.actions
export default productSlice.reducer