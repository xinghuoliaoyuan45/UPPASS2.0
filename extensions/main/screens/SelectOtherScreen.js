import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {observer, inject} from 'mobx-react';
import {RkTheme} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import {BaseHeader, getTitlePixel, getPixel} from '../../shared';
import OtherScreen from './OtherScreen';
import {SegmentedView} from 'teaset';
import SegmentedTitle from '../components/SegmentedTitle';
import {ext} from '../const';
@inject('rootStore')
@observer
class SelectOtherScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { SegmentedStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
    }
    componentDidMount(){
        this.SegmentedStore.getAccountInfo();
    }
    /*eslint-disable*/
    render() {
        return (
            <OtherScreen navigation={this.props.navigation}/>
        );
    }
}

export default SelectOtherScreen;
