import React, { FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { tableStateV2 } from '../globalState/atoms';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';

export type Person = {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
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
        accessorKey: 'firstName',
        header: 'First Name',
        enableHiding: false,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableHiding: false,
      },

      {
        accessorKey: 'address',
        header: 'Address',
        enableHiding: false,
      },
      {
        accessorKey: 'city',
        header: 'City',
        enableHiding: false,
      },

      {
        accessorKey: 'state',
        header: 'State',
        enableHiding: false,
      }, //end
    ],
    [],
  );

  const [tableData, setTableData] = useRecoilState(tableStateV2);




  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] = ({ exitEditingMode, row, values }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      //console.log(row)
      //console.log(values.address)
      setTableData(
        current =>{
          //console.log(...current.data)
          return{
          ...current.data,
          data: current.data.map(item => {
            console.log(row.index)
            if(item.id !== row.index.toString()){
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
      data={tableData.data}
      editingMode="row"
      enableEditing
      initialState={{ density: 'compact' }}
      onEditingRowSave={handleSaveRow}
    />
  );
};