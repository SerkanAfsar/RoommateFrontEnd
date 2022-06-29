import React from "react";
import styles from './index.module.scss';

const Content = ({ children }) => {
    return (
        <main className={`${styles.main}`}>
            {children}
        </main>
    )
}
export default Content;