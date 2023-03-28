import React, { useState, useEffect } from "react";
// import  index from './../FormOneFunctional/index.module.css';
import axios from "axios";
import "./index.css";

function FormTwoFunctional() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    language: "",
    zipcode: "",
    about: "",
  });
  const [list, setList] = useState([]);

  const getAllUsersFromServer = () => {
    axios.get("http://localhost:3005/two").then((res) => {
      setList(res.data);
    })
  };

  const clearAllusers =() => {
    setData(
      {name: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      language: "",
      zipcode: "",
      about: "",}
    )
  }

  const onHandleChange = (event) => {
    let newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  };

  const onRegister = () => {
    axios
      .post("http://localhost:3005/two", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      getAllUsersFromServer()
      clearAllusers()
  };


  const onUpdate = () => {
       axios.put("http://localhost:3005/two/" + data.id,data).then(() => {
        getAllUsersFromServer()
        clearAllusers()
       })
  }
  useEffect(() => {
    getAllUsersFromServer();
  }, []);
  

  const onDelete = (user) => {
    axios.delete("http://localhost:3005/two/" + user.id).then(() => {
      getAllUsersFromServer();
    });
  };

  const onEdit = (user) => {
      setData(user)
  }

  const { name, email, password, phoneNumber, about, zipcode } = data;
  return (
    <div className="container">
      <div className="card-container">
        <div className="label-container">
          <label>Name: </label>
          <input
            type="text"
            placeholder="your name"
            name="name"
            onChange={onHandleChange}
            value={name}
          />
        </div>
        <div className="label-container">
          <label>Email: </label>
          <input
            type="email"
            placeholder="your email"
            name="email"
            onChange={onHandleChange}
            value={email}
          />
        </div>
        <div className="label-container">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            onChange={onHandleChange}
            value={password}
          />
        </div>
        <div className="label-container">
          <label>Phone Number: </label>
          <input
            type="number"
            name="phoneNumber"
            onChange={onHandleChange}
            value={phoneNumber}
          />
        </div>
        <div className="label-container">
          <label>Gender: </label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={onHandleChange}
          />{" "}
          Female
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={onHandleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={onHandleChange}
          />{" "}
          Other
        </div>
        <div className="label-container">
          <label>Language:</label>
          <select name="language" onChange={onHandleChange}>
            {/* value={name} */}
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Kannada">Kannada</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>
        <div className="label-container">
          <label>Zip Code: </label>
          <input
            type="number"
            name="zipcode"
            onChange={onHandleChange}
            value={zipcode}
          />
        </div>
        <div className="label-container">
          <label>About: </label>
          <textarea
            onChange={onHandleChange}
            name="about"
            id=""
            cols="30"
            rows="3"
            placeholder="Write about yourself...."
            value={about}
          ></textarea>
        </div>
        {
          data.id ? <button type="button" onClick={onUpdate}>
          Upadte
        </button>:<button type="button" onClick={onRegister}>
          Register
        </button>
        }
        
        <br />
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number: </th>
              <th>Gender</th>
              <th>Language</th>
              <th>ZipCode</th>
              <th>About</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list.map((each, i) => {
              return (
                <tr key={i}>
                  <td>{each.name}</td>
                  <td>{each.email}</td>
                  <td>{each.password}</td>
                  <td>{each.phoneNumber}</td>
                  <td>{each.gender}</td>
                  <td>{each.language}</td>
                  <td>{each.zipcode}</td>
                  <td>{each.about}</td>
                  <td onClick={() => {onEdit(each)}}>Edit</td>
                  <td onClick={() =>{onDelete(each)}}>Delete</td>
                  {/* <td onClick = {(each) => {onDelete(each)}}>Delete</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormTwoFunctional;
