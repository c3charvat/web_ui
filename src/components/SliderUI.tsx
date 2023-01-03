import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Button, CardContent, Slider, Typography } from '@mui/material';
import useWebSocket, { ReadyState } from 'react-use-websocket';

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
    const [socketUrl, setSocketUrl] = useState('wss://192.168.1.2');
    
    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

      useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			sendJsonMessage({
				type: "SliderMessage",
                sliderValues: sliderState,
                //sendDataButton: *data* ,
			});
            console.log(sendJsonMessage({
				type: "SliderMessage",
                sliderValues: sliderState,
                //sendDataButton: *data* ,
			}))
		}
	}, [readyState]);

    type SliderState = {
        staggerPositionSlider: number;
        gapPositionSlider: number;
        aoatPositionSlider: number;
        aoabPositionSlider: number;
        staggerVelocitySlider: number;
        gapVelocitySlider: number;
        aoatVelocitySlider: number;
        aoabVelocitySlider: number;
        staggerAccelerationSlider: number;
        gapAccelerationSlider: number;
        aoatAccelerationSlider: number;
        aoabAccelerationSlider: number;
      };
      
      const [sliderState, setSliderState] = useState({
        staggerPositionSlider: 0,
        gapPositionSlider: 0,
        aoatPositionSlider: 0,
        aoabPositionSlider: 0,
        staggerVelocitySlider: 0,
        gapVelocitySlider: 0,
        aoatVelocitySlider: 0,
        aoabVelocitySlider: 0,
        staggerAccelerationSlider: 0,
        gapAccelerationSlider: 0,
        aoatAccelerationSlider: 0,
        aoabAccelerationSlider: 0,
      });
      
      const sliderProps = (slider: keyof SliderState) => {
        return {
          onChange: (e:any) => setSliderState(current => ({
            ...current,
            [slider]: e.target.value
          })),
          value: sliderState[slider]
        };
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
                                        {...sliderProps("staggerPositionSlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Velocity (mm/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("staggerVelocitySlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Acceleration (mm/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("staggerAccelerationSlider")}
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
                                        {...sliderProps("gapPositionSlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Velocity (mm/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("gapVelocitySlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Acceleration (mm/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("gapAccelerationSlider")}
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
                                        {...sliderProps("aoatPositionSlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Velocity (Degrees/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("aoatVelocitySlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Acceleration (Degrees/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("aoatAccelerationSlider")}
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
                                        {...sliderProps("aoabPositionSlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Velocity (Degrees/s)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("aoabVelocitySlider")}
                                    >
                                    </Slider>
                                    <Typography sx={{ fontSize: 14 }} align='left'>
                                        Angular Acceleration (Degrees/s^2)
                                    </Typography>
                                    <Slider
                                        track={false}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        {...sliderProps("aoabAccelerationSlider")}
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