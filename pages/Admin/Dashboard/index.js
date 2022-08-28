import React from "react";
import AdminLayout from "@/Components/AdminLayout";
import { useSession } from "next-auth/react";
import styles from './index.module.scss';
import AlertModule from "@/Components/CustomComponents/AlertModule";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import { GetCityCount } from "Data/Cities.Controller";
import { Grid } from "@nextui-org/react";
import Statistics from "@/Components/AdminComponents/DashBoard/Statistics";
const Dashboard = ({ cityCount }) => {

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
            <Grid.Container gap={2} justify="start">
                <Grid xs={3}>
                    <Statistics counterName={"İl Sayısı"} count={cityCount} />
                </Grid>
                <Grid xs={3}>
                    <Statistics counterName={"İl Sayısı"} count={cityCount} />
                </Grid>
                <Grid xs={3}>
                    <Statistics counterName={"İl Sayısı"} count={cityCount} />
                </Grid>
                <Grid xs={3}>
                    <Statistics counterName={"İl Sayısı"} count={cityCount} />
                </Grid>
            </Grid.Container>
        </AdminLayout >
    )
}
export const getStaticProps = async () => {
    const cityCount = await GetCityCount(null);

    return {
        props: {
            cityCount
        },
        revalidate: 1
    }
}
export default Dashboard;