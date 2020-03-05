import React from 'react';
import './Register.css';

export default function Register() {
    return (
        <form className="Login" method="post">
        <div className="form-control">
            <label htmlFor="">Username</label>
            <input type="text" name="username" />
        </div>
        <div className="form-control">
            <label htmlFor="">Password</label>
            <input type="password" name="password" />
        </div>
        <div className="form-control">
            <label htmlFor="">Repeat Password</label>
            <input type="password" name="password" />
        </div>
        <div className="form-control">
            <button type="submit">Register</button>
        </div>
    </form>
    )
}