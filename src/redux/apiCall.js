import { publicRequest ,userRequest } from "../requestMethods"
import { loginFailed, loginStart, loginSuccess } from "./userReducer"
import { addProductStart,addProductSuccess,addProductFailed } from "./productReducer"

export const login= async(dispatch,user)=>{
    dispatch(loginStart())
    try{
      const res=await publicRequest.post("auth/login",user)
      console.log(res.data)
      dispatch(loginSuccess(res.data))
    }catch(err){
      dispatch(loginFailed())
    }
}

export const addProduct= async(dispatch,product)=>{
  dispatch(addProductStart())
  try{
    const res=await userRequest.post("products/add",product)
    console.log(res.data)
    dispatch(addProductSuccess())
  }catch(err){
    dispatch(addProductFailed())
  }
}
