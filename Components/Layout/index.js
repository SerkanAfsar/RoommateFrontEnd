import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import styles from './index.module.scss';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Content>
                {children}
            </Content>
            <Footer />
        </>
    );
}
export default Layout;