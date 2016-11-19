import React,{Component, PropTypes} from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import style from './kanban.css';
import transitions from './transitions.css'
import {Link} from 'react-router';


import {DragSource, DropTarget} from 'react-dnd';
import constants from './constants';

let titlePropType  = (props, propName, ComponentName) => {
  if(props[propName]){
    let value = props[propName];

    if(typeof value !== 'string' || value.length > 80){
      return Error(`${propName} in ${ComponentName} is longer than 80 character`);
    }
  }
};

const cardDragSpec = {
  beginDrag(props){
    return {
      id : props.id,
      status : props.status
    };
  },
  endDrag(props){
    props.cardCallbacks.prersistCardDrag(props.id, props.status);
  }
};

let cardDropSpec = {
  hover(props, monitor){
    const draggeId = monitor.getItem().id;

    props.cardCallbacks.updatePosition(draggeId, props.id);
  }
};

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource : connect.dragSource()
  };
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget : connect.dropTarget()
  };
};

class Card extends Component{
  constructor(){
    super(...arguments);
    this.state = {
      showDetails : false
    };
  }

  toggleDetails(){
    this.setState({showDetails: !this.state.showDetails});
  }

  render(){
    const {connectDragSource, connectDropTarget} = this.props;
    let cardDetails;
    if(this.state.showDetails){
      cardDetails = (
        <div className={style.card_details}>
          <span dangerouslySetInnerHTML = {{__html : marked(this.props.description)}} />
          <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks}  />
        </div>
      );
    }

    let sideColor = {
      position:'absolute',
      zIndex : -1,
      top : 0,
      bottom : 9,
      left : 0,
      width : 7,
      backgroundColor : this.props.color
    };
    return connectDropTarget(connectDragSource(
      <div className={style.card}>
        <div style={sideColor} />
        <div className={style.card__edit}>
          <Link to={`/edit/${this.props.id}`}>&#9998;</Link>
        </div>
        <div className={  this.state.showDetails? style.card_title && style.card_title_is_open : style.card_title}
          onClick = {this.toggleDetails.bind(this)}>
          {this.props.title}
        </div>


        <ReactCSSTransitionGroup
          transitionName={transitions}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {cardDetails}
        </ReactCSSTransitionGroup>
      </div>
    ));
  }
};

Card.propTypes = {
  id : PropTypes.number,
  title: titlePropType,
  description : PropTypes.string,
  color : PropTypes.string,
  tasks : PropTypes.arrayOf(PropTypes.object),
  taskCallbacks:PropTypes.object,
  connectDragSource : PropTypes.func.isRequired,
  connectDropTarget : PropTypes.func.isRequired,
  cardCallbacks : PropTypes.object,
};

const dragHightOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHightOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHightOrderCard);

export default dragDropHightOrderCard;
