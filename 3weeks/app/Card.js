import React, { Component } from 'react';
import {render} from 'react-dom';
import CheckList from './CheckList'

class Card extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }
	/* remove onclick event => function  ps. Card.js is line 32 */
	toggleDetails() {
		this.setState({showDetails: !this.state.showDetails});
	}
    render (){
        let cardDetails;
        if(this.state.showDetails){
            cardDetails = (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            );
        }
        return (
            <div className="card">
			{/* buntton change event for ?: operator  */}
	            <div 
                    className={this.state.showDetails? "card__title card__title-is-open" :"card__title"}
                    onClick={()=>this.toggleDetails()}
                >
                    {this.props.title}
                </div>
                {cardDetails}
            </div>
        );
    }
}

export default Card;       
       
