import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from "react";
import styles from './index.module.scss';

const Kullanicilar = () => {
    return (
        <AdminLayout activePageName={AdminRouteNames.KULLANICILAR}>
            {AdminRouteNames.KULLANICILAR}
        </AdminLayout>
    )
}
export default Kullanicilar;