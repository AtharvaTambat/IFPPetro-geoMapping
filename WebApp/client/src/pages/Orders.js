import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup';
import NavbarScroll from './Navbar.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Supplier.css';

const Orders = () => {
    const navigate = useNavigate()
    const [e0,sete0] = useState('')
    const [e1,sete1] = useState('')
    const [e2,sete2] = useState('')
    const [e3,sete3] = useState('')
    const [e4,sete4] = useState('')
    const [e5,sete5] = useState('')
    const [e6,sete6] = useState('')
    const [e7,sete7] = useState('')
    const [e8,sete8] = useState('')
    const [e9,sete9] = useState('')

    async function registerOrder(event){
      event.preventDefault()
      const response = await fetch('http://localhost:1337/api/userdashboard/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          e0,
          e1,
          e2,
          e3,
          e4,
          e5,
          e6,
          e7,
          e8,
          e9,
        }),
      })
      const data = await response.json()
      if(data.status === 'ok'){
      alert('Order Placed!!')
      console.log('Order Placed!!')
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
          <a href="http://localhost:3000/userdashboard/orders" class="active">
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
    <h2>
      Order Details
    </h2>
    <div id="request-form">
      <Form on onSubmit={registerOrder} action="#" >
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Used Oil Category</Form.Label>
                <Form.Select defaultValue="Delivery Date" value={e0}
                  onChange={(e) => sete0(e.target.value)}>
                  <option>Select Oil Type</option>
                  <option>Engine Oil</option>
                  <option>Hydraulic Oil</option>
                  <option>Transformer Oil</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Used Oil Packet Type</Form.Label>
                <Form.Select defaultValue="Delivery Date" value={e1}
                  onChange={(e) => sete1(e.target.value)}>
                  <option>Select Packet Type</option>
                  <option>Mild Steel Drum</option>
                  <option>Plastic Drum</option>
                  <option>Intermediate Bulk Container</option>
                  <option>Without Drum</option>
                </Form.Select>
              </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Quantity (Litres)</Form.Label>
              <Form.Control value={e2}
                onChange={(e) => sete2(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Customer ID</Form.Label>
              <Form.Control value={e3}
                onChange={(e) => sete3(e.target.value)} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="Mark"
                value={e4}
                onChange={(e) => sete4(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                defaultValue="Otto"
                value={e5}
                onChange={(e) => sete5(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Email ID</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email ID"
                  aria-describedby="inputGroupPrepend"
                  required
                  value={e6}
                  onChange={(e) => sete6(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a valid Email ID.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required 
              value={e7}
              onChange={(e) => sete7(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required 
              value={e8}
              onChange={(e) => sete8(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required 
              value={e9}
              onChange={(e) => sete9(e.target.value)}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br></br>
          <Row>
            <Form.Group className="mb-3" id="terms-checkbox">
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
          </Row>
          <br></br>
          <Button variant="primary" type="submit" class=".btn" id="submitbutton">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </section>

        </div>
    )
}

export default Orders