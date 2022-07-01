import React from 'react';
import Home from './components/home';
import './app.css';

function App() {
    return (
        <div id='app'>
            <Home />
            <link
                rel='stylesheet'
                href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
                integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
                crossOrigin='anonymous'
            />
        </div>
    );
}

export default App;
