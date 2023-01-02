import * as React from 'react';
import { Typography } from '@mui/material';
import SliderGroup from './SliderUI';
import TableGroup from './TableUI';
import ConsoleGroup from './ConsoleUI';



export default function MainContent() {
    return (
        <React.Fragment>
            <Typography paragraph>
                <SliderGroup></SliderGroup>
            </Typography>
            <Typography paragraph>
                <TableGroup></TableGroup>
            </Typography>
            <Typography paragraph>
                <ConsoleGroup></ConsoleGroup>
            </Typography>
            <Typography align='center' fontSize={15}>
                Dual AirFoil Control Ⓒ2023 Collin Charvat
            </Typography>
            <Typography align='center' fontSize={15}>
                Dual Airfoil Team: Jack, Kykle, and Logan
            </Typography>
            <Typography align='center' fontSize={15}>
            Acknowledgements: Daniel A. and Kyle R.
            </Typography>
            <Typography align='center' fontSize={15}>
                For their endless support 
            </Typography>
        </React.Fragment>

    );

}
