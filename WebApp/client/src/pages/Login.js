import { useState } from "react";
import { useNavigate } from 'react-router-dom' 
import "./Login.css";

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful!");
      window.location.href = "/userdashboard";
    } else {
      alert("Please check your credentials and try again");
    }
  }
  async function userSignUp(){
    navigate('/register')
    }

  return (
    <div class="login_page">
      <h2 id="headinglogin">Welcome Back :)</h2>
      <div class="container" id="container">
        <div class="form-container sign-in-container">
          <div class="overlay">
            <div class="overlay-panel overlay-right">
              <h1 class="message">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" onClick={userSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div class="overlay-container">
          <form on onSubmit={loginUser} action="#">
            <h1 id="signinheader">Sign In</h1>
            <span>
              To keep connected with us, please login with your personal info
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              class="input"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              class="input"
            />
            <button type="submit" value="Login" id="signinbutton">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
