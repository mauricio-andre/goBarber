import { createStore, compose, applyMiddleware } from 'redux';

export default (reducer, middleware) => {
  const enhancer = __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(...middleware))
    : applyMiddleware(...middleware);
  return createStore(reducer, enhancer);
};
