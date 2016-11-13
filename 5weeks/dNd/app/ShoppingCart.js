import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import constants from './constants';

// ShoppingCart 드래그 앤드 드롭 사양
// 드롭 대상 사양을 구현하는 일반 객체
//
// -DropTarget 메서드 (모두 선택적)
// - drop: 호환되는 항목이 드롭되면 호출된다.
// - hover: 항목으로 컴포넌트를 가리키면 호출된다.
// - canDrop: 드롭 대상이 항목을 수락할수 있는지 여부를 지정하는데 이용된다.

const ShoppingCartSpec = {
  drop() {
    return { name: 'ShoppingCart' };
  }
};

// 콜렉팅 합수
//
//  - connect: DropTargetConnector의 인스턴스
//  드롭대상 역할을 DOM 노드에 할당하는데 이용한다.
//
//  - monitor: DropTargetMonitor의 인스턴스
//  리액트 DnD에서 속성으로 상태를 연결하는데 이용한다.
//  상태를 얻는데 이용할수있는 함수에는 canDrop(), isOver(), didDrop()이 있다.

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class ShoppingCart extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#FFFFFF';
    if (isActive) {
      backgroundColor = '#F7F7BD';
    } else if (canDrop) {
      backgroundColor = '#F7F7F7';
    }

    const style = {
      backgroundColor: backgroundColor
    };

    return connectDropTarget(
      <div className='shopping-cart' style={style}>
        {isActive ?
          'Hummmm, snack!' :
          'Drag here to order!'
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);