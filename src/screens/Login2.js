import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/AdminNavbar';

export default function Login2() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginadmin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('authToken', json.authToken)
      navigate("/admin");
    }
    else{ alert("Enter Valid Credentials")}


  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })

  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-light border-success rounded'onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}></input>
            <div id="emailHelp" className="form-text ">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">  
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          
        </form>
      </div>
    </div>
  )
}
