import React, { PropTypes } from 'react'
import {render} from 'react-dom';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
	'Content-Type' : 'application/json',
	'Authorization' : '#!DE1ki92kd!2304d'
}



class KanbanBoardContainer extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			cards :[]
		};
	}
	componentDidMount() {
		fetch(API_URL + '/cards', {headers : API_HEADERS})
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				cards: responseData
			});
		})
		.catch((error) => {
			console.log('Error Fetching and Parsing Data', error);
		})
	}

	addTask(cardId, taskName) {

		// UI ROLLBACK
		let prevState = this.state;

		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		let newTask = {id:Date.now(), name:taskName, done:false};

		let nextState = update(this.state.cards, {
			[cardIndex] : {
				tasks : {$push : [newTask]}
			}
		});

		this.setState({
			cards:nextState
		});

		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method : 'post',
			headers : API_HEADERS,
			body : JSON.stringify(newTask)
		})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Server response wasn't OK");
			}
		})
		.then((responseData) => {
			newTask.id = responseData.id;
			this.setState({
				cards: nextState
			});
		})
		.catch((error) => {
			this.setState(prevState);
		})
	}

	deleteTask(cardId, taskId, taskIndex) {
		// UI ROLLBACK
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

		let nextState = update(this.state.cards, {
			[cardIndex] : {
				tasks : {$splice : [[taskIndex,1]]}
			}
		});
		this.setState({
			cards:nextState
		});
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method : 'delete',
			headers : API_HEADERS
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Server response wasn't OK");
			}
		})
		.catch((error) => {
			console.error("Fetch Error: ", error);
			this.setState(prevState);
		})


	}

	toggleTask(cardId, taskId, taskIndex) {
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		// UI ROLLBACK
		let prevState = this.state;

		let newDoneValue;

		let nextState = update(this.state.cards, {
			[cardIndex] : {
				tasks : {
					[taskIndex] : {
						done : {
							$apply : (done) => {
								newDoneValue = !done
								return newDoneValue;
							}
						}
					}
				}
			}
		});
		this.setState({
			cards:nextState
		});
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method : 'put',
			headers : API_HEADERS,
			body : JSON.stringify({
				done : newDoneValue
			})
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Server response wasn't OK");
			}
		})
		.catch((error) => {
			console.error("Fetch Error: ", error);
			this.setState(prevState);
		})
	}

	render () {
		return (
			<KanbanBoard cards={this.state.cards}
				taskCallbacks={{
					toggle : this.toggleTask.bind(this),
					delete : this.deleteTask.bind(this),
					add : this.addTask.bind(this)
				}}/>
		);
	}
}

export default KanbanBoardContainer;
