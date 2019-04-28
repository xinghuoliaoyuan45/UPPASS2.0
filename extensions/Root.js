import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import {
  View,
  DeviceEventEmitter,
  StyleSheet
} from 'react-native';

import Navigation from './main/screens/MainNavigator';
import Toast from 'react-native-easy-toast';
import { SafeAreaView } from 'react-navigation';
// 获取mobx-store实例
import store from './mobx';
import MessageToast from './shared/components/MessageToast';
export default class App extends Component {

  componentDidMount() {
    
    this.listener = DeviceEventEmitter.addListener('showToast', (msg) => {
      this.refs.toast.show(msg, 1000);
    });
    this.listenerMsg = DeviceEventEmitter.addListener('showMsg', (msg) => {
      this.refs.msgToast.show(msg);
  });
  };

  componentWillUnmount() {
    this.listener && this.listener.remove();
    this.listenerMsg && this.listenerMsg.remove();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider rootStore={store}>
          <Navigation />
        </Provider>
        <Toast ref="toast" position='center'/>
        <MessageToast ref='msgToast'/>
      </View>
    );
  }
}
