import React, { Component } from 'react';
import {render} from 'react-dom';
import CheckList from './CheckList';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDetails: false
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(){
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    render (){
        const blank = "";
        const cardDetails = (
            <div className="card__details">
                {this.props.description}
                <CheckList cardId={this.props.id} tasks={this.props.tasks} />
            </div>
        );

        return (
            <div className="card">
                <p
                    className="card__title"
                    onClick={this.handleToggle}
                >
                    {this.props.title}
                </p>
                {this.state.showDetails ? cardDetails : blank}
            </div>
        );
    }
}

export default Card;
