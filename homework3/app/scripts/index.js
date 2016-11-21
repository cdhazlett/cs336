import React from 'react';
import ReactDOM from 'react-dom';

import PersonBox from './personBox';

import '../css/base.css';

ReactDOM.render(
    <PersonBox url="/people/" pollInterval={2000}/>,
    document.getElementById('content')
);
