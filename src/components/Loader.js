import React from 'react';
import ReactLoading from 'react-loading';


export default function Loader(props) {
    return (
        <div style={{margin:'0 auto', width:'100px'}}>
            <ReactLoading type={ props.type } color={ props.color } height={ 667 } width={ 375 } />
        </div>
    );
}
