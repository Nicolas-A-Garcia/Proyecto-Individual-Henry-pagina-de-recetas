import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';


export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="welcomeMsg">Your kitchen page</h1>
            
            <Link to='/home' id="click">
                <button className="homeButton">Begin</button>
            </Link>
            <h3>Created by Nicolás García</h3>

        </div>
    )
}
