import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompShowNote from '../Notes/Shownotes.js';


export default function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8000')
        .then(res => {
            if (res.data.Status === "Success") {
                setAuth(true);
                setName(res.data.name);
            } else {
                setAuth(false);
                setMessage(res.data.Error);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const handleLogout = () => {
        axios.post('http://localhost:8000/logout')
        .then(res => {
            setAuth(false);
            navigate('/login');
        })
        .catch(error => {
            console.error("Error logging out:", error);
        });
    };

    return (
        <div className='col-md-auto'>
            {auth ? 
                <div className='navbar-dark'>
                    <nav className="navbar justify-content-between navbar-dark bg-dark">
                        <h3 className='text-left text-white ms-3'>You are Authorized - {name}(User ID: {userId})</h3>
                        <div className="d-flex">
                            <button className='btn btn-danger me-2' onClick={handleLogout}>Logout</button>
                        </div>
                    </nav>
                    <div className='mt-3 mb-3 card border-0 shadow container'>
                        <CompShowNote/>
                    </div>
                </div>
             :  
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to="/login" className='btn btn-primary'>Login</Link>
                </div>
            }
        </div>
    );
}
