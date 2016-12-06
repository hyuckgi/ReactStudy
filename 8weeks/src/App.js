import React, { Component } from 'react';
import { render } from 'react-dom';
import BankBalanceStore from './store/BankBalanceStore';
import BankActions from './actions/BankActions';

class App extends Component{
	constructor(){
		super(...arguments);
		BankActions.createAccount();
		this.state = {
			balance : BankBalanceStore.getState()
		};
	}

	componentDidMount (){
		this.storeSubscription = BankBalanceStore.addListener(
			data => this.handleStoreChange(data)
		);
	}
	componentWillUnmount() {
		this.storeSubscription.remove();
	}

	handleStoreChange(){
		this.setState({
			balance : BankBalanceStore.getState()
		});
	}

	deposit(){
		BankActions.depositIntoAccount(Number(this.refs.amount.value));
		this.refs.amount.value = " ";
	}
	withdraw(){
		BankActions.withdrawFromAccount(Number(this.refs.amount.value));
		this.refs.amount.value = " ";
	}

	render(){
		return(
			<div>
				<header>FluxTrust Bank</header>
				<h1>your balance is ${(this.state.balance).toFixed(2)}</h1>
				<div className="atm">
					<input type="text" placeholder="Enter Amount" ref="amount" />
					<br />
					<button onClick={this.withdraw.bind(this)}>Withdraw</button>
					<button onClick={this.deposit.bind(this)}>Deposit</button>
				</div>
			</div>
		);
	}
}

render(<App />, document.getElementById('root'));
