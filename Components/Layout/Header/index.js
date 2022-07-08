import React from "react";
import styles from './index.module.scss';
import Link from "next/link";
import { Container, Row, Col } from '@nextui-org/react';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}></nav>
        </header>
    )
}
export default Header;