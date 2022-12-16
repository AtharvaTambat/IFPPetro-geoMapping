import { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import './Register.css';

function App() {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [compname,setCompanyName] = useState('')
  const [contact,setContact] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [street,setStreet] = useState('')
  const [state,setState] = useState('')
  const [city,setCity] = useState('')
  const [zipcode,setZipCode] = useState('')
  const [country,setCountry] = useState('')

  async function registerUser(event){
    event.preventDefault()
		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				compname,
				contact,
				email,
				password,
				street,
				city,
				state,
				zipcode,
				country,
			}),
    })
    const data = await response.json()
    if(data.status === 'ok'){
		navigate('/userdashboard')
	}
  }
  return (
	<div>
		<h2>Join IFP Petro Today!!!</h2>
		<div class="container" id="container">
			<div class="form-container sign-in-container">
				<form on onSubmit={registerUser} action="#">
					<h1>Sign up</h1>
					<br></br>
					<span>By creating an account with us, you will be able to access historical orders details, place new orders, track your orders and do many more things...</span>
					<br></br>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Name"
					/>
					<input
						value={compname}
						onChange={(e) => setCompanyName(e.target.value)}
						type="text"
						placeholder="Company Name"
					/>
					<input
						value={contact}
						onChange={(e) => setContact(e.target.value)}
						type="text"
						placeholder="Contact Number"
					/>
					<input 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email" 
						placeholder="Email" 
					/>
					<input 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<br></br>
					<button  type="submit" value="Register">Sign Up</button>
				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-right">
						<div class = "address-title">
							<h1>Address Info</h1>
						</div>
						<input 
							value={street}
							onChange={(e) => setStreet(e.target.value)}
							type="text"
							placeholder="Street address"
						/>
						<input 
							value={city}
							onChange={(e) => setCity(e.target.value)}
							type="text"
							placeholder="City"
						/>
						<input 
							value={state}
							onChange={(e) => setState(e.target.value)}
							type="text"
							placeholder="State"
						/>
						<input 
							value={zipcode}
							onChange={(e) => setZipCode(e.target.value)}
							type="text"
							placeholder="Zip/Postal Code"
						/>
						<input 
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							type="text"
							placeholder="Country"
						/>
						
						<p>Already joint with us??</p>
						<button  class="ghost" id="signIn">Sign In</button>					
					</div>
				</div>
			</div>
		</div>
    </div> 
  );
}



export default App;