import React, { useEffect, useState,Component } from 'react';
import jwt from 'jsonwebtoken'
import { renderMatches, useNavigate } from 'react-router-dom'
import './RecyclerDash.css';
import $ from 'jquery';


const RecyclerDash = () => {
  const navigate = useNavigate()
  var [date,setDate] = useState('')
  var [customer,setCompanyName] = useState('')
  var [customer_id,setContact] = useState('')
  var [volume,setEmail] = useState('')

  var [requests, setObj] = useState([
    {
      date: "",
      customer: "",
      customer_id: "",
      volume: "",
    },
  ]);

    function deleterow(r) {
      var i = r.parentNode.parentNode.rowIndex;
      $(document).getElementById("myTable").deleteRow(i);
    }

    async function inputCollectionData(){
      const response = await fetch('http://localhost:1337/api/recyclerdash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date, 
          customer,
          customer_id,
          volume,
        }),
      })
      const data = await response.json()
      console.log(data.status);
      if(data.status === 'ok'){
        alert("Data sent successfully");
      }
    }
    async function collectRequestData(){
        requests = await fetch('http://localhost:1337/api/recyclerdash')
          .then((res) => res.json());
          // .then((jsonRes) => setObj(jsonRes));
      console.log(requests);
      
        var table = $("#resultTable");
        var numRequests = requests.length;
        var resultHtml = '';
        for(var i = 0 ; i < numRequests ; i++) {
            resultHtml += ["<tr>",
            "<th scope=\"row\">",(i+1),"</th>",
            "<td>",requests[i].customer,"</td>",
            "<td>",requests[i].customer_id,"</td>",
            "<td><div><input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\"></div></input></td>",
            "<td>",requests[i].volume,"</td>",
          "</tr>"].join("\n");
        } 
        table.html(resultHtml);
        return false; 
    } 
      $("#seeallbutton").on('click',function() {
        collectRequestData()
      });

      $("#collectbutton").on("click",function(){
        var message = "Collection Info\n";

        //Loop through all checked CheckBoxes in GridView.
        $("#myTable input[type=checkbox]:checked").each(function () {
            console.log($(this).closest("tr")[0]); //debugging lines - remove later
            var row = $(this).closest("tr")[0];
            console.log(row.cells[1].innerHTML); //debugging lines - remove later
            message += row.cells[1].innerHTML;
            message += "   " + row.cells[2].innerHTML;
            message += "   " + row.cells[4].innerHTML;
            message += "\n";

            date = "1";
            customer = row.cells[1].innerHTML;
            customer_id = row.cells[2].innerHTML;
            volume = row.cells[4].innerHTML;

            inputCollectionData();
            alert("row sent");
        });

        //Display selected Row data in Alert Box.
        if(message != "Collection Info\n"){
          alert(message);
          return true;
        }
        else{
          return false;
        }
      });

      $("#collectbutton").on("click",function(){
        // Delete those rows from the page
        $('input:checked').each(function() {
          $(this).closest('tr').remove();
        });
      });

  
    return(
        <div>
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
          <a href="#">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Order list</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-pie-chart-alt-2' ></i>
            <span class="links_name">Analytics</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-coin-stack' ></i>
            <span class="links_name">Stock</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-book-alt' ></i>
            <span class="links_name">Total order</span>
          </a>
        </li>
        <li class="log_out">
          <a href="#">
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
        <span class="dashboard">Recycler Dashboard</span>
      </div>
      <div class="search-box">
        <input type="text" placeholder="Search..."/>
      </div>
      <div class="profile-details">
        <img src="./images/default-profile.png" alt=""/>
        <span class="admin_name">IFP Petro</span>
      </div>
    </nav>

    <div class="home-content">
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
      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Recent Sales</div>
          
          <table class="table" id="myTable">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Customer ID</th>
              <th scope="col">Collect</th>
              <th scope="col">Volume</th>
            </tr>
          </thead>
          <tbody id="resultTable">
          </tbody>
          </table> 
          <div class="button" id="seeallbutton">
            <a href="#" class="refresh_button">Refresh</a>
          </div>
          <div class="button" id="collectbutton">
            <a href="#" class="refresh_button">Collect</a>
          </div>       
        </div>
        
        <div class="top-sales box">
        </div>
      </div>
    </div>
  </section>
 
    </div>
    )
}
export default RecyclerDash