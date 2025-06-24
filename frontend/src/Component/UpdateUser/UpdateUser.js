import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import { useNavigate } from 'react-router'

function UpdateUser() {

const [inputs, setInputs] = useState({});
const history = useNavigate();
const {id}  = useParams();

useEffect(() =>{
    const fetchHandler = async () => {
        await axios 
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then ((data) => setInputs(data.user));
    };
    fetchHandler();
}, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/users/${id}`, {
            name : String (inputs.name),
            gmail : String (inputs.gmail),
            age : Number (inputs.age),
            address : String (inputs.address),
        })
            .then((res) => res.data);
    };

    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest().then(() =>
        history("/userDetails"));
    };

  return (
    <div>
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
  )
}

export default UpdateUser 

