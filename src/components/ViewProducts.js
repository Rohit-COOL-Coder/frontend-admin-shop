import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { publicRequest } from "../requestMethods"
import Product from './Product'
 
const Wrapper=styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const ProductContainer=styled.div`
border-radius: 5px;
width: 90%;
/* max-width: 70em; */
min-width: 52em;
background: linear-gradient( to right ,rgb(220, 214, 247),rgb(244, 238, 255));
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);
display: flex;
flex-direction: column;
align-items: center;
margin: 2em 0em;
padding-bottom: 2em;
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
padding: 10px 10px;
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
function ViewProducts() {
  const [products,setProducts]=useState([])

  useEffect(()=>{
    const fetchProduct= async()=>{
       try{
        const res= await publicRequest.get('/products')
        setProducts(res.data)
       }catch(err){
         console.log(err)
       }
    }
    fetchProduct()
  },[])
  return (
    <Wrapper>
      <ProductContainer>
        <Table>
          <TableRow>
            <TableHead>IMAGE</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead>DESCRIPTION</TableHead>
            <TableHead>CATEGORIES</TableHead>
            <TableHead>SIZE</TableHead>
            <TableHead>COLOR</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead>INSTOCK</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>

          {products.map((product)=>{
            return <Product key={product._id} data={product}/>
          }
          )}
        </Table>
      </ProductContainer>
    </Wrapper>
  )
}

export default ViewProducts