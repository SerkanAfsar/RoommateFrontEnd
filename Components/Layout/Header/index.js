import React from "react";
import styles from './index.module.scss';
import Link from "next/link";

const Header = () => {
    return (
        <header className={`${styles.header} shadow`}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/">
                        <a className={styles.navBrand}>
                            Ev Arkadaşı İlanları
                        </a>
                    </Link>
                    <ul>
                        <li>
                            <a>İstanbul Ev Arkadaşı İlanları</a>
                        </li>
                        <li>
                            <a>Ankara Ev Arkadaşı İlanları</a>
                        </li>
                        <li>
                            <a>İzmir Ev Arkadaşı İlanları</a>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header;