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
                Dual Airfoil Control Ⓒ2022-2023 Collin Charvat and Wright State University.
            </Typography>
            <Typography align='center' fontSize={15}>
                Dual Airfoil Team: Jack, Kykle, Logan and Dr.Yang.
            </Typography>
            <Typography align='center' fontSize={15}>
            Acknowledgements: Daniel A. and Kyle R. for their endless support.
            </Typography>
        </React.Fragment>

    );

}
