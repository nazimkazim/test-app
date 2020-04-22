import React from 'react';
import DatePicker from 'react-date-picker';

export default function DatePick(props) {

    return (
        <div>
            <DatePicker
                onChange={ props.handleEndDate }
                value={ props.endDate }
            />
        </div>
    );

}