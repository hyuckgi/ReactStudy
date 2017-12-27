import AppDispatcher from '../AppDispatcher';
import bankConstants from '../constants';

let BankActions = {

    // 빈 값으로 계좌를 개설한다.
    createAccount() {
        AppDispatcher.dispatch({
            type: bankConstants.CREATED_ACCOUNT,
            amount: 0
        });
    },

    // amount 매개변수는 입금할 금액이다.
    depositIntoAccount(amount) {
        console.log("depositIntoAccount", amount)
        AppDispatcher.dispatch({
            type: bankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        });
    },

    // amount 매개변수는 출금할 금액이다.
    withdrawFromAccount(amount) {
        AppDispatcher.dispatch({
            type: bankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        });
    }
}

export default BankActions;