import React from 'react';
import styles from './Navigation.module.css';
import Link from '../Shared/Link';

function Navigation() {
    return (
        <nav className={styles.Navigation}>
            <ul>
                <Link to="#">
                    <img id={styles.logo} src="/logo192.png" alt="my-app-logo" />
                </Link>
                <Link to="/">Posts</Link>
                <Link to="/create-posts">New post</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </ul>
        </nav>
    )
}

export default Navigation;