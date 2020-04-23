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
//import temperatureData from '../temperature.json';
import DatePickerStart from './DatePickerStart';
import DatePickerEnd from './DatePickerEnd';
import Loader from './Loader';
import List from './Labels';
import { formatDate } from './Utils';

export default class Test extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tempData: [],
            startDate: '',
            endDate: '',
            rangeIsWrong: false,
            loading: true
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
    }

    componentDidMount() {
        fetch('https://res.cloudinary.com/nzmai/raw/upload/v1587609158/temperature_h6ykh4.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ tempData: data, startDate: new Date(), endDate: new Date(), loading: false });

            });
    }

    shouldComponentUpdate(nextProps, prevState) {
        return this.state.tempData !== prevState.tempData;
    }

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
        console.log('clicked');
        const start = this.state.tempData.findIndex(item => item.t === formatDate(this.state.startDate));
        const end = this.state.tempData.findIndex(item => item.t === formatDate(this.state.endDate));
        if (start === -1 || end === -1) {
            this.setState({
                rangeIsWrong: true
            });
        }
        if (start >= end) {
            this.setState({
                rangeIsWrong: true
            });
        }

        setTimeout(() => {
            this.setState({
                rangeIsWrong: false
            });
        }, 3000);

        console.log(start, end);
        let obj = this.state.tempData.slice(start, end);
        this.setState({
            tempData: obj
        });
    };

    resetTemp = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        fetch('https://res.cloudinary.com/nzmai/raw/upload/v1587609158/temperature_h6ykh4.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ tempData: data, startDate: new Date(), endDate: new Date(), loading: false });

            });
    };


    render() {
        console.log(formatDate(this.state.startDate));
        console.log(formatDate(this.state.endDate));


        return (
            <div className="columns">
                <div className="column is-3" style={ { padding: '100px' } }>
                    <List />
                </div>
                <div className="column">
                    { this.state.loading ? (
                        <>
                            <Loader type="bars" color="#357EDD" />
                            <p>Загружается...</p>
                        </>
                    ) : (
                            <>
                                <nav class="level">
                                    <div class="level-item has-text-centered"></div>
                                    <div class="level-item has-text-centered">
                                        <p class="heading">Start of the period</p>
                                        <hr />
                                        <DatePickerStart startDate={ this.state.startDate } handleStartDate={ this.handleStartDateChange } />
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <p class="heading">End of the period</p>
                                        <hr />
                                        <DatePickerEnd endDate={ this.state.endDate } handleEndDate={ this.handleEndDateChange } />
                                    </div>
                                    <div class="level-item has-text-centered"></div>
                                </nav>
                                <LineGraph data={ this.state.tempData } />
                                <button className="button is-success" onClick={ this.showPeriod }>Show for period</button>
                                <button className="button is-info" onClick={ this.resetTemp }>Reset period</button>
                            </>
                        ) }

                    { this.state.rangeIsWrong && (<div className="notification is-primary">Range is wrong, please reset the range</div>) }

                </div>

            </div>
        );
    }
}
