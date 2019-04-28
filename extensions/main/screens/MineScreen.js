import React, { Component } from 'react';
import { TabView } from 'teaset';
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
class MineScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { MainStore } = this.props.rootStore.mainStore;
        this.MainStore = MainStore;
    }

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#f0f' }}>
            </View>

        );
    }

}
export default MineScreen;