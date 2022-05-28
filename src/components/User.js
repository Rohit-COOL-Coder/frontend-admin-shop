import React from 'react'
import { faAddressBook, faArrowRight, faArrowRightToBracket, faBed, faCar, faDeleteLeft, faMoneyCheck, faMoneyCheckAlt, faPen, faPencilSquare, faRegistered, faRocket, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userRequest } from '../requestMethods'


const TableRow=styled.tr`
background-color: rgb(127, 132, 135);
opacity: 0.7;
color: white;
`

const TableDate=styled.td`
text-align: center;
padding: 10px 0px;
/* background: linear-gradient(to right , rgb(121, 218, 232),rgb(232, 249, 253)); */
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
// const Image=styled.img`
// width: 2rem;
// `

const IconUser=styled.p`
color: blue;
`
function User({user}) {

    const DeleteUser= async(e)=>{
      e.preventDefault()
      const res=await userRequest.delete(`/users/${user._id}`)
      alert(res.data)
    }
  return (
    <TableRow>
            <TableDate>
            <IconUser><FontAwesomeIcon icon={faUser}/></IconUser>
            </TableDate>
            <TableDate>{user.username}</TableDate>
            <TableDate>{user.email}</TableDate>
            <TableDate>
               <IconDelete><FontAwesomeIcon icon={faTrash} onClick={DeleteUser}/></IconDelete>
            </TableDate>
    </TableRow>
  )
}

export default User