import React from "react"
import { observer } from "mobx-react"


@observer
export default class ChatList extends React.Component {  
  constructor(){
      super(...arguments);
      this.state = {
          userName: "",
          socket:""
      };
  }

  keyHanlder(e) {    
    let _this = this;
    if (e.which === 13) {      
      _this.sendMessage()
      e.target.value = ""
    }
  }

  sendMessage() {
    let msgObj={}
    msgObj.userName = this.state.userName;
    msgObj.msg = this.refs.text_input.value;
    this.state.socket.emit('chat message', msgObj);
    this.refs.text_input.value = ""  
    
    return false;  
  }
  
  componentWillMount () {
    let socket = io();
    let _this = this;
    this.setState({socket:socket})
    socket.on('chat message', function(msgObj){
      _this.props.store.sendMessage(msgObj)
    });
  }
  
  componentDidMount() {
		var username = ''

		do {
			username = prompt('닉네임:')
		} while (!username.length)

		this.setState({
			userName: username
		});
	}
  render() {
    const { chats } = this.props.store
    let _this = this;
    const chatList = chats.map(value => {
      return(
        <li className={_this.state.userName==value.userName?"default":"default yellow"} key={value.id}>       
          <strong>{value.userName}</strong>
          <span>{value.value}</span>
        </li>
      )
    })
    return (
      <div>
        <h1>MOBX - REACT - CHAT</h1>
        <div className="chatwrap">
          <ul>{chatList}</ul>
        </div>
        <div className="inputwrap">
          <input className="new" ref="text_input" onKeyPress={this.keyHanlder.bind(this)}/>
          <button className="btn btn_send" onClick={this.sendMessage.bind(this)} >전송</button>
        </div>
      </div>
    )
  }
}
