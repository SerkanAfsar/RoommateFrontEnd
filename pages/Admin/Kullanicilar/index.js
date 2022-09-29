import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import { Table, Button, Tooltip, Row, Col, Container, Modal, Input, Text } from "@nextui-org/react";
import React, { useState } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { DeleteUser, GetUsersList } from "Data/Users.Controller";
import { toast } from "react-toastify";

const Kullanicilar = ({ users }) => {

    const router = useRouter();
    const [userList, setUserList] = useState(users);

    const deleteUser = async (id) => {
        var confirmRes = confirm("Kullanıcıyı Silmek İstiyormusunuz?");
        if (confirmRes) {
            const responseResult = await DeleteUser(null, id);
            toast.error(`${responseResult.email} silindi`, { position: "top-right" });
            setUserList((items) => items.filter(a => a.id != responseResult.id));
        }
    }


    return (
        <AdminLayout activePageName={AdminRouteNames.KULLANICILAR}>
            <Container>
                <Row justify="flex-end">
                    <Button color="success" onPress={() => { router.push("/Admin/KullaniciEkle") }}>Yeni Kullanıcı Ekle</Button>
                </Row>
            </Container>
            <Table
                aria-label="Example static collection table with multiple selection"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode="multiple"
            >
                <Table.Header>
                    <Table.Column>#</Table.Column>
                    <Table.Column>Ad Soyad</Table.Column>
                    <Table.Column>E-Mail</Table.Column>
                    <Table.Column>Rolü</Table.Column>
                    {/* <Table.Column>DETAY</Table.Column> */}
                    <Table.Column>SİL</Table.Column>
                </Table.Header>
                <Table.Body>
                    {userList.map((item, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.NameSurname}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.role.name}</Table.Cell>
                            {/* <Table.Cell>
                                <Tooltip content="Detay">
                                    <Button color="warning" onClick={(e) => { router.push(`/Admin/KullaniciGuncelle?id=${item.id}`) }}>Detay</Button>
                                </Tooltip>
                            </Table.Cell> */}
                            <Table.Cell>
                                <Tooltip content="Sil">
                                    <Button color="error" onClick={async (e) => await deleteUser(item.id)}>Sil</Button>
                                </Tooltip>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={10}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </AdminLayout>
    )
}
export default Kullanicilar;

export const getServerSideProps = async () => {
    const users = await GetUsersList(null);
    return {
        props: {
            users
        }
    }
}