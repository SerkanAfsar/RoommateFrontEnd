import React from "react";
import styles from './AlertModule.module.scss';

const AlertModule = ({ items, title }) => {
    return (
        <div className={`${styles.wrapper} alert alert-danger`} role="alert" >
            <h4>{title}</h4>
            <ul>
                {items?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default AlertModule;