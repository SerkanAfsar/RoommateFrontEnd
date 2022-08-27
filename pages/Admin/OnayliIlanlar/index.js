import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from "react";
import styles from './index.module.scss';


const OnayliIlanlar = () => {
    return (
        <AdminLayout activePageName={AdminRouteNames.ONAYLIILANLAR}>
            Onaylı Ilanlar
        </AdminLayout>
    )
}
export default OnayliIlanlar;