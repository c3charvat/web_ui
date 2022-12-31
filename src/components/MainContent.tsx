import * as React from 'react';
import { Typography } from '@mui/material';
import SliderGroup from './SliderUI';
import TableGroup from './TableUI';
import ConsoleGroup from './ConsoleUI';



export default function MainContent() {
    return (
        <React.Fragment>
            <Typography paragraph>
                <SliderGroup></SliderGroup>
            </Typography>
            <Typography paragraph>
                <TableGroup></TableGroup>
            </Typography>
            <Typography paragraph>
                <ConsoleGroup></ConsoleGroup>
            </Typography>
            <Typography paragraph>
                paragraph 2
            </Typography>
        </React.Fragment>

    );

}
