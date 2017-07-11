import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header" >
            <img src={require("./redditImg.png")} />
        </div>
      </div>
    );
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
