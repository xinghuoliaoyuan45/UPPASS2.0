import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';
const { width, height } = Dimensions.get('window');
import BaseScreen from '../../BaseScreen';

/*eslint-disable*/
@inject('rootStore')
@observer
class MainScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { TestStore } = this.props.rootStore.mainStore;
        this.TestStore = TestStore;

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>{this.TestStore.number}</Text>
                <TouchableOpacity onPress={() => {
                    this.TestStore.add();
                }} style={{
                    width: 100, height: 100,
                    backgroundColor: '#999',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>加</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.TestStore.reduce();
                }} style={{
                    width: 100, height: 100,
                    backgroundColor: '#999',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 100
                }}>
                    <Text>减</Text>
                </TouchableOpacity>
            </View>
        );
    }

}
export default MainScreen;
