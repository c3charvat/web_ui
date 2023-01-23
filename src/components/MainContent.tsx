import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { Typography } from '@mui/material';
import SliderGroupV2 from './SliderV2';
import TableGroup from './TableUI';
import ConsoleGroup from './ConsoleUI';
import { sliderUIRenderState,tableUIRenderState,consoleUIRenderState } from '../globalState/atoms';
var logo = require('../img/green_logo.png');

function SliderUIRenderStateRender() {
    const sliderUIRender = useRecoilValue(sliderUIRenderState);
    if (sliderUIRender === 'true') { // ie its not in trigger mode
        return (
            <Typography paragraph>
                <SliderGroupV2></SliderGroupV2>
            </Typography>
        )
    }
    else {
        return (<div></div>)
    }
}

function TableUIRenderStateRender() {
    const tableUIRender = useRecoilValue(tableUIRenderState);
    if (tableUIRender === 'true') { // ie its not in trigger mode
        return (
            <Typography paragraph>
                <TableGroup></TableGroup>
            </Typography>
        )
    }
    else {
        return (<div></div>)
    }
}
function ConsoleUIRenderStateRender() {
    const consoleUIRender = useRecoilValue(consoleUIRenderState);
    if (consoleUIRender === 'true') { // ie its not in trigger mode
        return (
            <Typography paragraph>
                <ConsoleGroup></ConsoleGroup>
            </Typography>
        )
    }
    else {
        return (<div></div>)
    }
}

export default function MainContent() {
    return (
        <React.Fragment>
            <SliderUIRenderStateRender></SliderUIRenderStateRender>
            <TableUIRenderStateRender></TableUIRenderStateRender>
            <ConsoleUIRenderStateRender></ConsoleUIRenderStateRender>
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
