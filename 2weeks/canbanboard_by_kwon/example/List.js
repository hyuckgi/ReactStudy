import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
    render (){
        return(
            <div className = "list">
                <h1>{this.props.data.status}</h1>
                <Card
                    id = {this.props.data.id}
                    title = {this.props.data.title}
                    description = {this.props.data.description}
                    tasks = {this.props.data.tasks}
                />
            </div>
        );
    }
}
export default List;
