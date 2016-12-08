import { Dispatcher } from 'flux';
import 'babel-polyfill'

class AppDispatcher extends Dispatcher{
    dispatch(action = {}){
        console.log("Dispatched", action);
        super.dispatch(action);
    }

    dispatchAsync(promise, types, payload){
        const { request, success, failure } = types;
        this.dispatch({type:request, payload: Object.assign({}, payloaad)});
        promise.then(
            response => this.dispatch({
                type : success,
                payload: Object.assign({}, payload, {response})
            }),
            error => this.dispatch({
                type : failure,
                payload : Object.assign({}, payload, {error})
            })
        );
    }
}

export default new AppDispatcher();
