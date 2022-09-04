import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React from "react";
import styles from './index.module.scss';
import { Input, useInput, Grid, Radio, Switch, Text, Button } from "@nextui-org/react";
import { CINSIYET } from "@/Enums/Cinsiyet";
import { ALKOLKULLANIM } from "@/Enums/AlkolKullanim";
import { SigaraKullanim } from "@/Enums/SigaraKullanim";
import { GetRoleTypes } from "Data/Users.Controller";

const KullaniciEkle = ({ roleTypes }) => {
    console.log(roleTypes);

    const { value, reset, bindings } = useInput("");

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper = React.useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "E-Mail Doğru" : "E-Mail Formatı Yanlış",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    return (
        <AdminLayout activePageName={AdminRouteNames.KULLANICIEKLE}>
            <Grid.Container gap={2}>
                <Grid xs={12}>
                    <Input
                        width="100%"
                        clearable
                        helperText="Adınızı Soyadınız Giriniz..."
                        label="Ad Soyad"
                        placeholder="Adınız Soyadınız..."
                    />
                </Grid>
                <Grid xs={12} >
                    <Input
                        {...bindings}
                        clearable
                        shadow={false}
                        onClearClick={reset}
                        status={helper.color}
                        color={helper.color}
                        helperColor={helper.color}
                        helperText={helper.text}
                        type="email"
                        label="Email"
                        placeholder="E-Mail Adresinizi Giriniz..."

                        width="100%"
                    />
                </Grid>
                <Grid xs={12}>
                    <Input
                        width="100%"
                        clearable
                        helperText="Şifre Giriniz..."
                        label="Şifre"
                        placeholder="Şifre Giriniz..."
                    />
                </Grid>
                <Grid xs={12}>
                    <Grid.Container>
                        <Grid xs={12}>
                            <Text>Admin Onaylımı</Text>
                        </Grid>
                        <Grid xs={12}><Switch checked={false} /></Grid>
                    </Grid.Container>



                </Grid>
                <Grid xs={12} >
                    <Radio.Group size="sm" css={{ fontSize: "15px" }} label="Cinsiyet" orientation="horizontal" defaultValue={CINSIYET.ERKEK}>
                        {Object.keys(CINSIYET).map((item, index) => (
                            <Radio css={{ fontSize: "12px" }} value={item}>{item}</Radio>
                        ))}
                    </Radio.Group>
                </Grid>
                <Grid xs={12} >
                    <Radio.Group size="sm" css={{ fontSize: "15px" }} label="Alkol Kullanım" orientation="horizontal" defaultValue={ALKOLKULLANIM.ARASIRA}>
                        {Object.keys(ALKOLKULLANIM).map((item, index) => (
                            <Radio css={{ fontSize: "12px" }} value={item}>{item}</Radio>
                        ))}
                    </Radio.Group>
                </Grid>
                <Grid xs={12} >
                    <Radio.Group size="sm" css={{ fontSize: "15px" }} label="Sigara Kullanım" orientation="horizontal" defaultValue={SigaraKullanim.ARASIRA}>
                        {Object.keys(SigaraKullanim).map((item, index) => (
                            <Radio css={{ fontSize: "12px" }} value={item}>{item}</Radio>
                        ))}
                    </Radio.Group>
                </Grid>
                <Grid xs={12}>
                    <Radio.Group size="sm" css={{ fontSize: "15px" }} label="Rol Tipi" orientation="horizontal" defaultValue={roleTypes[0]?.id}>
                        {roleTypes.map((item, index) => (
                            <Radio css={{ fontSize: "12px" }} value={item.id}>{item.name}</Radio>
                        ))}
                    </Radio.Group>
                </Grid>
                <Grid xs={12} justify="flex-end">
                    <Button color="success">Kaydet</Button>
                </Grid>
            </Grid.Container>
        </AdminLayout >
    )
}
export default KullaniciEkle;

export const getServerSideProps = async () => {
    const roleTypes = await GetRoleTypes(null);


    return {
        props: {
            roleTypes
        }
    }
}