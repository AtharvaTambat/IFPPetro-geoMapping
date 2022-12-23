import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import NavbarScroll from './Navbar.js'
import './Supplier.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBCardTitle,
    MDBCardFooter,
    MDBCardGroup
  } from 'mdb-react-ui-kit';

const Service = () => {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    async function populateQuote() {
        const req = await fetch('https://localhost:1337/api/userdashboard',{
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(data.quote)
        }
        else{
            alert(data.error)
        }
    }

    useEffect (() => {
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
        else{
            populateQuote()
        }
    }, [])

    async function updateQuote(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:1337/api/userdashboard',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: tempQuote,
            }),
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(tempQuote)
            setTempQuote('')
        }
        else{
            alert(data.error)
        }
    }

    return(
      <div class="supplier">
      <div class="sidebar">
         <div class="logo-details">
           <i class='bx bxl-c-plus-plus'></i>
           <span class="logo_name">IFP Petro</span>
         </div>
           <ul class="nav-links">
             <li>
               <a href="http://localhost:3000/userdashboard">
                 <i class='bx bx-grid-alt' ></i>
                 <span class="links_name">Dashboard</span>
               </a>
             </li>
             <li>
               <a href="http://localhost:3000/userdashboard/orders">
                 <i class='bx bx-list-ul' ></i>
                 <span class="links_name">Place Order</span>
               </a>
             </li>
             <li>
               <a href="http://localhost:3000/userdashboard/service" class="active">
                 <i class='bx bx-pie-chart-alt-2' ></i>
                 <span class="links_name">Track Oil</span>
               </a>
             </li>
             <li>
               <a href="http://localhost:3000/userdashboard/logs">
                 <i class='bx bx-coin-stack' ></i>
                 <span class="links_name">Order Status</span>
               </a>
             </li>
             <li>
               <a href="http://localhost:3000/userdashboard/profile">
                 <i class='bx bx-book-alt' ></i>
                 <span class="links_name">Profile</span>
               </a>
             </li>
             <li class="log_out">
               <a href="http://localhost:3000/">
                 <i class='bx bx-log-out'></i>
                 <span class="links_name">Log out</span>
               </a>
             </li>
           </ul>
       </div>
       <section class="home-section">
         <nav class="navigation_bar">
           <div class="sidebar-button">
             <i class='bx bx-menu sidebarBtn'></i>
             <span class="dashboard">Supplier Dashboard</span>
           </div>
           <div class="search-box">
             <input type="text" placeholder="Search..."/>
           </div>
           <div class="profile-details">
             <img src="../../public/ifp-logo.png"/>
             <span class="admin_name">IFP Petro</span>
           </div>
         </nav>
     
         <div class="home-content">
           <h2>Google Maps</h2>
         </div>
       </section>
             </div>
    )
}

export default Service