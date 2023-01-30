import React, { FC, useMemo, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { scenarioState, selectedSenarioState} from '../globalState/atoms';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
  MRT_TableInstance,
} from 'material-react-table';

export type Person = {
  id: number;
  xposition: number;
  yposition: number;
  aoatposition: number;
  aoabposition: number;
  xvelocity: number;
  yvelocity: number;
  aoatvelocity:number;
  aoabvelocity: number;
  xacceleration: number;
  yacceleration: number;
  aoatacceleration: number;
  aoabacceleration: number;
  };

  

export default function TableUIV2(){
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      //column definitions...
      {
        accessorKey: 'id',
        header: 'id',
        enableEditing: false,
        enableHiding: false,
        size:20,
        
      },
      {
        accessorKey: 'xposition',
        header: 'Gap Pos.',
        enableHiding: false,
      },
      {
        accessorKey: 'yposition',
        header: 'Stagger Pos.',
        enableHiding: false,
      },

      {
        accessorKey: 'aoatposition',
        header: 'AoA T Pos.',
        enableHiding: false,
      },
      {
        accessorKey: 'aoabposition',
        header: 'AoA B Pos',
        enableHiding: false,
      },
      {
        accessorKey: 'xvelocity',
        header: 'Gap Vel.',
        enableHiding: false,
      },
      {
        accessorKey: 'yvelocity',
        header: 'Stagger Vel.',
        enableHiding: false,
      },

      {
        accessorKey: 'aoatvelocity',
        header: 'AoA T Vel.',
        enableHiding: false,
      },
      {
        accessorKey: 'aoabvelocity',
        header: 'AoA B Vel',
        enableHiding: false,
      },
      {
        accessorKey: 'xacceleration',
        header: 'Gap Accel.',
        enableHiding: false,
      },
      {
        accessorKey: 'yacceleration',
        header: 'Stagger Accel.',
        enableHiding: false,
      },

      {
        accessorKey: 'aoatacceleration',
        header: 'AoA T Accel.',
        enableHiding: false,
      },
      {
        accessorKey: 'aoabacceleration',
        header: 'AoA B Accel.',
        enableHiding: false,
      },//end
    ],
    [],
  );

  const [tableData, setTableData] = useRecoilState(scenarioState);
  //const [rowSelection, setRowSelection] = useRecoilState(selectedSenarioState)
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef<MRT_TableInstance<Person>>(null);


  const someEventHandler = () => {
    const rowSelection = tableInstanceRef?.current?.getState().rowSelection
    console.log(rowSelection)
    // YOU NEED TO USE LOADASH HERE I GUESS....
  };
  
  

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({ exitEditingMode, row, values }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      //console.log(row)
      //console.log(values.address)
      setTableData(
        current =>{
          //console.log(...current.data)
          return{
          ...current.scenarios,
          scenarios: current.scenarios.map(item => {
            console.log(row.index)
            if(item.id.toString() !== row.index.toString()){
              //console.log(item)
              return item
            }
            console.log(item)
            console.log(values)
            return values
          })
        }
      });
      exitEditingMode(); //required to exit editing mode
    };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData.scenarios}
      editingMode="row"
      enableEditing
      initialState={{ density: 'compact' }}
      onEditingRowSave={handleSaveRow}
      enableRowSelection
      onRowSelectionChange={someEventHandler}
      tableInstanceRef={tableInstanceRef}
      enableSelectAll={false}
      enableMultiRowSelection={false} //shows radio buttons instead of checkboxes
    />
  );
};