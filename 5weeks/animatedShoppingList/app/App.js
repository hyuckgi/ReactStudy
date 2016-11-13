import React, { Component } from 'react';
import {render} from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends Component{
	constructor(){
		super(...arguments);
		//몇가지 쇼핑 항목을 미리 설정한 "item" 상태를 만든다.
		
		this.state={
				items:[
				      {id:1, name:'Milk'},
				      {id:2, name:'Yogurt'},
				      {id:3, name:'Orange Juice'}
				      ]
		}
		
	}
	
	//사용자가 입력 필드를 변경할때 호출된다.
	handleChange(evt){
		if(evt.key == 'Enter'){
			// 새로운 항목을 생성하고 id를 현재 시간으로 설정한다.
			let newItem = {id:Date.now(), name:evt.target.value}
			//이전 items에 사용자가 입력한 값을 추가해 새로운 배열을 만든다.
			let newItems = this.state.items.concat(newItem);
			//텍스트 필드를 지운다.
			evt.target.value='';
			//새로운 상태를 설정한다.
			this.setState({items: newItems});
			
		}
	}
	
	//사용자가 클릭하면 호출된다.
	handleRemove(i){
		//틀릭한 항목을 제외하고 새로운 배열을 생성한다.
		let newItems = this.state.items;
		newItems.splice(i,1);
		//새로운 상태를 설정한다.
		this.setState({items:newItems});
	}
	
	render(){
		let shoppingItems = this.state.items.map((item, i) => (
		  <div key={item.id} className="item" onClick={this.handleRemove.bind(this,i)}> 
		  	{item.name}		
		  </div>
		));
		
   return(
	<div>	   
		<ReactCSSTransitionGroup transitionName="example"
			                     transitionEnterTimeout={300}
								 transitionLeaveTimeout={300}
								 transitionAppear={true}
								 transitionAppearTimeout={300}>
		{shoppingItems}
		</ReactCSSTransitionGroup>
		<input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
    </div>
   );
	}
};

render(<AnimatedShoppingList /> , document.getElementById('root'));

