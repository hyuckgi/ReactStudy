import React, { Component} from 'react';
import List from './List';

class KanBanboard extends Component {

    render() {
        const mapToComponents = (data) => {
            return data.map((card, i) => {
                return (<List
                			key={i}
                            data={card}
                		/>);
            });
        };
        return(
            <div className="app">
                <div>{mapToComponents(this.props.cards)}</div>
            </div>
        );
    }
}
export default KanBanboard;
