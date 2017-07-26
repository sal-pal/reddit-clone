import React, { Component } from 'react';
import ReactDOM from 'react-dom'
    
    
    

class App extends Component {

    render() {
        const appHeaderStyling = {
            backgroundColor: '#cee3f8',
            border: 'solid #30b5b5',
            height: '15px',
            position: 'absolute',
            padding: '20px',
            borderWidth: 'thin',
            
            top: '0',
            right: '0',
            left: '0'
        }

        const redditImgSytling = {
            marginRight: '60%',
            position: 'absolute',
            display: 'inline',
            top: '5px', left: '300px' 
        }
        
        return (
            <div className="App">
                <div className="App-header" style={appHeaderStyling}>
                    <img src='./redditImg.png' />
                </div>
            </div>
        )
    }
}




function run() {
    ReactDOM.render(<App/>, document.getElementById('root'));
}

if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run);
} 
else {
    window.attachEvent('onload', run);
}
