import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    borderstyle: 'solid',
    borderwidth: '5px',
    color: theme.palette.text.secondary,
  }));


export default function RadioButtonGroup() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Item>xs=6 md=4</Item>
                </Grid>
                <Grid item xs={6} md={8}>
                    <Item>xs=6 md=8</Item>
                </Grid>
            </Grid>
        </Box>
    );
}