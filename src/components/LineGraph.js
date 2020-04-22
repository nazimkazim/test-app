import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

export default function LineGraph(props) {
    return (
        <LineChart width={ 1000 } height={ 300 } data={ props.data }
            margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
            <XAxis dataKey="t" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="v" stroke="#8884d8" activeDot={ { r: 8 } } />
        </LineChart>
    );

}
