import React from 'react';
import '../Shared/LoginAndRegister.css';

export default function Login() {
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
                <button type="submit">Login</button>
            </div>
        </form>
    )
}