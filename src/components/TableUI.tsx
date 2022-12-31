import * as React from 'react';
import {
  DataGrid,
  GridRowModel,
  GridColumns,
  GridRowId,
  GridRowsProp,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
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
import { Grid, Paper, Typography } from '@mui/material';

const SendButton = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  borderstyle: 'solid',
  borderwidth: '5px',
  color: theme.palette.text.secondary,
  alignContent: 'end'
}));

interface User {
  id: GridRowId;
  name: string;
  xposition: number,
  yposition: number,
  aoatposition: number,
  aoabposition: number,
  xvelocity: number,
  yvelocity: number,
  aoatvelocity: number,
  aoabvelocity: number,
  xacceleration: number,
  yacceleration: number,
  aoatacceleration: number,
  aoabacceleration: number,

}

const useFakeMutation = () => {
  return React.useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>((resolve, reject) =>
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

  for (let x in newRow) {
    console.log(x);
    if (newRow[x] !== oldRow[x]) {
      return `the value from ${oldRow[x]}' to '${newRow[x]}'`;
    }
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
            checkboxSelection={true}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
          />
          {!!snackbar && (
            <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </div>
        <Grid justifyContent="center" padding={1} height={40}>
          <SendButton>
            <Button fullWidth variant='contained'>
              Send Data
            </Button>
          </SendButton>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

}

const columns: GridColumns = [
  { field: 'id', headerName: '#', editable: false },
  { field: 'name', headerName: 'Name', editable: true },
  { field: 'xposition', headerName: 'Stagger Position', editable: true },
  { field: 'yposition', headerName: 'Gap Position', editable: true },
  { field: 'aoatposition', headerName: 'AOA Top Position', editable: true },
  { field: 'aoabposition', headerName: 'AOA Bottom Position', editable: true },
  { field: 'xvelocity', headerName: 'Stagger Velocity', editable: true },
  { field: 'yvelocity', headerName: 'Gap Velocity', editable: true },
  { field: 'aoatvelocity', headerName: 'AOA Top Velocity', editable: true },
  { field: 'aoabvelocity', headerName: 'AOA Bottom Velocity', editable: true },
  { field: 'xacceleration', headerName: 'Stagger Acceleration', editable: true },
  { field: 'yacceleration', headerName: 'Gap Acceleration', editable: true },
  { field: 'aoatacceleration', headerName: 'AOA Top Acceleration', editable: true },
  { field: 'aoabacceleration', headerName: 'AOA Bottom Acceleration', editable: true },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: 'Scenario 1',
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
    name: 'Scenario 2',
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
    name: 'Scenario 3',
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
    name: 'Scenario 4',
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
    name: 'Scenario 5',
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
];