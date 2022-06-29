import React from "react";
import styles from './index.module.scss';
import Header from "./Header";
import Content from "./Content";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Content>
                {children}
            </Content>
        </>
    )
}
export default Layout;