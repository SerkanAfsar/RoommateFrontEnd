import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React, { useState } from "react";
import styles from './index.module.scss';
import { Input, useInput, Grid, Radio, Switch, Text, Button } from "@nextui-org/react";
import { CINSIYET } from "@/Enums/Cinsiyet";
import { ALKOLKULLANIM } from "@/Enums/AlkolKullanim";
import { SigaraKullanim } from "@/Enums/SigaraKullanim";
import { CreateUser, GetRoleTypes } from "Data/Users.Controller";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const KullaniciEkle = ({ roleTypes }) => {
    const router = useRouter();
    const [emailValid, setEMailValid] = useState(false);

    const [userValues, setUserValues] = useState({
        NameSurname: "",
        username: "",
        email: "",
        AlkolKullanim: ALKOLKULLANIM.EVET,
        SigaraKullanim: SigaraKullanim.EVET,
        Cinsiyet: CINSIYET.ERKEK,
        role: 1,
        password: "",
        confirmed: true
    });



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

        setEMailValid(validateEmail(value));

        return {
            text: result ? "E-Mail Doğru" : "E-Mail Formatı Yanlış",
            color: result ? "success" : "error",
        };
    }, [value]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userValues.password) {
            toast.error("Şifreyi Giriniz", { position: "top-right" });
            return;
        }
        const responseResult = await CreateUser(null, userValues);
        if (responseResult?.hasError) {
            responseResult.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }
        toast.success("Kullanıcı Eklendi", { position: "top-right" });
        router.push("/Admin/Kullanicilar");
    }

    return (
        <AdminLayout activePageName={AdminRouteNames.KULLANICIEKLE}>
            <form onSubmit={async (e) => await handleSubmit(e)}>
                <Grid.Container gap={2}>
                    <Grid xs={12}>
                        <Input
                            width="100%"
                            clearable
                            helperText="Adınızı Soyadınız Giriniz..."
                            label="Ad Soyad"
                            value={userValues.NameSurname}
                            onChange={(e) => setUserValues({ ...userValues, NameSurname: e.target.value })}
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
                            value={userValues.email}
                            onChange={(e) => setUserValues({ ...userValues, email: e.target.value, username: e.target.value })}
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
                            value={userValues.password}
                            onChange={(e) => setUserValues({ ...userValues, password: e.target.value })}
                            placeholder="Şifre Giriniz..."
                        />
                    </Grid>
                    <Grid xs={12} >
                        <Radio.Group size="sm" css={{ fontSize: "15px" }}
                            onChange={(item) => setUserValues({ ...userValues, Cinsiyet: item })}
                            label="Cinsiyet" orientation="horizontal" defaultValue={CINSIYET.ERKEK}>
                            {Object.keys(CINSIYET).map((item, index) => (
                                <Radio key={index} css={{ fontSize: "12px" }} value={item}>{item}</Radio>
                            ))}
                        </Radio.Group>
                    </Grid>
                    <Grid xs={12} >
                        <Radio.Group size="sm" css={{ fontSize: "15px" }}
                            onChange={(item) => setUserValues({ ...userValues, AlkolKullanim: item })}
                            label="Alkol Kullanım" orientation="horizontal" defaultValue={ALKOLKULLANIM.ARASIRA}>
                            {Object.keys(ALKOLKULLANIM).map((item, index) => (
                                <Radio key={index} css={{ fontSize: "12px" }} value={item}>{item}</Radio>
                            ))}
                        </Radio.Group>
                    </Grid>
                    <Grid xs={12} >
                        <Radio.Group size="sm" css={{ fontSize: "15px" }}
                            onChange={(item) => setUserValues({ ...userValues, SigaraKullanim: item })}
                            label="Sigara Kullanım" orientation="horizontal" defaultValue={SigaraKullanim.ARASIRA}>
                            {Object.keys(SigaraKullanim).map((item, index) => (
                                <Radio key={index} css={{ fontSize: "12px" }} value={item}>{item}</Radio>
                            ))}
                        </Radio.Group>
                    </Grid>
                    <Grid xs={12}>
                        <Radio.Group size="sm" css={{ fontSize: "15px" }}
                            onChange={(item) => setUserValues({ ...userValues, role: item })}
                            label="Rol Tipi" orientation="horizontal" defaultValue={roleTypes[0]?.id} >
                            {
                                roleTypes.map((item, index) => (
                                    <Radio key={index} css={{ fontSize: "12px" }} value={item.id}>{item.name}</Radio>
                                ))
                            }
                        </Radio.Group>
                    </Grid>
                    <Grid xs={12} justify="flex-end">
                        <Button type="submit" color="success">Kaydet</Button>
                    </Grid>
                </Grid.Container>
            </form>
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