import { selectorFamily, selector } from "recoil";
import { serialConsoleList } from "./atoms";
import { send } from "websocket";


// ~~~~~~~~~~~~~~~~~ commented Atoms for easy refrence 
// In this file will be the state selectors that sene updates via websockets
// export const serialConsoleList = atom({
//     key: 'serial-console-atom',
//     default: [],
// });
// 
