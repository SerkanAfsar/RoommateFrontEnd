import AdminLayout from "@/Components/AdminLayout";
import { AdminRouteNames } from "@/Constants/AdminPageConstants";
import React, { useRef, useState } from "react";
import styles from './index.module.scss';
import { Table, Button, Tooltip, Row, Col, Container, Modal, Input, Text } from "@nextui-org/react";
import { AddCity, GetCityList, UpdateCity as UpdateProcess, DeleteCity as DeleteProcess } from "Data/Cities.Controller";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Iller = ({ cityList }) => {

    const router = useRouter();

    const [cities, setCities] = useState(cityList);
    const [visible, setVisible] = React.useState(false);
    const [updateVisible, setUpdateVisible] = React.useState(false);
    const [cityName, setCityName] = useState("");
    const [updatedCity, setUpdatedCity] = useState({ CityName: "", id: 0 });

    const handler = () => setVisible(true);
    const updateHandler = () => setUpdateVisible(true);

    const closeHandler = () => {
        setCityName("");
        setVisible(false);
    };
    const closeUpdateHandler = () => {
        setUpdatedCity({});
        setUpdateVisible(false);
    };

    const saveCity = async (e) => {
        e.preventDefault();

        if (!cityName) {
            alert("Şehir Adını Giriniz");
            return;
        }
        const responseResult = await AddCity(null, cityName);
        if (responseResult?.hasError) {
            responseResult?.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }
        setCities((items) => [...items, responseResult]);


        toast.success(`${responseResult.CityName} Eklendi`, { position: "top-right" });
        router.push(window.location.href);
        closeHandler();

    }


    const updateCity = async (e) => {
        e.preventDefault();

        if (!updatedCity.CityName) {
            alert("Şehir Adını Giriniz");
            return;
        }
        const responseResult = await UpdateProcess(null, updatedCity.id, updatedCity.CityName);
        if (responseResult?.hasError) {
            responseResult?.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }

        const arr = cityList;
        const item = arr[arr.findIndex(a => a.id == responseResult.id)];
        item.CityName = responseResult.CityName;
        setCities(arr);

        toast.warning(`${responseResult.CityName} Güncellendi`, { position: "top-right" });
        closeUpdateHandler();

    }

    const DeleteCity = async (e, cityId) => {
        e.preventDefault();
        const responseResult = await DeleteProcess(null, cityId);
        if (responseResult?.hasError) {
            responseResult?.errorList.forEach(err => {
                toast.error(err, { position: "top-right" });
            });
            return;
        }
        toast.error(`${responseResult.CityName} Silindi`, { position: "top-right" });
        setCities((items) => items.filter(a => a.id != responseResult.id));
    }


    return (
        <AdminLayout activePageName={AdminRouteNames.ILLER}>
            <Container>
                <Row justify="flex-end">
                    <Button color="success" onPress={handler}>Yeni İl Ekle</Button>
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
                    <Table.Column>İL ADI</Table.Column>
                    <Table.Column>İLÇELER</Table.Column>
                    <Table.Column>DETAY</Table.Column>
                    <Table.Column>SİL</Table.Column>
                </Table.Header>
                <Table.Body>
                    {cities.map((item, index) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.CityName}</Table.Cell>
                            <Table.Cell>
                                <Tooltip content="İlçeler">
                                    <Button onClick={() => router.push(`/Admin/Ilceler?id=${item.id}`)} color="secondary">İlçeler</Button>
                                </Tooltip>
                            </Table.Cell>
                            <Table.Cell>
                                <Tooltip content="Detay">
                                    <Button color="warning" onClick={(e) => {
                                        setUpdateVisible(true);
                                        setUpdatedCity(item);
                                    }}>Detay</Button>
                                </Tooltip>
                            </Table.Cell>
                            <Table.Cell>
                                <Tooltip content="Sil">
                                    <Button color="error" onClick={(e) => DeleteCity(e, item.id)}>Sil</Button>
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
                <form onSubmit={async (e) => await saveCity(e)}>
                    <Modal.Body>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            type="text"
                            color="primary"
                            label="Şehir Adı"
                            size="lg"
                            placeholder="Şehir Adını Giriniz"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
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
                aria-labelledby="modal-title"
                open={updateVisible}
                onClose={closeUpdateHandler}
            >
                <form onSubmit={async (e) => await updateCity(e)}>
                    <Modal.Body>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            type="text"
                            color="primary"
                            label="Şehir Adı"
                            size="lg"
                            placeholder="Şehir Adını Giriniz"
                            value={updatedCity.CityName}
                            onChange={(e) => setUpdatedCity({ ...updatedCity, CityName: e.target.value })}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onPress={closeUpdateHandler}>
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
export default Iller;

export const getServerSideProps = async () => {
    const cityList = await GetCityList(null);



    return {
        props: {
            cityList
        }
    }

}