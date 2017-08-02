import React, { Component } from 'react'
import renderIf from 'render-if'


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
            font: '18px verdana,arial,helvetica,sans-serif'
            
        }
        
        const authorStyling = {
            color: '#888',
            padding: '0px',
            font: 'x-small verdana,arial,helvetica,sans-serif'  
        }
        
        if (!this.props.titleHighlighted) {
            //Make the title not become a link
            titleStyling.color = 'black'
            titleStyling.pointerEvents = 'none'
        }
        
        return (
            <div className="Post">
                <a href="#" onClick={this.props.onClick} style={titleStyling} id={this.props.id}>
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
