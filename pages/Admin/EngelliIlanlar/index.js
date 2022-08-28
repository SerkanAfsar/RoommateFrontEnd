import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from 'react';
import styles from './index.module.scss';


const EngelliIlanlar = () => {
    return (
        <AdminLayout activePageName={AdminRouteNames.ENGELLIILANLAR}>
            {AdminRouteNames.ENGELLIILANLAR}
        </AdminLayout>
    );

}
export default EngelliIlanlar;