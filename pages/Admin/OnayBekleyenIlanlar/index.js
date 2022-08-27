import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from "react";
import styles from './index.module.scss';

const OnayBekleyenIlanlar = () => {
    return (
        <AdminLayout activePageName={AdminRouteNames.ONAYBEKLEYENILANLAR}>
            <div>{AdminRouteNames.ONAYBEKLEYENILANLAR}</div>
        </AdminLayout>
    )
}
export default OnayBekleyenIlanlar;