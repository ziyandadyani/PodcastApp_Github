import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    
    return (
        <section className="banner">
            <div className="account--user">
                <h2 className="user">Welcome</h2>
                <Link to="login">
                    <button>Login</button>
                </Link>
            </div>
            <small className="notify">
                Echo, your trusted source for news and entertainment 
            </small>
        </section>
    );
};

export default Banner;
