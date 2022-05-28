import React from 'react'
import styled from 'styled-components'
import { faAddressBook, faArrowRight, faArrowRightToBracket, faBed, faCar, faDeleteLeft, faMoneyCheck, faMoneyCheckAlt, faPen, faPencilSquare, faRegistered, faRocket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userRequest } from '../requestMethods'
import { Link } from 'react-router-dom'

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
color: rgb(235, 83, 83);
font-size: 20px;
cursor: pointer;
`
const IconEdit=styled.p`
color: rgb(10, 161, 221);
font-size: 20px;
cursor: pointer;
`
const Image=styled.img`
width: 2rem;
`

function Product({data,key}) {

    const handleDelete= async(e)=>{
      e.preventDefault()
      console.log(data._id)
      const res=await userRequest.delete(`/products/${data._id}`)
      alert(res.data)
    }

  return (
    <TableRow >
            <TableDate>
                <Image src={data.img} />
                </TableDate>
                <TableDate>{data.title}</TableDate>
                <TableDate>{data.desc}</TableDate>
                <TableDate>men jeans</TableDate>
                <TableDate>s m l</TableDate>
                <TableDate>yellow</TableDate>
                <TableDate>{data.price}</TableDate>
                <TableDate>{data.inStock? "Yes" : "No"}</TableDate>
                <TableDate>
                <Action>
                <IconDelete><FontAwesomeIcon icon={faTrash} onClick={handleDelete}/></IconDelete>
                <Link to={`/editproduct/${data._id}`}><IconEdit><FontAwesomeIcon icon={faPencilSquare}/></IconEdit></Link>
                </Action>
            </TableDate>
    </TableRow>
  )
}

export default Product