import {atom, atomFamily} from 'recoil';

export const serialConsoleList = atom({
    key: 'serial-console-atom',
    default: [],
});
