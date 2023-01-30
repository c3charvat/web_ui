import { selectorFamily, selector } from "recoil";
import { serialConsoleListState } from "./atoms";


// ~~~~~~~~~~~~~~~~~ commented Atoms for easy refrence 
// In this file will be the state selectors that sene updates via websockets
// export const serialConsoleList = atom({
//     key: 'serial-console-atom',
//     default: [],
// });
// 


// const senarioSelector = selector({
//     key: 'scenario',
//     get: ({get})=>{
//       const selectedSenario=get(selectedSenarioState)
//       const senarioData=get(scenarioState)
//       return{
//         ...senarioData,
//         scenarios: senarioData.scenarios.map(item => {
//           if(selectedSenario.toString() == item.id.toString() ){
//             return item
//           }
//         })
//       }
//     },
// })