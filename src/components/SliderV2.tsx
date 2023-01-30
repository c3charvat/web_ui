import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, CardContent, Slider, Theme, Typography } from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Resizable } from "re-resizable";
import { useTheme } from "@mui/material/styles";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  axisDataState,
  selectedSenarioState,
  liveModeSwitchState,
  scenarioState,
  sendButtonRenderState,
} from "../globalState/atoms";

function style(theme: Theme) {
  const styled1 = {
    backgroundColor: theme.palette.background.default,
    Display: "flex",
    FlexDirection: "row",
    FlexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
    border: "solid 1px #ddd",
    margin: "5px",
    paddingRight: "20px",
    paddingLeft: "10px",
    //whiteSpace: 'pre'
  };
  return styled1;
}

const SendButton = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  borderstyle: "solid",
  borderwidth: "5px",
  color: theme.palette.text.secondary,
  alignContent: "end",
}));

function valuetext(value: number) {
  return `${value}`;
}

function SendButtonRender() {
  const livemodeSwitchState = useRecoilValue(liveModeSwitchState);
  const setSendButtonState = useSetRecoilState(sendButtonRenderState);
  if (livemodeSwitchState === "false") {
    // ie its not in trigger mode
    return (
      <Grid padding={1} height={40} justifyContent="center">
        <SendButton>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setSendButtonState("true")}
          >
            Send Data
          </Button>
        </SendButton>
      </Grid>
    );
  } else {
    return <div></div>;
  }
}

export default function SliderGroupV2() {
  const theme = useTheme();
  const [socketUrl, setSocketUrl] = useState("ws://localhost:10000");
  const [{scenarios}, setScenarioState] = useRecoilState(scenarioState);
  const selectedSenario = useRecoilValue(selectedSenarioState)
  const scenario = useMemo(() => {
    return scenarios.find((s) => s.id === selectedSenario )!;
  }, [scenarios]);
  //console.log("hello")
  //console.log(scenario);
  const setScenarioData = useCallback((data: Partial<typeof scenario>) => {
    setScenarioState((current) => ({
      ...current,
      scenarios: current.scenarios.map((s) => {
        if (s.id === selectedSenario) {
          return {
            ...s,
            ...data,
          };
        }
        return s;
      }),
    }));
  }, []);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    share: true,
  }); // share allows the websocket to be shared between components
  type SliderState = typeof scenario;

  const livemodeSwitchState = useRecoilValue(liveModeSwitchState);
  const [sendButtonState, setSendButtonState] = useRecoilState(
    sendButtonRenderState
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(
    () => {
      if (livemodeSwitchState === "true") {
        sendJsonMessage({
          type: "SliderMessage",
          sliderValues: scenario,
        });
      } else {
        if (sendButtonState === "true") {
          sendJsonMessage({
            type: "SliderMessage",
            sliderValues: scenario,
          });
          setSendButtonState("false"); // this will cause this to get sent twice since we are updating the state in here but since we sent false the second time it doesnt matter
        }
      }
      // console.log({
      // 	type: "SliderMessage",
      //     sliderValues: sliderState,
      //     //sendDataButton: *data* ,
      // })
    },
    [scenario, sendButtonState] // only run when one of these is updated
  );

  const sliderProps = (slider: keyof SliderState) => {
    return {
      onChange: (
        event: Event,
        value: number | Array<number>,
        activeThumb: number
      ) =>
        setScenarioData({
          [slider]: value,
        }),
      value: Number(scenario[slider]),
    };
  };

  const [width, setWidth] = React.useState((window.innerWidth-90) / 2);
  const [height, setHeight] = React.useState(200);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item>
          <Resizable
            bounds={"window"}
            maxHeight={"220px"}
            maxWidth={(window.innerWidth) / 2}
            minHeight={"200px"}
            minWidth={"200px"}
            style={style(theme)}
            size={{ width, height }}
            onResizeStop={(e, direction, ref, d) => {
              setWidth(width + d.width);
              setHeight(height + d.height);
            }}
          >
            <Box sx={{ whiteSpace: "pre" , textAlign: 'right', marginRight: '40px', marginTop:'5px'}}> Stagger Axis </Box>
            <Typography sx={{ fontSize: 14 }} align="left">
              Position (mm)
            </Typography>
            <Slider
              sx={{
                marginLeft: "5px",
                marginRight: "5px",
                marginTop: "-10px",
                marginBottom: "-10px",
              }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("xposition")}
            ></Slider>
            <Typography sx={{ fontSize: 14 }} align="left">
              Velocity (mm/s)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("xvelocity")}
            ></Slider>
            <Typography sx={{ fontSize: 14 }} align="left">
              Acceleration (mm/s^2)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("xacceleration")}
            ></Slider>
          </Resizable>
        </Grid>
        <Grid item>
          <Resizable
            bounds={"window"}
            maxHeight={"220px"}
            maxWidth={(window.innerWidth) / 2}
            minHeight={"200px"}
            minWidth={"200px"}
            style={style(theme)}
            size={{ width, height }}
            onResizeStop={(e, direction, ref, d) => {
              setWidth(width + d.width);
              setHeight(height + d.height);
            }}
          >
            <Box sx={{ whiteSpace: "pre" , textAlign: 'right', marginRight: '40px', marginTop:'5px'}}> Gap Axis </Box>
            <Typography sx={{ fontSize: 14 }} align="left">
              Position (mm)
            </Typography>
            <Slider
              sx={{
                marginLeft: "5px",
                marginRight: "5px",
                marginTop: "-10px",
                marginBottom: "-10px",
              }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("yposition")}
            ></Slider>
            Velocity
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("yvelocity")}
            ></Slider>
            <Typography sx={{ fontSize: 14 }} align="left">
              Acceleration (mm/s^2)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("yacceleration")}
            ></Slider>
          </Resizable>
        </Grid>

        <Grid item>
          <Resizable
            bounds={"window"}
            maxHeight={"220px"}
            maxWidth={(window.innerWidth) / 2}
            minHeight={"200px"}
            minWidth={"200px"}
            style={style(theme)}
            size={{ width, height }}
            onResizeStop={(e, direction, ref, d) => {
              setWidth(width + d.width);
              setHeight(height + d.height);
            }}
          >
            <Box sx={{ whiteSpace: "pre" , textAlign: 'right', marginRight: '40px', marginTop:'5px'}}> A.O.A. Top</Box>
            <Typography sx={{ fontSize: 14 }} align="left">
              Position (m/s)
            </Typography>
            <Slider
              sx={{
                marginLeft: "5px",
                marginRight: "5px",
                marginTop: "-10px",
                marginBottom: "-10px",
              }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("aoatposition")}
            ></Slider>
            <Typography sx={{ fontSize: 14 }} align="left">
              Velocity (mm/s)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("aoatvelocity")}
            ></Slider>

            <Typography sx={{ fontSize: 14 }} align="left">
              Acceleration (mm/s^2)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("aoatacceleration")}
            ></Slider>
          </Resizable>
        </Grid>

        <Grid item>
          <Resizable
            bounds={"window"}
            maxHeight={"220px"}
            maxWidth={(window.innerWidth) / 2}
            minHeight={"200px"}
            minWidth={"200px"}
            style={style(theme)}
            size={{ width, height }}
            onResizeStop={(e, direction, ref, d) => {
              setWidth(width + d.width);
              setHeight(height + d.height);
            }}
          >
            <Box sx={{ whiteSpace: "pre" , textAlign: 'right', marginRight: '40px', marginTop:'5px'}}> A.O.A. Bottom </Box>
            <Typography sx={{ fontSize: 14 }} align="left">
              Position (m/s)
            </Typography>
            <Slider
              sx={{
                marginLeft: "5px",
                marginRight: "5px",
                marginTop: "-10px",
                marginBottom: "-10px",
              }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("aoabposition")}
            ></Slider>
            <Typography sx={{ fontSize: 14 }} align="left">
              Velocity (mm/s)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("aoabvelocity")}
            ></Slider>

            <Typography sx={{ fontSize: 14 }} align="left">
              Acceleration (mm/s^2)
            </Typography>
            <Slider
              sx={{ marginLeft: "5px", marginRight: "5px", marginTop: "-10px" }}
              track={false}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              {...sliderProps("aoabacceleration")}
            ></Slider>
          </Resizable>
        </Grid>
      </Grid>
      <SendButtonRender></SendButtonRender>
    </React.Fragment>
  );
}
