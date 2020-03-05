import React from 'react';
import Link from '../Shared/Link';
import styles from './Aside.module.css';

function Aside() {
    return (
        <aside className={styles.Aside}>
            <ul>
                <Link to="#">Aside Link 1</Link>
                <Link to="#">Asdie Link 2</Link>
            </ul>
        </aside>
    );
}

export default Aside;