import React, { useEffect, useState,Component } from 'react';
import { matchPath, renderMatches, useNavigate } from 'react-router-dom'
import './RecyclerDash.css';
import $ from 'jquery';
// import Map from 'ol/Map.js';
// import View from 'ol/View.js';
// import OSM from 'ol/source/OSM.js';
// import TileLayer from 'ol/layer/Tile.js';
import LineString from 'ol/geom/LineString.js';
import {useGeographic} from 'ol/proj';
import {Feature, Map, Overlay, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Polyline from 'ol/format/Polyline.js';
import XYZ from 'ol/source/XYZ.js';
import {
  Fill,
  Icon,
  Stroke,
  Style,
} from 'ol/style.js';
import CircleStyle from 'ol/style/Circle.js';
import {getVectorContext} from 'ol/render.js';




const RecyclerDash = () => {
  const navigate = useNavigate()
  var [customer,setCompanyName] = useState('')
  var [customer_id,setContact] = useState('')
  var [quantity,setEmail] = useState('')
  var [packet_type,setEmail] = useState('')
  var [category,setEmail] = useState('')

  var [requests, setObj] = useState([
    {
      customer_id: "",
      customer: "",
      category: "",
      packet_type: "",
      quantity:"",
    },
  ]);
  useGeographic();
  const key = 'v5L7a7Did04C5HGREKwC';
  const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
  const point = new Point([77.373000,28.669930]) // Location of IFP Petro
  if (!$('#map').html()) {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: attributions,
            url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key,
            tileSize: 512,
          }),
        }),
      ],
      target: 'map',
      view: new View({
        center: [77.373000,28.669930],
        zoom: 5
      })
    });
 }    

    function deleterow(r) {
      var i = r.parentNode.parentNode.rowIndex;
      $(document).getElementById("myTable").deleteRow(i);
    }

    //The ColorCode() will give the code every time.
   function ColorCode() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return (r + "," + g + "," + b);
  }
    async function inputCollectionData(){
      const response = await fetch('http://localhost:1337/api/recyclerdash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id,
          customer,
          category,
          packet_type,
          quantity,
        }),
      })
      const data = await response.json()
      console.log(data.status);
      if(data.status === 'ok'){
        alert("Data sent successfully");
      }
    }
    async function optimizeRoutes(){
      requests = await fetch('http://localhost:1337/api/optimizeroutes').then((res) => res.json());;
      console.log(requests['result']);
      const loc_array = requests['result']['route'].split("#");
      console.log(loc_array)

      console.log("I HAVE OPTIMIZED ROUTES, NOW DISPLAYING MAPS")

      let truck_num = 0;
      let loc;
      for(let i = 0;i<loc_array.length;){
        console.log("truck_num" + truck_num)
        console.log("i = " + i)
        var features = [];
        if(i==0){
           loc = loc_array[i].split(",");
        }
        while(parseInt(loc[2]) == truck_num){
          console.log(loc);
          var marker = new Feature({
            geometry: new Point([parseFloat(loc[0]), parseFloat(loc[1])]),
          });
          console.log(marker);
          features.push(marker);
          console.log(features);
          i=i+1;
          if(i<loc_array.length){
            loc = loc_array[i].split(",");
          }
          
          //displaying it in a layer
          var color = ColorCode()
          var style = new Style({
              image: new CircleStyle({
                  fill: new Fill({
                      color: 'rgba(' + color + ',0.8)'
                  }),
                  stroke: new Stroke({
                      width: 10,
                      color: 'rgba(' + color + ',0.2)'
                  }),
                  radius: 7
              }),
          });

          // Adding a new layer
          var vectorLayer = new VectorLayer({
            title: 'POI',
            source: new VectorSource({
              features: features
            }),
            style: style,
          });
          console.log(vectorLayer);
          map.addLayer(vectorLayer);
          map.render();
          if(i>=loc_array.length){
            break;
          }
        }
        console.log("I am out f loop");
        truck_num=truck_num+1;
        console.log(features);
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
            "<th scope=\"row\">",requests[i].customer_id,"</th>",
            "<td>",requests[i].customer,"</td>",
            "<td>",requests[i].category,"</td>",
            "<td>",requests[i].packet_type,"</td>",
            "<td><div><input class=\"form-check-input\" type=\"checkbox\" id=\"inlineCheckbox1\" value=\"option1\"></div></input></td>",
            "<td>",requests[i].quantity,"</td>",
          "</tr>"].join("\n");
        } 
        table.html(resultHtml);
        return false; 
    } 

      $("#seeallbutton").on('click',function() {
        collectRequestData();
      });

      $("#collectbutton").on("click",function(){
        var message = "Collection Info\n";

        //Loop through all checked CheckBoxes in GridView.
        $("#myTable input[type=checkbox]:checked").each(function () {
            console.log($(this).closest("tr")[0]); //debugging lines - remove later
            var row = $(this).closest("tr")[0];
            console.log(row.cells[1].innerHTML); //debugging lines - remove later
            message += row.cells[0].innerHTML;
            message += "   " + row.cells[1].innerHTML;
            message += "   " + row.cells[2].innerHTML;
            message += "   " + row.cells[3].innerHTML;
            message += "   " + row.cells[5].innerHTML;
            message += "\n";

            customer_id = row.cells[0].innerHTML;
            customer = row.cells[1].innerHTML;
            category = row.cells[2].innerHTML;
            packet_type = row.cells[3].innerHTML;
            quantity = row.cells[5].innerHTML;

            inputCollectionData();
            alert("row sent");
        });

        //Display selected Row data in Alert Box.
        if(message != "Collection Info\n"){
          alert(message);
          optimizeRoutes();
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
              <th scope="col">Customer ID</th>
              <th scope="col">Customer</th>
              <th scope="col">Category</th>
              <th scope="col">Packet Type</th>
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
        
        {/* <div class="top-sales box"> */}
        <script src="https://cdn.jsdelivr.net/npm/elm-pep@1.0.6/dist/elm-pep.js"></script>
        <div id="map" class="map" onload="initializemap()"></div>
      </div>
    </div>
  </section>
 
    </div>
    )
}
export default RecyclerDash

// async function displayRoutes(){
  //   // The polyline string is read from a JSON similiar to those returned
  // // by directions APIs such as Openrouteservice and Mapbox.
  
  // const api_key = 'fcf0bf0f-f793-483a-a30c-96102e409118';
  // const startLonLat = [77.373000,28.669930];
  // const endLonLat = [72.83333,18.96667];
  
  // await fetch('https://graphhopper.com/api/1/route' +
  // '?point=' + startLonLat.slice().reverse().join(',') +
  // '&point=' + endLonLat.slice().reverse().join(',') +
  // '&type=json&key=' + api_key +
  // '&profile=car').then(function (response) {
  // response.json().then(function (result) {
  //   const polyline = result.paths[0].points;
  //   // const polyline = result.routes[0].geometry;
  //   console.log("DATA FETCHED")
  //   console.log(polyline)
  
  //   const route = new Polyline({
  //     factor: 1e6,
  //   }).readGeometry(polyline);
  //   console.log(route);
  
  //   const routeFeature = new Feature({
  //     type: 'route',
  //     geometry: route,
  //   });
  //   const startMarker = new Feature({
  //     type: 'icon',
  //     geometry: new Point(route.getFirstCoordinate()),
  //   });
  //   const endMarker = new Feature({
  //     type: 'icon',
  //     geometry: new Point(route.getLastCoordinate()),
  //   });
  //   const position = startMarker.getGeometry().clone();
  //   const geoMarker = new Feature({
  //     type: 'geoMarker',
  //     geometry: position,
  //   });
  
  //   const styles = {
  //     'route': new Style({
  //       stroke: new Stroke({
  //         width: 100000,
  //         color: [237, 212, 0, 1],
  //       }),
  //     }),
  //     // 'icon': new Style({
  //     //   image: new Icon({
  //     //     anchor: [0.5, 1],
  //     //     src: 'data/icon.png',
  //     //   }),
  //     // }),
  //     'geoMarker': new Style({
  //       image: new CircleStyle({
  //         radius: 7,
  //         fill: new Fill({color: 'black'}),
  //         stroke: new Stroke({
  //           color: 'white',
  //           width: 2,
  //         }),
  //       }),
  //     }),
  //   };
  //   console.log("STYLES DONE")
  
  //   const vectorLayer = new VectorLayer({
  //     source: new VectorSource({
  //       features: [routeFeature, geoMarker, startMarker, endMarker],
  //     }),
  //     style: function (feature) {
  //       return styles[feature.get('type')];
  //     },
  //   });
  
  //   map.addLayer(vectorLayer);
  //   console.log("Adding Layer");
  //   map.render();
  //   });
  
  // });
  // }
    