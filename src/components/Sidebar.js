import React from 'react'
import {Link} from "react-router-dom"
import styled from 'styled-components'

const Wrapper=styled.div`
display: flex;
flex-direction: column;
width: 100%;
background-color: rgb(56, 56, 56);
`
const Top=styled.div`
display: flex;
flex: 1;
justify-content: center;
align-items: center;
`
const Title=styled.span`
font-size: 20px;
font-family: 'Varela Round';
font-weight: 600;
color: white;
`
const Bottom=styled.div`

flex: 5;
display: flex;
flex-direction: column;
align-items: center;
`
const Links=styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const FeatureItem=styled.p`
width: 100%;
padding: 15px 0px;
cursor: pointer;
text-decoration: underline;
text-decoration-color: rgb(56, 56, 56);
color: white;

`
const Hr=styled.hr`
min-width: 7em;
width: 10em;
opacity: 0.5;
`
function Sidebar() {
  return (
    <Wrapper>
        <Top>
            <Title>Admin</Title>
        </Top>
        <Bottom>
            <Links>
                <Hr/>
                <Link to="/profile"><FeatureItem>Profile</FeatureItem></Link>
                <Hr/>
                <Link to="/categories"><FeatureItem>Categories</FeatureItem></Link>
                <Hr/>
                <Link to="/browsercategories"><FeatureItem>Browser Categories</FeatureItem></Link>
                <Hr/>
                <Link to="/addproduct"><FeatureItem>Add Product</FeatureItem></Link>
                <Hr/>
                <Link to="/viewproducts"><FeatureItem>View Products</FeatureItem></Link>
                <Hr/>
                <Link to="/newuserrequests"><FeatureItem>New user requests</FeatureItem></Link>
                <Hr/>
                <Link to="/viewuser"><FeatureItem>View user</FeatureItem></Link> 
                <Hr/>
            </Links>
        </Bottom>
    </Wrapper>
  )
}

export default Sidebar

