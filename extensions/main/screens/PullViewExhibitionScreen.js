import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';


import {getTitlePixel, screenWidth, PullFlatList} from '../../shared';

export default class PullViewExhibitionScreen extends Component {
    constructor(props) {
        super(props);

        this.data = [];
        this.configData();
        this.onPullRelease = this.onPullRelease.bind(this); // 触发网络请求
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    width: screenWidth,
                    backgroundColor: 'yellow',
                    height: getTitlePixel(64),
                }}/>
                <PullFlatList
                    onPullRelease={this.onPullRelease}
                    data={this.data}
                    renderItem={({item}) => (
                        <Text style={styles.textStyle}>{item}</Text>
                    )}/>
            </View>
        );
    }

    configData=() => {
        const index = 30;
        for (let i = 0; i < index; i++) {
            this.data.push(`数据数据数据${i}`);
        }
    }

    onPullRelease(resolve) {
        console.log('开始请求数据');
        setTimeout(() => {
            resolve();
        }, 3000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    textStyle: {
        width: screenWidth,
        height: 30,
        textAlign: 'center',
    },
});

