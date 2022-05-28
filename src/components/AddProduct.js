import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import img from '../img/Rohit.jpeg'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app  from "../firebase"
import { addProduct } from '../redux/apiCall';
import { useDispatch, useSelector } from 'react-redux';

const Wrapper=styled.div`
display: flex;
width: 100%;
height: 100vh;
justify-content: center;
align-items: center;
`
const Title=styled.h3`
font-family: 'Varela Round';
font-size: 35px;
opacity: 0.7;
margin-bottom: 10px;
`
const ProductDetails=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 10px;
border-radius: 5px;
background: linear-gradient( to right ,rgb(220, 214, 247),rgb(244, 238, 255));
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);
`
const ProductItem=styled.div`

`
const ProductTitle=styled.h3`
font-family: 'Varela Round';
opacity: 0.5;
margin: 5px 20px;
`
const Input=styled.input`
width: 20rem;
font-family: 'Varela Round';
opacity: 0.5;
padding: 5px 0px;
margin: 0px 20px;
font-weight: 600;
background-color: rgb(244, 238, 255);
border: none;
outline: none;
`
const ProductButton=styled.button`

width: 20em;
margin: 30px 0px 10px 0px;
border-radius: 5px;
font-family: 'Varela Round';
height: 2.5rem;
color: white;
font-size: 1em;
font-weight: 600;
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);;
background: linear-gradient(to right, rgb(66, 72, 116) , rgb(166, 177, 225));
border: none;
opacity: 0.7;
cursor: pointer;
transition: all 0.5s ease;
&:hover{
  opacity: 1;
}
`
const Select=styled.select`
width: 20rem;
font-family: 'Varela Round';
opacity: 0.5;
padding: 2px 0px;
margin: 0px 20px;
font-weight: 600;
background-color: rgb(244, 238, 255);
border: none;
outline: none;
`
const Option=styled.option`
`

function AddProduct() {

  const dispatch=useDispatch()
  const currentProduct=useSelector(state=>state.product)
  const [product,setProduct]=useState({})
  const [cat,setCat]=useState([])
  const [file,setFile]=useState(null)

  const handleProduct=(e)=>{
    setProduct((prev)=>{
     return {...prev,[e.target.name]:e.target.value}
    }
    )
  }

  const handleCategories=(e)=>{
    setCat(e.target.value.split(","))
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const fileName=new Date().getTime() + file.name
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    console.log("Handle unsuccessful uploads")
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      addProduct(dispatch,{img:downloadURL,categories:cat,...product})
    });
  }
);
  }

  // useEffect(()=>{
  //   currentProduct.isSuccess && alert("product uploaded")
  // },[currentProduct.isSuccess])
  return (
    <Wrapper>
        <ProductDetails>

        <ProductItem>
               <Title>Add Products</Title>
          </ProductItem>

          <ProductItem>
            <ProductTitle>Product Name</ProductTitle>
            <Input type="text" name="title" onChange={handleProduct}/>
          </ProductItem>

          <ProductItem>
            <ProductTitle>Description</ProductTitle>
            <Input type="text" name="desc" onChange={handleProduct}/>
          </ProductItem>

          <ProductItem>
            <ProductTitle>categories</ProductTitle>
            <Input type="text" name='categories' onChange={handleCategories}/>
          </ProductItem>

          <ProductItem>
            <ProductTitle>Size</ProductTitle>
            <Select name='size' onChange={handleProduct}>
              <Option selected disabled hidden>Select Size</Option>
              <Option>s</Option>
              <Option>m</Option>
              <Option>l</Option>
              <Option>xl</Option>
              <Option>xxl</Option>
            </Select>
          </ProductItem>

          <ProductItem>
            <ProductTitle>Color</ProductTitle>
            <Input  type="text" name="color" onChange={handleProduct}/>
          </ProductItem>

          <ProductItem>
            <ProductTitle>Price</ProductTitle>
            <Input  type="number" name="price" onChange={handleProduct}/>
          </ProductItem>

          <ProductItem>
            <ProductTitle>In Stock</ProductTitle>
            <Select name='inStock' onChange={handleProduct}>
              <Option selected disabled hidden>select</Option>
              <Option>yes</Option>
              <Option>No</Option>
            </Select>
          </ProductItem>

          <ProductItem>
            <ProductTitle>Image</ProductTitle>
            <Input type="file" name="img" onChange={(e)=>setFile(e.target.files[0])}/>
          </ProductItem>

          <ProductItem>
            <ProductButton onClick={handleSubmit}>Submit</ProductButton>
          </ProductItem>
        </ProductDetails>
    </Wrapper>
  )
}

export default AddProduct