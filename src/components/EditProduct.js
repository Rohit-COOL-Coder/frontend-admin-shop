import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import app from '../firebase'
import { publicRequest, userRequest } from '../requestMethods'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const Wrapper=styled.div`
display: flex;
justify-content: center;
/* height: 20em; */
/* border: 1px solid black; */
`
const EditProductContainer=styled.div`
border-radius: 5px;
width: 70%;
min-width: 40em;
height: 100%;
background: linear-gradient( to right ,rgb(220, 214, 247),rgb(244, 238, 255));
box-shadow: -16px 16px 13px -12px rgba(0,0,0,0.69);
display: flex;
justify-content: center;
align-items: center;
margin: 2em 2em;
padding-bottom: 2em;
/* border: 1px solid black; */
`
const Left=styled.div`
display: flex;
flex: 1;
/* border: 1px solid black; */
height: 100%;
justify-content: center;
align-items: center;
`
const LeftContainer=styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
/* border: 1px solid black; */
`
const ImageContainer=styled.div`
/* border: 1px solid black; */
width: 10em;
height: 12em;
margin-bottom: 1em;
`
const Image=styled.img`
width: 10em;
height: 12em;
object-fit: contain;
`
const Input=styled.input`
border: 1px solid lightgray;
padding: 0.5em 0.2em;
font-family: 'Varela Round';
width: 20em;
opacity: 0.7;
border-radius: 5px;
outline: none;
`
const Hr=styled.hr`
border: 2px solid lightgray;
height: 22em;
`
const Right=styled.div`
display: flex;
flex: 3;
/* border: 1px solid black; */
height: 100%;
justify-content: center;
align-items: center;
`
const RightContainer=styled.div`
/* border: 1px solid black; */
margin-top: 2em;

`
const ProductItem=styled.div`

`
const ProductTitle=styled.div`
padding: 0.5em 0em;
font-weight: 600;
`
const Select=styled.select`
border: 1px solid lightgray;
padding: 0.5em 0em;
font-family: 'Varela Round';
width: 20em;
opacity: 0.7;
outline: none;
`
const Option=styled.option`
`
const ButtonContainer=styled.div`
display: flex;
justify-content: flex-end;
`
const Button=styled.button`
margin-top: 2em;
width: 10em;
padding: 0.7em 0em;
font-family: 'Varela Round';
cursor: pointer;
border: none;
border-radius: 5px;
color: white;
font-weight: 600;
opacity: 0.7;
transition: all 0.5s ease;
background: linear-gradient(to right,rgb(33, 85, 205),rgb(121, 218, 232) );
&:hover{
    opacity: 1;
}
`

function EditProduct() {
    const [product,setProduct]=useState({})
    const location=useLocation()
    const productId=location.pathname.split("/")[2]
    const [modifyProduct,setModifyProduct]=useState({})
    const [cat,setCat]=useState([])
    const [file,setFile]=useState(null)
  
    const handleProduct=(e)=>{
      setModifyProduct((prev)=>{
       return {...prev,[e.target.name]:e.target.value}
      }
      )
    }
  useEffect(()=>{
      const fetchProduct= async()=>{
      try{
        const res=await publicRequest.get(`products/find/${productId}`)
        setProduct(res.data)
        setModifyProduct(res.data)
      }catch(err){
          console.log(err)
      }    
    }
    fetchProduct()
  },[])

  const handleUpdate= async(e)=>{
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
      console.log(modifyProduct)
      userRequest.put(`/products/${productId}`,{title:modifyProduct.title,desc:modifyProduct.desc,color:modifyProduct.color,price:modifyProduct.price,inStock:modifyProduct.inStock=="yes"?true:false,img:downloadURL}).then((res,err)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
      
    });
  }
);
  }


  console.log(modifyProduct.title)
    return (
    <Wrapper>
        <EditProductContainer>
           <Left>
              <LeftContainer>
              <ImageContainer>
              <Image src={product.img}/>
              </ImageContainer>
              <Input type="file" name="img" onChange={(e)=>{ setFile(e.target.files[0])}}/>
              </LeftContainer>
           </Left>
           <Hr/>
           <Right>
              <RightContainer>
                    <ProductItem>
                        <ProductTitle>Product Name</ProductTitle>
                        <Input type="text" name="title" value={modifyProduct.title} onChange={handleProduct}/>
                    </ProductItem>

                    <ProductItem>
                        <ProductTitle>Description</ProductTitle>
                        <Input type="text" name="desc" value={modifyProduct.desc} onChange={handleProduct}/>
                    </ProductItem>


                    <ProductItem>
                        <ProductTitle>Color</ProductTitle>
                        <Input  type="text" name="color" value={modifyProduct.color} onChange={handleProduct}/>
                    </ProductItem>

                    <ProductItem>
                        <ProductTitle>Price</ProductTitle>
                        <Input  type="number" name="price" value={modifyProduct.price} onChange={handleProduct}/>
                    </ProductItem>

                    <ProductItem>
                        <ProductTitle>In Stock</ProductTitle>
                        <Select name='inStock' onChange={handleProduct}>
                        <Option selected disabled hidden>{modifyProduct.inStock? "yes":"no" }</Option>
                        <Option>yes</Option>
                        <Option>No</Option>
                        </Select>
                    </ProductItem>
                    <ProductItem>
                        <ButtonContainer>
                        <Button onClick={handleUpdate}>Update</Button>
                        </ButtonContainer>
                    </ProductItem>
              </RightContainer>
           </Right>
        </EditProductContainer>
    </Wrapper>
  )
}

export default EditProduct