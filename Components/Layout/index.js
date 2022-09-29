import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import styles from './index.module.scss';
import { Container } from "@nextui-org/react";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Container>
                <Content>
                    {children}
                </Content>
            </Container>
            <Footer />
        </>
    );
}
export default Layout;