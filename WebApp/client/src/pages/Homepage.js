import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import './Register.css';

function App() {
  const navigate = useNavigate()
  async function registerUser(){
	navigate('/register')
  }
  return (
	<div>
		<h2>Join IFP Petro Today!!!</h2>
		<button type="submit" onClick={registerUser}>Register</button>
    </div> 
  );
}



export default App;