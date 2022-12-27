import * as React from 'react';
import { Typography } from '@mui/material';
import SliderGroup from './UIComponents/SliderUI';
import TableGroup from './UIComponents/TableUI';



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
                paragraph 2
            </Typography>
            <Typography paragraph>
                paragraph 2
            </Typography>
        </React.Fragment>

    );

}
