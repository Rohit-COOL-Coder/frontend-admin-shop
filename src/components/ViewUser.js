import React, { useEffect, useState } from 'react'
import { faAddressBook, faArrowRight, faArrowRightToBracket, faBed, faCar, faDeleteLeft, faMoneyCheck, faMoneyCheckAlt, faPen, faPencilSquare, faRegistered, faRocket, faTrash } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { publicRequest, userRequest } from '../requestMethods'
import User from './User'

const Wrapper=styled.div`
display: flex;
justify-content: space-around;
align-items: center;
/* height: 100vh; */
flex-wrap: wrap;
`
const NewUserContainer=styled.div`
border-radius: 5px;
width: 45%;
min-width: 25rem;
padding: 1em 0em;
background: linear-gradient( to right ,rgb(220, 214, 247),rgb(244, 238, 255));
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 1em 1em ;
`
const AllUserContainer=styled.div`
border-radius: 5px;
width: 45%;
min-width: 25rem;
margin: 1em 1em ;
padding: 1em 0em;
background: linear-gradient( to right ,rgb(220, 214, 247),rgb(244, 238, 255));
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Table=styled.table`
width: 95%;
font-family: 'Varela Round';
margin-top: 1rem;

`
const TableRow=styled.tr`
background-color: rgb(127, 132, 135);
opacity: 0.7;
color: white;
`
const TableHead=styled.th`
padding: 15px 0px;
color: white;
background-color: rgb(44, 51, 51);
`
const TableDate=styled.td`
text-align: center;
padding: 10px 0px;
/* background: linear-gradient(to right , rgb(121, 218, 232),rgb(232, 249, 253)); */
`
const Action=styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`
const IconDelete=styled.p`
color: rgb(255, 73, 73);
font-size: 20px;
cursor: pointer;
transition: all 0.5s ease;
&:hover{
  color: rgb(243, 36, 36);
}
`
const IconEdit=styled.p`
color: rgb(10, 161, 221);
font-size: 20px;
cursor: pointer;
`
const Title=styled.h3`
font-family: 'Varela Round';
`
function ViewUser() {

  const [users,setUsers]=useState([])
  const [newUsers,SetNewUser]=useState([])

  useEffect(()=>{
    const fetchAllUser= async()=>{
     try{
      const res=await userRequest.get('/users')
      setUsers(res.data)
     }catch(err){
       console.log(err)
     }
    }
    const fetchNewUser=async()=>{
      try{
        const res=await userRequest.get('/users?new=2')
     SetNewUser(res.data)
    }catch(err){
      console.log(err)
    }
    }
    fetchAllUser()
    fetchNewUser()
  },[])



  return (
    <Wrapper>
      <NewUserContainer>
      <Title>New User</Title>
      <Table>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {newUsers?.map(user=>{
            return <User key={user._id} user={user}/>
          })}
        </Table>
      </NewUserContainer>
      <AllUserContainer>
      <Title>All User</Title>
      <Table>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          {users?.map(user=>{
            return <User key={user._id} user={user}/>
          })}
        </Table>
      </AllUserContainer>
    </Wrapper>
  )
}

export default ViewUser

        