import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';


const App = () => {
	return (
		<div>
			<BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
				    <Route exact path="/register" element={<Register />}></Route>
                    <Route exact path="/userdashboard" element={<Dashboard />}></Route>
                </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App