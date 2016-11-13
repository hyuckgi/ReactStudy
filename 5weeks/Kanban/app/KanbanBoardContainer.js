import React, { Component } from 'react';
import update from 'react-addons-update';
import {throttle} from './utils';
import KanbanBoard from './KanbanBoard';
// 폴리필
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  
  Authorization: 'CHANGE THIS VALUE'
};

class KanbanBoardContainer extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards:[],
    };
    // 인수가 변경된 경우에만 updateCardStatus를 호출한다.
    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    // 최대 500ms 마다 (또는 인수가 변경된 경우) updateCardPosition을 호출한다.
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
  }
  componentDidMount(){
    fetch(API_URL+'/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData});
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    });
  }


  addTask(cardId, taskName){
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Create a new task with the given name and a temporary ID
    let newTask = {id:Date.now(), name:taskName, done:false};
    // Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$push: [newTask] }
      }
    });
    // set the component state to the mutated object
    this.setState({cards:nextState});
    // Call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if(response.ok){
        return response.json()
      } else {
        // Throw an error if server response wasn't 'ok'
        // so we can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .then((responseData) => {
      // When the server returns the definitive ID
      // used for the new Task on the server, update it on React
      newTask.id=responseData.id
      this.setState({cards:nextState});
    })
    .catch((error) => {
      this.setState(prevState);
    });
  }

  deleteTask(cardId, taskId, taskIndex){
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex,1]] }
      }
    });
    // set the component state to the mutated object
    this.setState({cards:nextState});
    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    });

    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
    .then((response) => {
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so we can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error)
      this.setState(prevState);
    });
  }

  toggleTask(cardId, taskId, taskIndex){
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Save a reference to the task's 'done' value
    let newDoneValue;
    // Using the $apply command, we will change the done value to its opposite
    let nextState = update(
      this.state.cards, {
        [cardIndex]: {
          tasks: {
            [taskIndex]: {
              done: { $apply: (done) => {
                newDoneValue = !done
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    this.setState({cards:nextState});
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({done:newDoneValue})
    })
    .then((response) => {
      if(!response.ok){
    	// 서버 응답이 정상이 아닌경우
        // 오류를 생성해 UI에 대한 낙관적인 변경을 원래대로 되돌린다.
    	  
        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error)
      this.setState(prevState);
    });
  }


  updateCardStatus(cardId, listId) {
    // 카드의 인덱스를 찾는다.
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // 현재카드를 얻는다
    let card = this.state.cards[cardIndex]
    // 다르 리스트 위로 드래그할때만 진행한다.
    if(card.status !== listId){
      // 변경된 객체로 컴포넌트 상태를 설정한다.
      this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: listId }
            }
          }
      }));
    }
  }

  updateCardPosition(cardId , afterId){
    // 다른 카드 위로 드래그 할때만 진행한다.
    if(cardId !== afterId) {
      // 카드의 인덱스를 찾는다.
      let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
      // 현재 카드를 얻는다.
      let card = this.state.cards[cardIndex]
      // 마우스로 가리키는 카드의 인덱스를 찾는다.
      let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
      // splice를 ㅣㅇ용해 카드를 제거한 후 새로운 인덱스 위치로 삽입한다.
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }
  persistCardDrag (cardId, status) {
    // 카드 인덱스를 찾는다.
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // 현재 카드를 얻는다.
    let card = this.state.cards[cardIndex]

    fetch(`${API_URL}/cards/${cardId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({status: card.status, row_order_position: cardIndex})
    })
    .then((response) => {
      if(!response.ok){
        // 서버 응답이 정상이 아닌경우
        // 오류를 생성해 UI에 대한 낙관적인 변경을 원래대로 되돌린다.

        throw new Error("Server response wasn't OK")
      }
    })
    .catch((error) => {
      console.error("Fetch error:",error);
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              status: { $set: status }
            }
          }
        })
      );
    });
  }


  render() {
    return (
      <KanbanBoard cards={this.state.cards}
           taskCallbacks={{
             toggle: this.toggleTask.bind(this),
             delete: this.deleteTask.bind(this),
             add: this.addTask.bind(this)
           }}
           cardCallbacks={{
             updateStatus: this.updateCardStatus,
             updatePosition: this.updateCardPosition,
             persistCardDrag: this.persistCardDrag.bind(this)
          }}
      />
    )
  }
}

export default KanbanBoardContainer;