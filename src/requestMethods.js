import axios from "axios"
import { useSelector } from "react-redux"

const baseUrl="https://rohitshop.herokuapp.com/api"
const data=localStorage.getItem("persist:root")
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjQxNTZjNTY5ZWI1MmQ0OGI1NDIyYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MzYwOTA5MCwiZXhwIjoxNjUzODY4MjkwfQ.68zJnqnAJqXZ51B9j0fym1GGpJHtaFtWQtcwJq37E_c"
// JSON.parse(JSON.parse(data)?.user).currentUser?.accessToken
export const publicRequest=axios.create({
    baseURL:baseUrl
})

export const userRequest=axios.create({
    baseURL:baseUrl,
    headers:{ token:`Bearer ${token}`}
})