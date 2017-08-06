import React, { Component } from 'react'


class Comment extends Component {
    constructor(props) {
        super(props)
    }  

    render() {
        
        const authorStyling = {
            fontSize: '13px'
        }
        
        const bodyStyling = {
            font: '14px verdana,arial,helvetica,sans-serif',
            marginTop: '-5px',
            marginBottom: '30px'
        }
        
        return (
            <div className="Comment">
                <h1 style={authorStyling}>
                    {this.props.author}
                </h1>
                <p style={bodyStyling}>
                    {this.props.body}
                </p>
            </div>
        );
    }
}

module.exports = Comment