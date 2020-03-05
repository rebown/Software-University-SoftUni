import React from 'react';
import styles from './Post.module.css';

function Post({ imageUrl, imageAlt, author, children }) {
    return (
        <div className={styles.Post}>
            <img src={imageUrl} alt={imageAlt} />
            <p className={styles.description}>{children}</p>
            <div>
            <span>
                <small>Author:</small>
                {author}
            </span>
            </div>
        </div>
    );
}

export default Post;