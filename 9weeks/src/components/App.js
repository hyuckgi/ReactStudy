import React from 'react';
import BankBalanceStore from '../store/BankBalanceStore';

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			balance : BankBalanceStore.getState()
		};
	}
	render(){
		const { balance } = this.state;

		return(
			<h1>{balance}</h1>
		);
	}
}

export default App;
