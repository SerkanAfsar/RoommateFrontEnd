import React, { useContext } from "react";
import styles from './index.module.scss';
import Link from "next/link";
;
import { AdminContext } from "Context/AdminContext";
import { useRouter } from 'next/router';
import { signOut, useSession } from "next-auth/react"
import { FaBeer, FaCity, } from 'react-icons/fa';
import { BsFillCheckCircleFill, BsFillQuestionCircleFill } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineStop, AiFillFileAdd } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { AdminRouteNames } from "@/Constants/AdminPageConstants";



const AdminAside = ({ activePageName }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { closed } = useContext(AdminContext);

    return (
        <aside className={closed == true ? `${styles.aside} ${styles.closed}` : `${styles.aside}`}>
            <div className={styles.asideHeader}>
                Admin Panel Yönetim
            </div>
            <div className={styles.subInfo}>
                {session?.nameSurname}

            </div>
            <ul>
                <li className={activePageName == AdminRouteNames.ANASAYFA ? styles.active : ""}>
                    <Link href="/Admin/Dashboard">
                        <a>
                            <FaBeer color="#fff" />
                            <span>{AdminRouteNames.ANASAYFA}</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == AdminRouteNames.ILLER ? styles.active : ""}>
                    <Link href="/Admin/Iller">
                        <a>
                            <FaCity color="#fff" />
                            <span>{AdminRouteNames.ILLER}</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == AdminRouteNames.ONAYLIILANLAR ? styles.active : ""}>
                    <Link href="/Admin/OnayliIlanlar">
                        <a>
                            <BsFillCheckCircleFill color="#fff" />
                            <span>{AdminRouteNames.ONAYLIILANLAR}</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == AdminRouteNames.ONAYBEKLEYENILANLAR ? styles.active : ""}>
                    <Link href="/Admin/OnayBekleyenIlanlar">
                        <a>
                            <BsFillQuestionCircleFill color="#fff" />
                            <span>{AdminRouteNames.ONAYBEKLEYENILANLAR}</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == AdminRouteNames.ENGELLIILANLAR ? styles.active : ""}>
                    <Link href="/Admin/EngelliIlanlar">
                        <a>
                            <AiOutlineStop color="#fff" />
                            <span>{AdminRouteNames.ENGELLIILANLAR}</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == AdminRouteNames.KULLANICIEKLE ? styles.active : ""}>
                    <Link href="/Admin/KullaniciEkle">
                        <a>
                            <AiFillFileAdd color="#fff" />
                            <span>{AdminRouteNames.KULLANICIEKLE}</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == AdminRouteNames.KULLANICILAR ? styles.active : ""}>
                    <Link href="/Admin/Kullanicilar">
                        <a>
                            <FiUsers color="#fff" />
                            <span>{AdminRouteNames.KULLANICILAR}</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <a>
                        <BiExit color="#fff" />
                        <span>Güvenli Çıkış</span>
                    </a>
                </li>
            </ul>
        </aside >
    )
}
export default AdminAside;