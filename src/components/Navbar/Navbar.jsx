import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");

  // when quantity is zero, then red dot on cart image remove
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  //functionality of logout function
  const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");   //return back to homepage
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo"/></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} className="search"alt=""/>
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>

         {/* // bring profile picture instead of sign in button after logged in  */}
         {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>:
         <div className='navbar-profile'>
             <img src = {assets.profile_icon} alt="" />
             <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
             </ul>
        </div>}
         
      </div>
    </div>
  )
}

export default Navbar
