import React from 'react';
import styles from './Footer.module.css';
import Link from '../Shared/Link';

function Footer() {
    return (
        <nav className={styles.Footer}>
            <ul>
                <Link to="#">Link 1</Link>
                <Link to="#">Link 2</Link>
                <Link to="#">
                    <img id="logo" src="/logo192.png" alt="my-app-logo" />
                </Link>
            </ul>
        </nav>
    );
}

export default Footer;