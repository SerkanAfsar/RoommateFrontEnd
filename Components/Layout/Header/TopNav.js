import React from "react";
import styles from './TopNav.module.scss';
import { Navbar, Text, Button } from "@nextui-org/react";

const TopNav = () => {
    return (
        <Navbar isBordered variant={"sticky"}>
            <Navbar.Brand>
                <Text b color="inherit" hideIn="xs">
                    Ev Arkadaşı İlanları
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="#">Son İlanlar</Navbar.Link>
                <Navbar.Link isActive href="#">İstanbul</Navbar.Link>
                <Navbar.Link href="#">Ankara</Navbar.Link>
                <Navbar.Link href="#">İzmir</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    Giriş
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat href="#">
                        Kayıt Ol!
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
}
export default TopNav;