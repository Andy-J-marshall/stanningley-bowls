import React from 'react';
import Stats from './components/stats';
import './app.css';

function App() {
    return (
        <div id="app">
            <div id="header">
                <h1 style={{ fontSize: '4rem' }}>
                    Stanningley Crown Green Bowling Club
                </h1>
            </div>
            <Stats />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                crossOrigin="anonymous"
            />
        </div>
    );
}

export default App;
