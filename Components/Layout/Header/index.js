import React from "react";
import styles from './index.module.scss';
import Link from "next/link";
import { Container, Row, Col } from '@nextui-org/react';

const Header = () => {
    return (
        <header className={`${styles.header} shadow`}>
            <Container>
                <Row>
                    <Col>
                        <nav className={styles.nav}>
                            <Link href="/">
                                <a className={styles.navBrand}>
                                    Ev Arkadaşı İlanları
                                </a>
                            </Link>
                            <ul>
                                <li>
                                    <a>
                                        <i className="bi bi-person-circle"></i>
                                        <span>
                                            Üye Ol
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="bi bi-person-plus-fill"></i>
                                        <span>
                                            Üye  Girişi
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                </Row>
            </Container>
        </header >
    )
}
export default Header;