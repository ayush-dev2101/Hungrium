import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "../../styles/auth-shared.css"
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

      const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://  localhost:3000/api/auth/user/register", {
    fullName: firstName + " " + lastName, email, password
  },{
    withCredentials: true
  })
  console.log(response.data);
  navigate("/")
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-label="user-register-title">
        <header>
          <h1 id= "user-register-title" className=""></h1>
        </header>
      </div>
    </div>
  )


}