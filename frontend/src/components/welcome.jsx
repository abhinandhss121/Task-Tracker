import React from 'react';
import { useNavigate } from "react-router-dom"; 
import './style.css'

const Welcome = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login'); 
    };
    
    return (
        <div className="welcome-1">
            <h1>Welcome to Task Tracker</h1>
            <button className="homepage" onClick={goToLogin}>Login/Signup</button>
        </div>
    );
}
export default Welcome;
