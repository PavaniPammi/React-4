import React, { useEffect, useState } from 'react'
import axios from "axios"

function FormOneFunctional() {
    const [fullName, setFullName ] = useState({
        fname: "",
        lname:""
    })
    const [fullNameList, setFullNameList] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:3005/users")
        .then(res=> {
            setFullNameList(res.data)
        })
        .catch(err => {
            console.log(err.data)
        })
    },[])
    const handleChange =(e) => {
      const newFullName = {...fullName}
      newFullName[e.target.name ] = e.target.value
      setFullName(newFullName)
    }

    const onSubmitForm = () => {
        axios.post("http://localhost:3005/users", fullName)
        .then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
  return (
    
       <div>
        <center>
          <form>
            <label htmlFor="fname">First Name: </label>
            <input
              type="text"
              name="fname"
              value={fullName.fname}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="lname">Last Name: </label>
            <input
              type="text"
              name="lname"
              value={fullName.lname}
              onChange={handleChange}
            />
            <br />
            <button  onClick={onSubmitForm} type="button">Submit</button>
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
                {fullNameList.map((eachItem,i) => (<tr key = {i}>
                      <td>{eachItem.fname}</td>
                      <td>{eachItem.lname}</td>
                      <td>Delete</td>
                      <td>Edit</td>
                </tr>))}
            </tbody>
          </table>
        </center>
      
    </div>
  )
}

export default FormOneFunctional
