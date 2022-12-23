import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Orders from './pages/Orders';
import Logs from './pages/Logs';
import Service from './pages/Service';
import Profile from './pages/Profile';
import RecyclerDash from './pages/RecyclerDash';
import Dashboard from './pages/Dashboard'

const App = () => {
	return (
		<div>
			<BrowserRouter>
                <Routes>
					<Route exact path="/" element={<Homepage />}></Route>
                    <Route exact path="/login" element={<Login />}></Route>
				    <Route exact path="/register" element={<Register />}></Route>
                    <Route exact path="/userdashboard" element={<Dashboard />}></Route>
					<Route exact path="/userdashboard/orders" element={<Orders />}></Route>
					<Route exact path="/userdashboard/logs" element={<Logs />}></Route>
					<Route exact path="/userdashboard/service" element={<Service />}></Route>
					<Route exact path="/userdashboard/profile" element={<Profile />}></Route>
					<Route exact path="/recyclerdash" element={<RecyclerDash />}></Route>
                </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App