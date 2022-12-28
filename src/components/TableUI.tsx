import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridRowModel,
  GridColumns,
  GridRowId,
  GridRowsProp,
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert, { AlertProps } from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardActions, CardContent, Slider, Typography } from '@mui/material';

interface Vector {
  x: number;
  y: number;
  aoat: number;
  aoab: number;
}

interface Data {
  id: GridRowId;
  name: string;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
}

const useFakeMutation = () => {
  return React.useCallback(
    (user: Partial<Data>) =>
      new Promise<Partial<Data>>((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200),
      ),
    [],
  );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
  if (newRow.name !== oldRow.name) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.xposition !== oldRow.xposition) {
    return `Age from '${oldRow.xposition || ''} ' to '${newRow.xposition || ''} '`;
  }
  if (newRow.yposition !== oldRow.yposition) {
    return `Age from '${oldRow.yposition || ''} ' to '${newRow.yposition || ''} '`;
  }
  if (newRow.aoatposition !== oldRow.aoatposition) {
    return `Age from '${oldRow.aoatposition || ''} ' to '${newRow.aoatposition || ''} '`;
  }
  if (newRow.aoabposition !== oldRow.aoabposition) {
    return `Age from '${oldRow.aoabposition || ''} ' to '${newRow.aoabposition || ''} '`;
  }
  if (newRow.xvelocity !== oldRow.xvelocity) {
    return `Age from '${oldRow.xvelocity || ''} ' to '${newRow.xvelocity || ''} '`;
  }
  if (newRow.yvelocity !== oldRow.yvelocity) {
    return `Age from '${oldRow.yvelocity || ''} ' to '${newRow.yvelocity || ''} '`;
  }
  if (newRow.aoatvelocity !== oldRow.aoatvelocity) {
    return `Age from '${oldRow.aoatvelocity || ''} ' to '${newRow.aoatvelocity || ''} '`;
  }
  if (newRow.aoabvelocity !== oldRow.aoabvelocity) {
    return `Age from '${oldRow.aoabvelocity || ''} ' to '${newRow.aoabvelocity || ''} '`;
  }
  if (newRow.xacceleration !== oldRow.xacceleration) {
    return `Age from '${oldRow.xacceleration || ''} ' to '${newRow.xacceleration || ''} '`;
  }
  if (newRow.yacceleration !== oldRow.yacceleration) {
    return `Age from '${oldRow.yacceleration || ''} ' to '${newRow.yacceleration || ''} '`;
  }
  if (newRow.aoatacceleration !== oldRow.aoatacceleration) {
    return `Age from '${oldRow.aoatacceleration || ''} ' to '${newRow.aoatacceleration || ''} '`;
  }
  if (newRow.aoabacceleration !== oldRow.aoabacceleration) {
    return `Age from '${oldRow.aoabacceleration || ''} ' to '${newRow.aoabacceleration || ''} '`;
  }


  return null;

}



export default function TableGroup() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>Table Functions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ height: 400, width: '100%' }}>
          {renderConfirmDialog()}
          <DataGrid
            rows={rows}
            columns={columns}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
          />
          {!!snackbar && (
            <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </div>

      </AccordionDetails>
    </Accordion>
  );

}

const columns: GridColumns = [
  { field: 'id', headerName: '#', editable: false },
  { field: 'name', headerName: 'Name', editable: true },
  { field: 'xposition', headerName: 'Stagger Position', editable: true,valueGetter: (rows) => rows.row.position.x },
  { field: 'yposition', headerName: 'Gap Position', editable: true, valueGetter: (rows) => rows.row.position.y },
  { field: 'aoatposition', headerName: 'AOA Top Position', editable: true, valueGetter: (rows) => rows.row.position.aoat },
  { field: 'aoabposition', headerName: 'AOA Bottom Position', editable: true, valueGetter: (rows) => rows.row.position.aoab },
  { field: 'xvelocity', headerName: 'Stagger Velocity', editable: true, valueGetter: (rows) => rows.row.velocity.x },
  { field: 'yvelocity', headerName: 'Gap Velocity', editable: true, valueGetter: (rows) => rows.row.velocity.y },
  { field: 'aoatvelocity', headerName: 'AOA Top Velocity', editable: true, valueGetter: (rows) => rows.row.velocity.aoat },
  { field: 'aoabvelocity', headerName: 'AOA Bottom Velocity', editable: true, valueGetter: (rows) => rows.row.velocity.aoab },
  { field: 'xacceleration', headerName: 'Stagger Acceleration', editable: true, valueGetter: (rows) => rows.row.acceleration.x },
  { field: 'yacceleration', headerName: 'Gap Acceleration', editable: true, valueGetter: (rows) => rows.row.acceleration.y },
  { field: 'aoatacceleration', headerName: 'AOA Top Acceleration', editable: true, valueGetter: (rows) => rows.row.acceleration.aoat },
  { field: 'aoabacceleration', headerName: 'AOA Bottom Acceleration', editable: true, valueGetter: (rows) => rows.row.acceleration.aoab },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: "Scenario 1",
    position: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    velocity: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    acceleration: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
  },
  {
    id: 2,
    name: "Scenario 1",
    position: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    velocity: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    acceleration: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
  }, {
    id: 3,
    name: `Scenario 1`,
    position: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    velocity: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    acceleration: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
  }, {
    id: 4,
    name: "Scenario 1",
    position: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    velocity: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    acceleration: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
  }, {
    id: 5,
    name: "Scenario 1",
    position: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    velocity: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
    acceleration: {
      x: 1,
      y: 1,
      aoat: 1,
      aoab: 1,
    },
  },
];