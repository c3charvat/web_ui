import * as React from 'react';
import { Typography } from '@mui/material';
import SliderGroup from './SliderUI';
import SliderGroupV2 from './SliderV2';
import TableGroup from './TableUI';
import ConsoleGroup from './ConsoleUI';
var logo = require('../img/green_logo.png');

export default function MainContent() {
    return (
        <React.Fragment>
            <Typography paragraph>
                <SliderGroupV2></SliderGroupV2>
            </Typography>
            <Typography paragraph>
                <TableGroup></TableGroup>
            </Typography>
            <Typography paragraph>
                <ConsoleGroup></ConsoleGroup>
            </Typography>
            <Typography align='center' fontSize={15}>
                Dual Airfoil Control Ⓒ2022-2023 Collin Charvat and Wright State University.
            </Typography>
            <Typography align='center' fontSize={15}>
                Dual Airfoil Team: Jack, Kykle, Logan and Dr.Yang.
            </Typography>
            <Typography align='center' fontSize={15}>
            Acknowledgements: Daniel A. and Kyle R. for their endless support.
            </Typography>
            <center>
            <img src={logo} height={'25px'}></img>
            </center>
        </React.Fragment>

    );

}
