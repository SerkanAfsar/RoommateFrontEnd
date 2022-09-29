import React from 'react';
import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import styles from './index.module.scss';
import TopNav from './TopNav';

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <TopNav />
        </header>
    );
}
export default Header;