import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React, { useState } from "react";
import { Table, Button, Tooltip, Row, Col, Container, Modal, Input, Text } from "@nextui-org/react";
import styles from './index.module.scss';
import { GetCityWithDistricts, AddDisctrict as AddProcess } from "Data/Disticts.Controller";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const Ilceler = ({ cityWithDisctricts }) => {

    const router = useRouter();

    const [districtList, setDistrictlist] = useState(cityWithDisctricts?.DisctrictList || []);
    const [districtName, setDistrictName] = useState("");
    const [visible, setVisible] = useState(false);

    const handler = () => setVisible(true);

    const closeHandler = () => {
        setDistrictName("");
        setVisible(false);
    };

    const saveDistrict = async (e) => {
        e.preventDefault();
        if (!districtName) {
            alert("İlçe Adını Giriniz!");
            return;
        }

        const data = {
            DistrictName: districtName,
            city: cityWithDisctricts.CityId
        };

        const responseResult = await AddProcess(null, data);

        if (responseResult?.hasError) {
            responseResult?.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }

        setDistrictlist((items) => [...items, responseResult]);

        toast.success(`${responseResult.DistrictName} Eklendi`, { position: "top-right" });
        router.push(window.location.href);
        closeHandler();

    }

    return (
        <AdminLayout activePageName={AdminRouteNames.ILLER} adminTitle={`${cityWithDisctricts.CityName} İlçeler Listesi`}>
            <Container>
                <Row justify="flex-end">
                    <Button color="success" onPress={handler}>{cityWithDisctricts.CityName}-Yeni İlçe Ekle</Button>
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
                    <Table.Column>İLÇE ADI</Table.Column>
                    <Table.Column>İL ADI</Table.Column>
                    <Table.Column>DETAY</Table.Column>
                    <Table.Column>SİL</Table.Column>
                </Table.Header>
                <Table.Body>
                    {districtList?.map((item, index) => (
                        <Table.Row key={item.DisctrictId}>
                            <Table.Cell>{item.DisctrictId}</Table.Cell>
                            <Table.Cell>{item.DistrictName}</Table.Cell>
                            <Table.Cell>{cityWithDisctricts?.CityName}</Table.Cell>

                            <Table.Cell>
                                <Tooltip content="Detay">
                                    <Button color="warning">Detay</Button>
                                </Tooltip>
                            </Table.Cell>
                            <Table.Cell>
                                <Tooltip content="Sil">
                                    <Button color="error">Sil</Button>
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
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <form onSubmit={async (e) => await saveDistrict(e)}>
                    <Modal.Body>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            type="text"
                            color="primary"
                            label="İlçe Adı"
                            size="lg"
                            placeholder="İlçe Adını Giriniz"
                            value={districtName}
                            onChange={(e) => setDistrictName(e.target.value)}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={closeHandler}>
                            Kapat
                        </Button>
                        <Button auto type="submit" color="success">
                            Kaydet
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </AdminLayout >
    )
}
export default Ilceler;

export const getServerSideProps = async ({ query }) => {
    const { id } = query;
    const cityWithDisctricts = await GetCityWithDistricts(null, id);
    console.log(cityWithDisctricts);
    return {
        props: {
            cityWithDisctricts,
        }
    }
}