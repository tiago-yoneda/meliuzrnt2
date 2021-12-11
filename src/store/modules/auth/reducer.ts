import {Reducer} from 'redux';

import {IAuth} from '../../../types';

const INITIAL_STATE = {
  auth: {
    token: '',
  },
};

const AuthToken: Reducer<IAuth | any> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TOKEN': {
      const {token} = action.payload;
      return {
        ...state,
        auth: {token},
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthToken;
