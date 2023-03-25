import React, { Component } from "react";
import axios from "axios";

export default class FromOneClass extends Component {
  constructor() {
    super();
    this.state = {
      fullName: {
        fname: "",
        lname: "",
      },
      fullNameList: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3005/users")
      .then((res) => {
        this.setState({ fullNameList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    const newFullName = { ...this.state.fullName };
    newFullName[e.target.name] = e.target.value;
    this.setState({ fullName: newFullName });
  };

  onSubmitForm = () => {
    
    axios
      .post("http://localhost:3005/users", this.state.fullName)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <center>
          <form>
            <label htmlFor="fname">First Name: </label>
            <input
              type="text"
              name="fname"
              value={this.state.fullName.fname}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="lname">Last Name: </label>
            <input
              type="text"
              name="lname"
              value={this.state.fullName.lname}
              onChange={this.handleChange}
            />
            <br />
            <button  onClick={this.onSubmitForm} type="button">Submit</button>
            <br /> <hr />
            <br />{" "}
          </form>
          <table border={"1"}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
                {this.state.fullNameList.map((eachItem,i) => (<tr key = {i}>
                      <td>{eachItem.fname}</td>
                      <td>{eachItem.lname}</td>
                      <td>Delete</td>
                      <td>Edit</td>
                </tr>))}
            </tbody>
          </table>
        </center>
      </div>
    );
  }
}
