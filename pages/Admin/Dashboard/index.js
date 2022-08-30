import React from "react";
import AdminLayout from "@/Components/AdminLayout";
import { useSession } from "next-auth/react";
import styles from './index.module.scss';
import AlertModule from "@/Components/CustomComponents/AlertModule";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import { GetCityCount } from "Data/Cities.Controller";
import { Grid } from "@nextui-org/react";
import Statistics from "@/Components/AdminComponents/DashBoard/Statistics";
import { GetAdminAccessedAdvetisementCount, GetAdminNotAccessedAdvertisementCount } from "Data/Advertisements.Controller";
import { GetDistictCount } from "Data/Disticts.Controller";
import { GetUserCount } from "Data/Users.Controller";

const Dashboard = ({ cityCount, adminAccessedAdvCount, adminNotAccessedAdvCount, distictCount, userCount }) => {

    const { data: session, status } = useSession();

    if (cityCount?.hasError) {
        return (
            <AdminLayout activeLink={AdminRouteNames.ANASAYFA} activePageName={AdminRouteNames.ANASAYFA}>
                <AlertModule items={cityCount.errorList} title="City Count Error" />
            </AdminLayout>
        )
    }

    if (adminAccessedAdvCount?.hasError) {
        return (
            <AdminLayout activeLink={AdminRouteNames.ANASAYFA} activePageName={AdminRouteNames.ANASAYFA}>
                <AlertModule title={"Onaylı İlan Sayısı"} items={adminAccessedAdvCount.errorList} />
            </AdminLayout>
        )
    }
    if (adminNotAccessedAdvCount?.hasError) {
        return (
            <AdminLayout activeLink={AdminRouteNames.ANASAYFA} activePageName={AdminRouteNames.ANASAYFA}>
                <AlertModule title={"Onay Bekleyen İlan Sayısı"} items={adminNotAccessedAdvCount.errorList} />
            </AdminLayout>
        )
    }
    if (distictCount?.hasError) {
        return (
            <AdminLayout activeLink={AdminRouteNames.ANASAYFA} activePageName={AdminRouteNames.ANASAYFA}>
                <AlertModule title={"İlçe İlan Sayısı"} items={distictCount.errorList} />
            </AdminLayout>
        )
    }
    if (userCount?.hasError) {
        return (
            <AdminLayout activeLink={AdminRouteNames.ANASAYFA} activePageName={AdminRouteNames.ANASAYFA}>
                <AlertModule title={"Kullanıcı Sayısı"} items={userCount.errorList} />
            </AdminLayout>
        )
    }

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
            <Grid.Container gap={2} justify="start">
                <Grid xs={12} md={3}>
                    <Statistics counterName={"İl Sayısı"} count={cityCount} />
                </Grid>
                <Grid xs={12} md={3}>
                    <Statistics counterName={"Onaylı İlan Sayısı"} count={adminAccessedAdvCount} />
                </Grid>
                <Grid xs={12} md={3}>
                    <Statistics counterName={"Onay Bekleyen İlan Sayısı"} count={adminNotAccessedAdvCount} />
                </Grid>
                <Grid xs={12} md={3}>
                    <Statistics counterName={"İlçe Sayısı"} count={distictCount} />
                </Grid>
                <Grid xs={12} md={3}>
                    <Statistics counterName={"Kullanıcı Sayısı"} count={userCount} />
                </Grid>
            </Grid.Container>
        </AdminLayout >
    )
}
export const getStaticProps = async () => {
    const cityCount = await GetCityCount(null);
    const adminAccessedAdvCount = await GetAdminAccessedAdvetisementCount(null);
    const adminNotAccessedAdvCount = await GetAdminNotAccessedAdvertisementCount(null);
    const distictCount = await GetDistictCount(null);
    const userCount = await GetUserCount(null);

    return {
        props: {
            cityCount,
            adminAccessedAdvCount,
            adminNotAccessedAdvCount,
            distictCount,
            userCount
        },
        revalidate: 1
    }
}
export default Dashboard;