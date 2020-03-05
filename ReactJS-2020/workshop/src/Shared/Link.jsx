import React from 'react';
import styles from './Link.module.css';
import { Link as RouterDomLink } from 'react-router-dom';

function Link({ to, children }) {
    return (
        <li className={styles.listItem}>
            <RouterDomLink to={to}>{children}</RouterDomLink>
        </li>
    );
}

export default Link;