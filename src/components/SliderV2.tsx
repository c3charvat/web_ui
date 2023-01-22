import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, CardContent, Slider, Theme, Typography } from '@mui/material';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Resizable } from "re-resizable";
import { useTheme } from '@mui/material/styles';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { axisDataState, liveModeSwitchState, sendButtonRenderState } from '../globalState/atoms';



function style(theme: Theme) {
    const styled1 = {
        backgroundColor: theme.palette.background.default,
        Display: "flex",
        FlexDirection: 'row',
        FlexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "flex-start",
        border: "solid 1px #ddd",
        margin: '5px',
        padding: '10px',
        //whiteSpace: 'pre'
    }
    return styled1;
};

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

function SendButtonRender() {
    const livemodeSwitchState = useRecoilValue(liveModeSwitchState);
    const setSendButtonState = useSetRecoilState(sendButtonRenderState);
    if (livemodeSwitchState == 'false') { // ie its not in trigger mode
        return (
            <Grid padding={1} height={40} justifyContent="center">
                <SendButton>
                    <Button fullWidth variant='contained' onClick={() => setSendButtonState('true')}>
                        Send Data
                    </Button>
                </SendButton>
            </Grid>
        )
    }
    else {
        return (<div></div>)
    }


}



export default function SliderGroupV2() {
    const theme = useTheme();
    const [socketUrl, setSocketUrl] = useState('ws://localhost:10000');

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, { share: true }); // share allows the websocket to be shared between components 
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

    const [sliderState, setSliderState] = useRecoilState(axisDataState);
    const livemodeSwitchState = useRecoilValue(liveModeSwitchState);
    const [sendButtonState, setSendButtonState] = useRecoilState(sendButtonRenderState);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        if (livemodeSwitchState == 'true') {
            sendJsonMessage({
                type: "SliderMessage",
                sliderValues: sliderState,
            });
        }
        else {
            if(sendButtonState== 'true'){
            sendJsonMessage({
                type: "SliderMessage",
                sliderValues: sliderState,
            });
            setSendButtonState('false') // this will cause this to get sent twice since we are updating the state in here but since we sent false the second time it doesnt matter
            }
        }
        // console.log({
        // 	type: "SliderMessage",
        //     sliderValues: sliderState,
        //     //sendDataButton: *data* ,
        // })
    }, [sliderState, sendButtonState] // only run when one of these is updated
    );



    const sliderProps = (slider: keyof SliderState) => {
        return {
            onChange: (event: Event, value: number | Array<number>, activeThumb: number) => setSliderState(current => ({
                ...current,
                [slider]: value
            })),
            value: sliderState[slider]
        };
    }

    const [width, setWidth] = React.useState((window.innerWidth - 90) / 2);
    const [height, setHeight] = React.useState(200);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item>
                    <Typography sx={{ whiteSpace: 'pre' }}>              Stagger Axis </Typography>
                    <Resizable
                        bounds={"window"}
                        maxHeight={'250px'}
                        maxWidth={(window.innerWidth - 90) / 2}
                        minHeight={'175px'}
                        minWidth={'200px'}
                        style={style(theme)}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Position (mm)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px', marginBottom: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("staggerPositionSlider")}>
                        </Slider>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Velocity (mm/s)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("staggerVelocitySlider")}>
                        </Slider>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Acceleration (mm/s^2)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("staggerAccelerationSlider")}>
                        </Slider>
                    </Resizable>
                </Grid>
                <Grid item>
                    <Typography sx={{ whiteSpace: 'pre' }}>              Gap Axis </Typography>
                    <Resizable
                        bounds={"window"}
                        maxHeight={'250px'}
                        maxWidth={(window.innerWidth - 90) / 2}
                        minHeight={'175px'}
                        minWidth={'200px'}
                        style={style(theme)}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Position (m/s)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px', marginBottom: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("gapPositionSlider")}>
                        </Slider>
                        Velocity
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("gapVelocitySlider")}>
                        </Slider>

                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Acceleration (mm/s^2)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("gapAccelerationSlider")}>
                        </Slider>
                    </Resizable>
                </Grid>

                <Grid item>
                    <Typography sx={{ whiteSpace: 'pre' }}>              A.O.A Top </Typography>
                    <Resizable
                        bounds={"window"}
                        maxHeight={'250px'}
                        maxWidth={(window.innerWidth - 90) / 2}
                        minHeight={'175px'}
                        minWidth={'200px'}
                        style={style(theme)}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Position (m/s)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px', marginBottom: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("aoatPositionSlider")}>
                        </Slider>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Velocity (mm/s)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("aoatVelocitySlider")}>
                        </Slider>

                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Acceleration (mm/s^2)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("aoatAccelerationSlider")}>
                        </Slider>
                    </Resizable>
                </Grid>

                <Grid item>
                    <Typography sx={{ whiteSpace: 'pre' }}>              A.O.A Bottom</Typography>
                    <Resizable
                        bounds={"window"}
                        maxHeight={'250px'}
                        maxWidth={(window.innerWidth - 90) / 2}
                        minHeight={'175px'}
                        minWidth={'200px'}
                        style={style(theme)}
                        size={{ width, height }}
                        onResizeStop={(e, direction, ref, d) => {
                            setWidth(width + d.width);
                            setHeight(height + d.height);
                        }}>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Position (m/s)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px', marginBottom: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("aoabPositionSlider")}>
                        </Slider>
                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Velocity (mm/s)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("aoabVelocitySlider")}>
                        </Slider>

                        <Typography sx={{ fontSize: 14 }} align='left'>
                            Acceleration (mm/s^2)
                        </Typography>
                        <Slider
                            sx={{ marginLeft: '5px', marginRight: '5px', marginTop: '-10px' }}
                            track={false}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            {...sliderProps("aoabAccelerationSlider")}>
                        </Slider>
                    </Resizable>
                </Grid>
            </Grid>
            <SendButtonRender></SendButtonRender>
        </React.Fragment>

    );

}