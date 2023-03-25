import React, { Component } from "react";
import "./index.css";
import axios from "axios";

export default class FormTwoClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        language: "",
        zipcode: "",
        about: "",
      },
      list: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3005/two").then((res) => {
      this.setState({ list: res.data });
    });
  }
  onHandleChange = (event) => {
    let newData = { ...this.state.data };
    newData[event.target.name] = event.target.value;
    this.setState({ data: newData });
  };

  onRegister = () => {
    axios
      .post("http://localhost:3005/two", this.state.data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { name, email, password, zipcode, about, phoneNumber } =
      this.state.data;
    return (
      <div className="container">
        <div className="card-container">
          <div className="label-container">
            <label>Name: </label>
            <input
              type="text"
              placeholder="your name"
              name="name"
              onChange={this.onHandleChange}
              value={name}
            />
          </div>
          <div className="label-container">
            <label>Email: </label>
            <input
              type="email"
              placeholder="your email"
              name="email"
              onChange={this.onHandleChange}
              value={email}
            />
          </div>
          <div className="label-container">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              onChange={this.onHandleChange}
              value={password}
            />
          </div>
          <div className="label-container">
            <label>Phone Number: </label>
            <input
              type="number"
              name="phoneNumber"
              onChange={this.onHandleChange}
              value={phoneNumber}
            />
          </div>
          <div className="label-container">
            <label>Gender: </label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={this.onHandleChange}
            />{" "}
            Female
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={this.onHandleChange}
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={this.onHandleChange}
            />{" "}
            Other
          </div>
          <div className="label-container">
            <label>Language:</label>
            <select name="language" onChange={this.onHandleChange}>
              {/* value={name} */}
              <option value="Telugu">
                Telugu
              </option>
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
              onChange={this.onHandleChange}
              value={zipcode}
            />
          </div>
          <div className="label-container">
            <label>About: </label>
            <textarea
              onChange={this.onHandleChange}
              name="about"
              id=""
              cols="30"
              rows="3"
              placeholder="Write about yourself...."
              value={about}
            ></textarea>
          </div>
          <button type="button" onClick={this.onRegister}>
            Register
          </button><br/>
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
            {this.state.list.map((each, i) => {
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
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        
      </div>
    );
  }
}
