import { atom, atomFamily } from "recoil";
import { GridValidRowModel } from "@mui/x-data-grid";

export const serialConsoleListState = atom({
  key: "serial-console-atom",
  default: [],
});

export const selectedTableRowsState = atom({
  key: "serial-console-atom2",
  default: [],
});

export const axisDataState = atom({
  key: "axis-data-atom",
  default: {
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
  },
});

export const liveModeSwitchState = atom({
  key: "live-mode-switch-atom",
  default: "false",
});

export const sendButtonRenderState = atom({
  key: "send-button-atom",
  default: "false",
});

export const sliderUIRenderState = atom({
  key: "slider-ui-switch-atom",
  default: "true",
});

export const tableUIRenderState = atom({
  key: "table-ui-switch-atom",
  default: "true",
});

export const consoleUIRenderState = atom({
  key: "console-ui-switch-atom",
  default: "false",
});

export const selectedSenarioState = atom({
  key: "console-ui-switch-atom",
  default: 1,
});

export const scenarioState = atom({
  key: "scenarios",
  default: {
    scenarios: [
      {
        id: 1,
        xposition: 25,
        yposition: 25,
        aoatposition: 5,
        aoabposition: 5,
        xvelocity: 100,
        yvelocity: 100,
        aoatvelocity: 100,
        aoabvelocity: 100,
        xacceleration: 10,
        yacceleration: 10,
        aoatacceleration: 10,
        aoabacceleration: 10,
      },
      {
        id: 2,
        xposition: 25,
        yposition: 25,
        aoatposition: 5,
        aoabposition: 5,
        xvelocity: 100,
        yvelocity: 100,
        aoatvelocity: 100,
        aoabvelocity: 100,
        xacceleration: 10,
        yacceleration: 10,
        aoatacceleration: 10,
        aoabacceleration: 10,
      },
      {
        id: 3,
        name: "Scenario 3",
        xposition: 25,
        yposition: 25,
        aoatposition: 5,
        aoabposition: 5,
        xvelocity: 100,
        yvelocity: 100,
        aoatvelocity: 100,
        aoabvelocity: 100,
        xacceleration: 10,
        yacceleration: 10,
        aoatacceleration: 10,
        aoabacceleration: 10,
      },
      {
        id: 4,
        xposition: 25,
        yposition: 25,
        aoatposition: 5,
        aoabposition: 5,
        xvelocity: 100,
        yvelocity: 100,
        aoatvelocity: 100,
        aoabvelocity: 100,
        xacceleration: 10,
        yacceleration: 10,
        aoatacceleration: 10,
        aoabacceleration: 10,
      },
      {
        id: 5,
        xposition: 25,
        yposition: 25,
        aoatposition: 5,
        aoabposition: 5,
        xvelocity: 100,
        yvelocity: 100,
        aoatvelocity: 100,
        aoabvelocity: 100,
        xacceleration: 10,
        yacceleration: 10,
        aoatacceleration: 10,
        aoabacceleration: 10,
      },
    ],
  },
});