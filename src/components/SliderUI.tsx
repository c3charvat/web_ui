import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, CardContent, Slider, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    borderstyle: 'solid',
    borderwidth: '5px',
    color: theme.palette.text.secondary,
}));
const SendButton = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    borderstyle: 'solid',
    borderwidth: '5px',
    color: theme.palette.text.secondary,
    alignContent: 'end'
}));

function valuetext(value: number) {
    return `${value}`;
}

export default function SliderGroup() {
    const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
    const [xSliderValue, setXSliderValue] = useState<number>(0);
   

    const xSliderChange=(
    event: Event,
    value: number | number[],
    ) => {
        setXSliderValue(value as number)
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Adjustment Sliders </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Item>
                                <Typography sx={{ fontSize: 18 }} align='left' padding={'5px'}>
                                    Stagger Axis
                                </Typography>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Position (mm)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        onChange={xSliderChange}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Velocity (mm/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Acceleration (mm/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                </CardContent>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Item>
                                <Typography sx={{ fontSize: 18 }} align='left' padding={'5px'}>
                                    Gap Axis
                                </Typography>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Position (mm)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Velocity (mm/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Acceleration (mm/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                </CardContent>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Item>
                                <Typography sx={{ fontSize: 18 }} padding={'5px'} align='left'>
                                    Angle of Attack (TOP)
                                </Typography>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angle (Degrees)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Velocity (Degrees/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Acceleration (Degrees/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                </CardContent>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Item>
                                <Typography sx={{ fontSize: 18 }} padding={'5px'} align='left'>
                                    Angle of Attack (BOTTOM)
                                </Typography>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angle (Degrees)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Velocity (Degrees/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Acceleration (Degrees/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                    >
                                    </Slider>
                                </CardContent>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid padding={1} height={40} justifyContent="center">
                        <SendButton>
                            <Button fullWidth variant='contained'>
                                Send Data
                            </Button>
                        </SendButton>
                    </Grid>
                </Box>
            </AccordionDetails>
        </Accordion>
    );

}