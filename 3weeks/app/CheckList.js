import React, { Component } from 'react';
import {render} from 'react-dom';

class CheckList extends Component {
    render (){
        let tasks = this.props.tasks.map((task, i) => (
            <li className = "checklist__task" key={i}>
                <input 
                    type="checkbox" 
                    defaultChecked={task.done} 
                />
                {task.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        ));
        return (
            <div className = "checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
}

export default CheckList;       
       
