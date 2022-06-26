import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'update_user_info':
      return {...state, userInfo: action.payload};
    case 'update_login_state':
      return {...state, isSignedIn: action.payload};
    case 'update_login_info':
      return {...state, userInfo: action.payload};
    case 'update_Loading_state':
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

const updateLoginStatus = dispatch => async () => {
  try {
    dispatch({type: 'update_login_state', payload: true});
  } catch (error) {
    throw error;
  }
};

const localSignIn = dispatch => async () => {
  dispatch({type: 'update_login_state', payload: false});
  dispatch({type: 'update_Loading_state', payload: false});
};

const handleSignOut = dispatch => async () => {
  //handel sign out
  dispatch({type: 'update_login_state', payload: false});
  dispatch({type: 'update_Loading_state', payload: false});
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    updateLoginStatus,
    localSignIn,
    handleSignOut,
  },
  {isSignedIn: false, isLoading: true, userInfo: {}},
);
