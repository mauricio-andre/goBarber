import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import persistReducer from './persistReducer';
import rootReducer from './modules/rootReducer';
import rootSage from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleware = [sagaMiddleware];

const store = createStore(persistReducer(rootReducer), middleware);
const persistor = persistStore(store);

sagaMiddleware.run(rootSage);

export { store, persistor };
