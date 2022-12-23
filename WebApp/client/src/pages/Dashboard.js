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

const Dashboard = () => {
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

    function viewProfile(){
        navigate('/userdashboard/profile')
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
          <a href="#" class="active">
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
          <a href="http://localhost:3000/userdashboard/service">
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
      <h2>Profile Summary</h2>

      <div class="overview-boxes">
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Order</div>
            <div class="number">40,876</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class='bx bx-cart-alt cart'></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Sales</div>
            <div class="number">38,876</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class='bx bxs-cart-add cart two' ></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Profit</div>
            <div class="number">$12,876</div>
            <div class="indicator">
              <i class='bx bx-up-arrow-alt'></i>
              <span class="text">Up from yesterday</span>
            </div>
          </div>
          <i class='bx bx-cart cart three' ></i>
        </div>
        <div class="box">
          <div class="right-side">
            <div class="box-topic">Total Return</div>
            <div class="number">11,086</div>
            <div class="indicator">
              <i class='bx bx-down-arrow-alt down'></i>
              <span class="text">Down From Today</span>
            </div>
          </div>
          <i class='bx bxs-cart-download cart four' ></i>
        </div>
      </div>
    
    <MDBContainer className="py-4" class="supplier-info">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Oil Supplier</p>
                <p className="text-muted mb-4">Kanpur, UP, India</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Update Profile</MDBBtn>
                  <MDBBtn outline className="ms-1">Connect with customers</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Industry</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Oil generation</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>About</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Established</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Top Commodities</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Website</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
  </section>
        </div>
    )
}

export default Dashboard