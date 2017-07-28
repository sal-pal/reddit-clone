import React, { Component } from 'react'


class Post extends Component {
    constructor(props) {
        super(props)
    }  

    render() {
        const titleStyling = {
            fontWeight: 'normal',
            marginBottom: '1px',
            color: '#00F',
            textDecoration: 'none',
            font: 'medium verdana,arial,helvetica,sans-serif'
            
        }
        
        const authorStyling = {
            color: '#888',
            padding: '0px',
            font: 'x-small verdana,arial,helvetica,sans-serif'  
        }
        
        return (
            <div className="Post">
                <a href="#" style={titleStyling}>
                    {this.props.title}
                </a>
                <p style={authorStyling}>
                    Submitted by {this.props.author}
                </p>
            </div>
        );
    }
}

module.exports = Post
