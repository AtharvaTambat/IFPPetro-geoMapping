import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import NavbarScroll from './Navbar.js'
import Tableform from '../Components/Tableform.js';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
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

const Logs = () => {
    const navigate = useNavigate()
    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')
    const [e1,sete1] = useState('')
    const [compname,setCompanyName] = useState('')
    const [e2,sete2] = useState('')
    const [e3,sete3] = useState('')
    const [e4,sete4] = useState('')
    const [e5,sete5] = useState('')
    const [e6,sete6] = useState('')
    const [e7,sete7] = useState('')
    const [e8,sete8] = useState('')
    const [tableformData, setTableFormData] = useState([])
    const now = 60;
  //   const handleChange=(evnt)=>{  
  //     const newInput = (data)=>({...data, [evnt.target.name]:evnt.target.value})
  //    setformInputData(newInput)
  // }
//   const handleSubmit= (evnt) =>{
//     evnt.preventDefault();
//     const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
//     if(checkEmptyInput)
//     {
//      const newData = (data)=>([...data, formInputData])
//      setTableData(newData);
//      const emptyInput= {fullName:'', emailAddress:'', salary:''}
//      setformInputData(emptyInput)
//     }
// }  
    async function populateQuote() {
        const req = await fetch('https://localhost:1337/api/supplier',{
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await req.json()
        if(data.status === 'ok'){
            setQuote(data.compname)
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

        const req = await fetch('http://localhost:1337/api/supplier',{
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
<div class="setbg">
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
          <a href="http://localhost:3000/userdashboard/service">
            <i class='bx bx-pie-chart-alt-2' ></i>
            <span class="links_name">Service/Time sheet</span>
          </a>
        </li>
        <li>
          <a href="http://localhost:3000/userdashboard/logs" class="active">
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
    <h2>
      Previous Order Status
    </h2>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Order ID #2245</Accordion.Header>
        <Accordion.Body>
        <h5>Order Details</h5>
        <Table>
          <th>
            Placed On
          </th>
          <th>
            date
          </th>
          <tbody>
      <tr>
        <td>
          e1
        </td>
        <td>
          v1
        </td>
      </tr>
      <tr>
        <td>
          e1
        </td>
        <td>
          v1
        </td>
      </tr>
      <tr>
        <td>
          e1
        </td>
        <td>
          v1
        </td>
      </tr>
      <tr>
        <td>
          e1
        </td>
        <td>
          v1
        </td>
      </tr>
          </tbody>
        </Table>
        <ProgressBar animated now={now} label={`${now}%`} />
        <Form class="orderstatus">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Accepted by Recycler" />
      </Form.Group>
      <p>
        <a href="#">
            Recycler Information
        </a>
      </p>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Oil ready for dispatch to recycler" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Oil Dispatched for delivery" />
      </Form.Group>
      <p>
        <a href="#">
            Delivery service contact
        </a>
      </p>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Accepted by Recycler" />
      </Form.Group>
    </Form>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Order ID #1231</Accordion.Header>
        <Accordion.Body>

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Order ID #7712</Accordion.Header>
        <Accordion.Body>

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Order ID #3342</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  </section>

        </div>
    )
}

export default Logs