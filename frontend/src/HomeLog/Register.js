import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [values, setValues] = useState({
      username:'',
      password:''
    });
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:8000/register', values);
        if (response.data.Status === "Success") {
            navigate('/login');
        } else {
            alert("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <body>
    <section>
          <div className="container mt-5 pt-5">
            <div className="row">
              <div className="col-12 col-sm-7 col-md-6 m-auto">
                <div className="card border-0 shadow">
                  <div className="card-body text-center mt-3">
                    <h3 className=' text-left mt-4'>Register</h3>
                    <svg className="mx-auto my-3 bi bi-person-circle" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                    <form onSubmit={handleSubmit}>
                      <input type="text" name='username' className="form-control my-4 py-2" onChange={e => setValues({...values, username:e.target.value})}  placeholder="Username" />
                      <input type="password" name="paassword" className="form-control my-4 py-2" onChange={e => setValues({...values, password:e.target.value})}  placeholder="Password" />
                      <div className="text-center mt-3">
                        <button type='Submit' className="btn btn-primary">Register</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </section>
  </body>

)};

export default Register;
