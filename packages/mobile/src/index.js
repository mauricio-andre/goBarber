import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';

// Desativado CodePush e OneSignal na refatoração deste projeto
// import CodePush from 'react-native-code-push';
// import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';
import { store, persistor } from './store';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.onReceived = (data) => {}; // eslint-disable-line

    this.onOpened = (notification) => {}; // eslint-disable-line

    this.onIds = (id) => {}; // eslint-disable-line

    // OneSignal.init('fe2bba88-2db5-4467-8706-8093617377ff');
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }

  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

// export default CodePush({
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
// })(App);
export default App;
