import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import img from "../img/messo.png"
import {login} from '../redux/apiCall'
import {loginStart,loginFailed} from '../redux/userReducer'

const Wrapper=styled.div`
display: flex;
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
background: linear-gradient(to right,rgb(255, 182, 185),rgb(250, 227, 217));
`
const AdminInput=styled.div`
height: 70vh;
width: 20vw;
min-width: 250px;
background-color: white;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
border-radius: 5px;
background-color: white;
/* background: linear-gradient(to right ,rgb(249, 206, 238),rgb(249, 243, 238)); */
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);;
`
const Top=styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`
const Title=styled.span`
font-size: 20px;
font-weight: 600;
letter-spacing: 1px;
font-family: 'Varela Round';
`
const LogoContainer=styled.div`
`
const Logo=styled.img`
width: 5rem;
`

const Center=styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Input=styled.input`
margin: 10px;
border: none;
padding: 5px;
opacity: 0.5;
font-size: 12px;
font-family: 'Varela Round';
outline: none;
border-bottom: 3px solid rgb(166, 177, 225);
`

const Bottom=styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`
const Button=styled.button`
width: 130px;
padding: 7px 0px;
border: none;
border-radius: 10px;
font-family: 'Varela Round';
color: white;
cursor: pointer;
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);;
background: linear-gradient(to right, rgb(66, 72, 116) , rgb(166, 177, 225));
opacity: 0.7;
transition: all 0.2s ease;
&:hover{
opacity: 1;
transform: scale(1.1);
}
`
const Link=styled.a`
font-size: 12px;
color: lightblue;
cursor: pointer;
font-family: 'Varela Round';
`
const Error=styled.span`
color: red;
`

function Login() {
  const {isFatching , isError}=useSelector(state=>state.user)

  const dispatch=useDispatch()
  const [username,setUsername]=useState(null)
  const [password,setPassword]=useState(null)

const handleLogin= async(e)=>{
  e.preventDefault()
  login(dispatch,{username,password})
}

  return (
    <Wrapper>
      <AdminInput>
          <Top>
            <Title>Welcome</Title>
            <LogoContainer>
            <Logo src={img}/>
            </LogoContainer>
          </Top>
          <Center>
            <Input type="text" placeholder="Email" onChange={(e)=>{ setUsername(e.target.value) }}/>
            <Input type="password" placeholder="Password" onChange={(e)=>{ setPassword(e.target.value) }}/>
            {isError && <Error>Somthing went wrong...</Error>}
          </Center>
          <Bottom>
             <Button onClick={handleLogin} disabled={isFatching}>Login</Button>
             <Link>Don't have an account?Sign Up</Link>
          </Bottom>
      </AdminInput>
    </Wrapper>
  );
}

export default Login;
