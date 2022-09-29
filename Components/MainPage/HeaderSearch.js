import React from "react";
import { Grid } from '@nextui-org/react';
import styles from './HeaderSearch.module.scss';

const HeaderSearch = () => {
    return (
        <Grid.Container gap={2} justify="center">
            <Grid xs={4}>
                Deneme 1
            </Grid>
            <Grid xs={4}>
                Deneme 2
            </Grid>
            <Grid xs={4}>
                Deneme 3
            </Grid>
        </Grid.Container>
    )


}
export default HeaderSearch;