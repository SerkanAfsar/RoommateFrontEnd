import React from "react";
import styles from './index.module.scss';
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}
export default Layout;