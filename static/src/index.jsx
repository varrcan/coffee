import React from 'react';
import ReactDOM from 'react-dom';
import Coffee from './coffee.jsx';

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        <Coffee data={webpractikWorkers} />,
        document.getElementById('container')
    );
});
