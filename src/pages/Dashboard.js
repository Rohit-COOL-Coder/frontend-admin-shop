import React from 'react'
import styled from "styled-components"
import {Outlet} from "react-router-dom"
import Sidebar from "../components/Sidebar"

const Wrapper=styled.div`
display: flex;
`
const Left=styled.div`
display: flex;
flex: 1;
/* min-height: 10em; */
height: 100vh;
min-width: 10em;
position:sticky;
top: 0;
`
const Right=styled.div`
flex: 5;
min-height: 100vh;
background: linear-gradient(to right,rgb(166, 177, 225),rgb(220, 214, 247));
`

function Dashboard() {
  return (
    <Wrapper>
        <Left>
            <Sidebar/>
        </Left>
        <Right>
            <Outlet/>
        </Right>
    </Wrapper>
  )
}

export default Dashboard