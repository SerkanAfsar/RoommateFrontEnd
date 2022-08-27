import React, { useContext } from "react";
import styles from './index.module.scss';
import Link from "next/link";
;
import { AdminContext } from "Context/AdminContext";
import { useRouter } from 'next/router';
import { signOut, useSession } from "next-auth/react"
import { FaBeer, FaCity } from 'react-icons/fa';
import { BsFillCheckCircleFill, BsFillQuestionCircleFill } from 'react-icons/bs';
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

                <li className={activePageName == "Adminler" ? styles.active : ""}>
                    <Link href="/Admin/Adminler">
                        <a>
                            <i className="bi bi-person-circle"></i>
                            <span>Adminler</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == "Kategori Ekle" ? styles.active : ""}>
                    <Link href="/Admin/KategoriEkle">
                        <a>
                            <i className="bi bi-file-plus-fill"></i>
                            <span>Kategori Ekle</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == "Kategoriler" ? styles.active : ""}>
                    <Link href="/Admin/Kategoriler">
                        <a>
                            <i className="bi bi-list-ul"></i>
                            <span>Kategoriler</span>
                        </a>
                    </Link>
                </li>

                <li className={activePageName == "Haber Ekle" ? styles.active : ""}>
                    <Link href="/Admin/HaberEkle">
                        <a>
                            <i className="bi bi-file-plus-fill"></i>
                            <span>Haber Ekle</span>
                        </a>
                    </Link>
                </li>
                <li className={activePageName == "Haberler" ? styles.active : ""}>
                    <Link href="/Admin/Haberler">
                        <a>
                            <i className="bi bi-newspaper"></i>
                            <span>Haberler</span>
                        </a>
                    </Link>
                </li>

                <li>
                    <a href="#" onClick={() => signOut({ callbackUrl: "/Admin" })}>
                        <i className="bi bi-x-octagon-fill"></i>
                        <span>Güvenli Çıkış</span>
                    </a>
                </li>

            </ul>
        </aside >
    )
}
export default AdminAside;