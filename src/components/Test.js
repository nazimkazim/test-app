import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Labels from './Labels';
import DatePickerStart from './DatePickerStart';
import DatePickerEnd from './DatePickerEnd';
import LineGraph from './LineGraph';
import temperatureData from '../temperature.json';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function AutoGrid() {
    const classes = useStyles();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = startDate => {
        //console.log(date);
        setStartDate(startDate);
    };

    const handleEndDateChange = endDate => {
        //console.log(date);
        setEndDate(endDate);
    };
    return (
        <div className={ classes.root }>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 3 }>
                    <Paper className={ classes.paper }>
                        <Labels />
                    </Paper>
                </Grid>
                <Grid item xs={ 6 }>
                    <DatePickerStart startDate={ startDate } handleStartDate={ handleStartDateChange } />
                    <DatePickerEnd endDate={ endDate } handleEndDate={ handleEndDateChange } />
                    <Paper className={ classes.paper }>
                        <LineGraph data={ temperatureData } />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
