import AppDispatcher from '../AppDispatcher';
import bankConstants from '../constants';

//  Use Store
// import { Store } from 'flux/utils';
//
// let balance = 0;
//
// class BankBalanceStore extends Store{
//     getState(){
//         return balance;
//     }
//
//     __onDispatch(action){
//         switch (action.type) {
//             case bankConstants.CREATED_ACCOUNT :
//                 balance = 0;
//                 this.__emitChange();
//                 break;
//             case bankConstants.DEPOSITED_INTO_ACCOUNT :
//                 balance = balance + action.amount;
//                 this.__emitChange();
//                 break;
//             case bankConstants.WITHDREW_FROM_ACCOUNT :
//                 balance = balance - action.amount;
//                 this.__emitChange();
//                 break;
//         }
//     }
// }

//  Use ReduceStore
import { ReduceStore } from 'flux/utils';


class BankBalanceStore extends ReduceStore {
    getInitialState() {
        return 0;
    }

    reduce(state, action) {
        switch (action.type) {
            case bankConstants.CREATED_ACCOUNT:
                return 0;

            case bankConstants.DEPOSITED_INTO_ACCOUNT:
                return state + action.amount;

            case bankConstants.WITHDREW_FROM_ACCOUNT:
                return state - action.amount;
        }
    }
}


export default new BankBalanceStore(AppDispatcher);