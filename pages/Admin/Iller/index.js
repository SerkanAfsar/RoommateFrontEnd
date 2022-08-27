import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from "react";
import styles from './index.module.scss';

const Iller = () => {
    return (
        <AdminLayout activePageName={AdminRouteNames.ILLER}>
            Deneme Iller
        </AdminLayout>
    )
}
export default Iller;