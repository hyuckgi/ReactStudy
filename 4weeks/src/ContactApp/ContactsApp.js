import React, { PropTypes } from 'react'
import {render} from 'react-dom';
import 'whatwg-fetch';


class ContactsAppContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			contacts : []
		}
	}

	componentDidMount() {
		fetch('./contacts.json')
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			this.setState({
				contacts: data
			});
		})
		.catch((error) => {
			console.log('Error fetching and parsing data ', error);
		})
	}

	render () {
		return (
			<ContactsApp contacts={this.state.contacts} />
		);
	}
}




class ContactsApp extends React.Component {
	constructor(){
		super();
		this.state = {
			filterText : ''
		}
	}
	handleUserInput(searchTerm){
		this.setState({
			filterText: searchTerm
		});
	}
	render () {
		return (
			<div>
				<SearchBar filterText={this.state.filterText}
				 			onUserInput={this.handleUserInput.bind(this)}/>
				<ContactList contacts={this.props.contacts} filterText={this.state.filterText} />
			</div>
		);
	}
}
ContactsApp.propTypes = {
	contacts : PropTypes.arrayOf(PropTypes.object)
}


class SearchBar extends React.Component {

	handleChange(e){
		this.props.onUserInput(e.target.value);
	}
	render () {
		return (
			<input type="search"
				   placeholder="search"
				   value={this.props.filterText}
				   onChange={this.handleChange.bind(this)}/>
		);
	}
}

SearchBar.propTypees = {
	onUserInput : PropTypes.func.isRequired,
	filterText : PropTypes.string.isRequired
}

class ContactList extends React.Component {
	render () {
		let filteredContacts = this.props.contacts.filter(
			(contact) => {
				return contact.name.indexOf(this.props.filterText) != -1
			}
		)
		return (
			<ul>
				{filteredContacts.map(
					(contact) => {
						return <ContactItem key={contact.email} name={contact.name} email={contact.email} />
					}
				)}
			</ul>
		);
	}
}
ContactList.propTypes = {
	contacts : PropTypes.arrayOf(PropTypes.object)
}


class ContactItem extends React.Component {
	render () {
		return (
			<li>{this.props.name} - {this.props.email}</li>
		);
	}
}
ContactItem.propTypes = {
	name : PropTypes.string.isRequired,
	email : PropTypes.string.isRequired
}


render(<ContactsAppContainer />, document.getElementById('root'));
