import React from 'react';
import ReactDOM from 'react-dom';
import Campaign from './Campaign';
import "./index.css";

class App extends React.Component{
    render(){
        return(
            <Campaign />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
