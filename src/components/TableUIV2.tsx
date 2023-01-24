import React, { FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { tableStateV2 } from '../globalState/atoms';
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';

export type Person = {
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
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },

      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },

      {
        accessorKey: 'state',
        header: 'State',
      }, //end
    ],
    [],
  );

  const [tableData, setTableData] = useRecoilState(tableStateV2);

  const handleSaveRow: MaterialReactTableProps<Person>['onEditingRowSave'] =
    async ({ exitEditingMode, row, values }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      //tableData.data[row.index] = values;
      console.log(tableData.data[row.index])
      console.log(tableData.data)
      console.log(values)
      setTableData();//  Help me tight here please
      console.log(tableData.data[row.index])
      console.log(tableData.data)
      //console.log(tableData)
      exitEditingMode(); //required to exit editing mode
    };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData.data}
      editingMode="row"
      enableEditing
      onEditingRowSave={handleSaveRow}
    />
  );
};