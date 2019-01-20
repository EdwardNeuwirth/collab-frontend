export const API = Symbol('API'); //ask what this

export default baseURL => store => next => action => {
  let token = store.getState().jwt;
  if (action[API] ){
    console.log('THIS IS THE ACTION [API]', action[API].body);
    const options = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token && `Bearer ${token}`,
        ...action[API].headers
      },
      'method': action[API].method,
      'body': JSON.stringify(action[API].body)
    };
    fetch(`${baseURL}${action[API].path}`, options)
      .then(res => res.json())
      .then(res => {
        // Grab the token from the body and sotre it in the store
        token = res.jwt;
        store.dispatch({type: 'SET_TOKEN', data: token});
        delete res.jwt;
        return res;
      })
      .then(data => {
        const newAction = {
          ...action,
          type: action.type + '_SUCCESS',
          data
        };
        delete newAction[API];
        store.dispatch(newAction);
      });
  }
  next(action);
};
