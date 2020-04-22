/* import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function DatePick(props) {

    return (
        <DatePicker
            selected={ props.startDate }
            onChange={ props.handleStartDate }
        />
    );

} */

import React from 'react';
import DatePicker from 'react-date-picker';

export default function DatePick(props) {

    return (
        <div>
            <DatePicker
                onChange={ props.handleStartDate }
                value={ props.startDate }
            />
        </div>
    );

}