import React from "react";
import AdminLayout from "@/Components/AdminLayout";
import { useSession } from "next-auth/react";
import styles from './index.module.scss';
import AlertModule from "@/Components/CustomComponents/AlertModule";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";

const Dashboard = ({ result }) => {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div style={{ display: "flex", height: "100vh", flex: 1, justifyContent: "center", alignItems: "center" }}>
                <div className="alert alert-warning" role="alert">
                    Yükleniyor...
                </div>
            </div>
        )
    }

    // if (status === "unauthenticated") {
    //     return (
    //         <div style={{ display: "flex", height: "100vh", flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <div className="alert alert-danger" role="alert">
    //                 Yetkiniz Bulunmamaktadır...Giriş Başarısız..
    //             </div>
    //         </div>
    //     )
    // }
    // if (categoryCountResult.hasError) {
    //     return (
    //         <AdminLayout activeLink="anasayfa" activePageName={"DashBoard"}>
    //             <AlertModule items={categoryCountResult?.errorList} />
    //         </AdminLayout>
    //     )
    // }
    // if (newsCountResult.hasError) {
    //     return (
    //         <AdminLayout activeLink="anasayfa" activePageName={"DashBoard"}>
    //             <AlertModule items={newsCountResult?.errorList} />
    //         </AdminLayout>
    //     )
    // }
    return (
        <AdminLayout activeLink={AdminRouteNames.ANASAYFA} activePageName={AdminRouteNames.ANASAYFA}>
            {/* <DashboardMainComponent
                categoryCountResult={categoryCountResult}
                newsCountResult={newsCountResult} /> */}
            Deneme 123
        </AdminLayout>
    )
}
export const getStaticProps = async () => {

    return {
        props: {
            result: {}
        },
        revalidate: 1
    }
}
export default Dashboard;