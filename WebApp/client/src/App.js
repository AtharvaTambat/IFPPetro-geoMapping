import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RecyclerDash from './pages/RecyclerDash';


const App = () => {
	return (
		<div>
			<BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}></Route>
				    <Route exact path="/register" element={<Register />}></Route>
                    <Route exact path="/userdashboard" element={<Dashboard />}></Route>
					<Route exact path="/recyclerdash" element={<RecyclerDash />}></Route>
                </Routes>
			</BrowserRouter>
		</div>
	)
}

export default App