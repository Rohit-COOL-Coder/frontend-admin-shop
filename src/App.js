import Login from "./pages/Login"
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Profile from "../src/components/Profile"
import AddProduct from "../src/components/AddProduct"
import BrowserCategories from "../src/components/BrowserCategories"
import ViewUser from "../src/components/ViewUser"
import ViewProducts from "../src/components/ViewProducts"
import NewUserRequest from "../src/components/NewUserRequest"
import Categories from "../src/components/Categories"
import { useSelector } from "react-redux";
import EditProduct from "./components/EditProduct";


function App() {
  const user=useSelector(state=>state.user.currentUser)
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={ user? <Dashboard/> :<Navigate to='/login'/>}>
         <Route path="profile" element={<Profile/>}/>
         <Route path="categories" element={<Categories/>}/>
         <Route path="browsercategories" element={<BrowserCategories/>}/>
         <Route path="addproduct" element={<AddProduct/>}/>
         <Route path="viewproducts" element={<ViewProducts/>}/>
         <Route path="newuserrequests" element={<NewUserRequest/>}/>
         <Route path="viewuser" element={<ViewUser/>}/>
         <Route path="editproduct/:id" element={<EditProduct/>}/>         
       </Route>
       <Route path="/login" element={ user? <Navigate to='/profile'/> :<Login/> }/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
