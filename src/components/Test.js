/* import React, { useState, useEffect } from 'react';
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
    const [temData, setTempData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setTempData(temperatureData);
    },[]);


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
                        <LineGraph data={ temData } />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
 */

import React, { Component } from 'react';
import LineGraph from './LineGraph';
import temperatureData from '../temperature.json';
import DatePickerStart from './DatePickerStart';
import DatePickerEnd from './DatePickerEnd';
import {formatDate, showPeriod} from './Utils'

export default class Test extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tempData: [],
            startDate: '',
            endDate: ''
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
    }

    componentDidMount() {
        this.setState({ tempData: temperatureData, startDate: new Date(), endDate: new Date() });
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        if (this.state.tempData !== nextState.tempData) {
            return false;
        }
    } */

    handleStartDateChange = (date) => {
        console.log(date);
        this.setState({ startDate: date });
    };

    handleEndDateChange = (date) => {
        console.log(date);
        this.setState({ endDate: date });
    };

    showPeriod = (e) => {
        e.preventDefault();
        console.log('clicked')
        const start = this.state.tempData.findIndex(item => item.t === formatDate(this.state.startDate))
        const end = this.state.tempData.findIndex(item => item.t === formatDate(this.state.endDate))
        console.log(start, end)
        let obj = this.state.tempData.slice(start,end)
        this.setState({
            tempData:obj
        })
        return obj
    }


    render() {
        console.log(formatDate(this.state.startDate));
        console.log(formatDate(this.state.endDate));
        return (
            <div className="columns">
                <div className="column">
                    <ul>
                        <li>температура</li>
                        <li>осадки</li>
                    </ul>
                </div>
                <div className="column">
                    <DatePickerStart startDate={ this.state.startDate } handleStartDate={ this.handleStartDateChange } />
                    <DatePickerEnd endDate={ this.state.endDate } handleEndDate={ this.handleEndDateChange } />
                    <LineGraph data={ this.state.tempData } />
                </div>
                <button onClick={this.showPeriod}>Show for period</button>
            </div>
        );
    }
}
