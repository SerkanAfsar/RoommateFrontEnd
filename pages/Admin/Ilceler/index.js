import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React, { useState } from "react";
import { Table, Button, Tooltip, Row, Col, Container, Modal, Input, Text } from "@nextui-org/react";
import styles from './index.module.scss';
import { GetCityWithDistricts, AddDisctrict as AddProcess, UpdateDisctrict as UpdateProcess, DeleteDisctrict as DeleteProcess } from "Data/Disticts.Controller";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const Ilceler = ({ cityWithDisctricts }) => {

    const router = useRouter();

    const [districtList, setDistrictlist] = useState(cityWithDisctricts?.DisctrictList || []);
    const [districtName, setDistrictName] = useState("");
    const [district, setDistrict] = useState({});
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);

    const handler = () => setVisible(true);
    const updateHandler = () => setVisibleUpdate(true);


    const closeHandler = () => {
        setDistrictName("");
        setVisible(false);
    };

    const updateCloseHandler = () => {
        setDistrict({});
        setVisibleUpdate(false);
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
        closeHandler();

    }

    const updateDistrict = async (e) => {
        e.preventDefault();
        if (!district.DistrictName) {
            alert("İlçe Adını Giriniz!");
            return;
        }

        const data = {
            DistrictName: district.DistrictName
        };

        const responseResult = await UpdateProcess(null, district.DisctrictId, data);
        if (responseResult?.hasError) {
            responseResult?.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }
        const arr = districtList;
        const item = arr[arr.findIndex(a => a.DisctrictId == responseResult.DisctrictId)];
        item.DistrictName = responseResult.DistrictName;
        setDistrictlist(arr);
        toast.success(`${responseResult.DistrictName} Güncellendi!`, { position: "top-right" });
        updateCloseHandler();

    }

    const deleteDistrict = async (districtId) => {
        const responseResult = await DeleteProcess(null, districtId);
        if (responseResult?.hasError) {
            responseResult?.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }

        toast.error(`${responseResult.DistrictName} Silindi`, { position: "top-right" });
        setDistrictlist((items) => items.filter(a => a.DisctrictId != responseResult.DisctrictId));
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
                                    <Button color="warning" onClick={(e) => {
                                        setVisibleUpdate(true);
                                        setDistrict(item);
                                    }}>Detay</Button>
                                </Tooltip>
                            </Table.Cell>
                            <Table.Cell>
                                <Tooltip content="Sil">
                                    <Button color="error" onClick={async () => await deleteDistrict(item.DisctrictId)}>Sil</Button>
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
                onClose={closeHandler}>
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

            <Modal
                closeButton
                aria-labelledby="modal-title-update"
                open={visibleUpdate}
                onClose={updateCloseHandler}>
                <form onSubmit={async (e) => await updateDistrict(e, district)}>
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
                            value={district.DistrictName}
                            onChange={(e) => setDistrict({ ...district, DistrictName: e.target.value })}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={updateCloseHandler}>
                            Kapat
                        </Button>
                        <Button auto type="submit" color="success">
                            Güncelle
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

    return {
        props: {
            cityWithDisctricts,
        }
    }
}