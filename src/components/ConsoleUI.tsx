import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Box, TextField, Typography, Grid, Checkbox} from '@mui/material';
import { AutoScrollingTextArea } from './AutoScrollingTextarea';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    borderstyle: 'solid',
    borderwidth: '5px',
    color: theme.palette.text.secondary,
}));
const StyledAutoScrollingTextArea = styled(AutoScrollingTextArea)(({ theme }) => ({
    textAlign: 'left',
    borderWidth: '1px',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    alignContent: 'end',
    width: '100%',
    minHeight: 300,
    borderRadius: 10,
    padding: 10,
    resize: 'vertical'
}));

function valuetext(value: number) {
    return `${value}`;
}

export default function ConsoleGroup() {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Serial Console</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <SendCommandGroup></SendCommandGroup>
                <StyledAutoScrollingTextArea value={'hello'} autoScroll={true} readOnly={true}></StyledAutoScrollingTextArea>
                <ConsoleButtonGroup></ConsoleButtonGroup>
            </AccordionDetails>
        </Accordion>
    );
}

function SendCommandGroup() {
    return (
        <Box sx={{ flexGrow: 1, paddingTop: '10px', marginBottom: '5px', marginLeft: 2 }}>
            <Grid container spacing={2}>
                <Grid xs={12} md={10} lg={10}>
                    <TextField label="Type Command Here" fullWidth ></TextField>
                </Grid>
                <Grid xs={12} md={2} lg={2}>
                    <Button sx={{ height: '56px' }} fullWidth variant="contained" >Send</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

function ConsoleButtonGroup() {
    return (
        <Box sx={{ flexGrow: 1, marginTop: '20px', marginLeft: 2 }}>
            <Grid container spacing={2}>
                <Grid xs={12} md={10} lg={10 }>
                    <FormGroup sx={{paddingTop: '10px', justifyContent: 'flex-start'}} row>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Auto Scroll" />
                        <FormControlLabel control={<Checkbox />} label="Show TimeStamp" />
                        <FormControlLabel control={<Checkbox />} label="Show Sent Data" />
                    </FormGroup>
                </Grid>
                <Grid xs={12} md={2} lg={2}>
                    <Button sx={{ height: '56px' }} fullWidth variant="contained" >Clear Output</Button>
                </Grid>
            </Grid>
        </Box>
    );
}