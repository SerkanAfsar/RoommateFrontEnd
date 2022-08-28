import React from "react";
import styles from './index.module.scss';
import { Card, Grid, Text } from "@nextui-org/react";

const Statistics = ({ counterName, count }) => {
    return (
        <Card>
            <Card.Header>
                <Text b className={styles.center}>{counterName}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
                <Text className={styles.center}>
                    {count}
                </Text>
            </Card.Body>
            <Card.Divider />

        </Card >

    )
}
export default Statistics;