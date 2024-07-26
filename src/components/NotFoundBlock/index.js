import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>🙁</span>
                <br />
                This page couldn't be found!
            </h1>
            <p className={styles.description}>Sorry, the store doesn't have this product.</p>
        </div>
    );
};

export default NotFoundBlock;
