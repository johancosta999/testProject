import React, { useState } from 'react'
import Nav from "../nav/nav"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddUser() {

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name : "",
    gmail: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/userDetails");
  };

  const sendRequest = async() => {
    await axios.post("http://localhost:5000/users", {
      name: String (inputs.name),
      gmail: String (inputs.gmail),
      age: Number (inputs.age),
      address: String (inputs.address),
    }).then(res => res.data);
  };

    return (
    <div>
      <Nav/>
      <h1>Add User</h1>
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label><br/>
        <input type="text" id="name" name="name" value={inputs.name} onChange={handleChange} required /><br/><br/>

        <label htmlFor="gmail">Gmail:</label><br/>
        <input type="email" id="gmail" name="gmail" pattern=".*@gmail\.com" value={inputs.gmail} onChange={handleChange} required /><br/><br/>

        <label htmlFor="age">Age:</label><br/>
        <input type="number" id="age" name="age" value={inputs.age} onChange={handleChange} min="1" required /><br/><br/>

        <label htmlFor="address">Address:</label><br/>
        <textarea id="address" name="address" rows="4" cols="30" value={inputs.address} onChange={handleChange} required></textarea><br/><br/>

        <button>Submit</button>
      </form>
    </div>
  );
}


export default AddUser
