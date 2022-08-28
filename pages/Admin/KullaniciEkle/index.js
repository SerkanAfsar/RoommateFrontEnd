import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from "react";
import styles from './index.module.scss';

const KullaniciEkle = () => {

    return (
        <AdminLayout activePageName={AdminRouteNames.KULLANICIEKLE}>
            {AdminRouteNames.KULLANICIEKLE}
        </AdminLayout>
    )
}
export default KullaniciEkle;