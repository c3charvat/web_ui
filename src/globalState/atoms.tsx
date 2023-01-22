import {atom, atomFamily} from 'recoil';

export const serialConsoleListState = atom({
    key: 'serial-console-atom',
    default: [],
});

export const axisDataState = atom({
    key: 'axis-data-atom',
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
        aoabAccelerationSlider: 0,},
});

export const liveModeSwitchState = atom({
    key: 'live-mode-switch-atom',
    default: 'false',
});

export const sendButtonRenderState = atom({
    key: 'send-button-atom',
    default: 'false',
});
