import {Reducer} from 'redux';

import {IAuth} from '../../../types';

const INITIAL_STATE = {
  auth: {
    token: '',
    user: '',
  },
};

const AuthToken: Reducer<IAuth | any> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TOKEN': {
      const {token, user} = action.payload?.data;
      return {
        ...state,
        auth: {token},
        user,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthToken;
