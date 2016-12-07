import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {MapStore} from 'flux/utils';

class RouteStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
        return state.set(action.target, action.code);
      default:
        return state;
    }
  }
}
export default new RouteStore(AppDispatcher);
