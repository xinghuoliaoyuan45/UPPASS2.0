import React, {Component} from 'react';
import {
    Text,
    DeviceEventEmitter,
} from 'react-native';
import {LOADING, NULL, ERROR} from './mobx/BaseStore';
import {toastRequestError, Lottie} from './shared';
import {get} from 'lodash';
class BaseScreen extends Component {
    /**
     * from @zhaojian Tel 15147088209
     * content 网络请求中，请求失败，空数据的界面展示。只用于页面获取数据，不用于提交数据
     */
    renderStatusView = (status) => {
        if (status === LOADING) {
            return (<Lottie/>);
        }
        if (status === NULL) {
            return (<Text>空数据页面</Text>);
        }
        if (status === ERROR) {
            return (<Text>错误页面</Text>);
        }
        return null;
    }

    toScreen = (screenName,params) => {
        console.log('console log for chrom this.props.navigation',this.props.navigation);
        if (this.props.navigation) {
            this.props.navigation.navigate(screenName,params);
        }
    }

    goBack = () => {
        if (this.props.navigation) {
            console.log('console log for chrom this.props.navigation', this.props.navigation);
            this.props.navigation.goBack();
        }
    }

    /**
     * from @zhaojian Tel 15147088209
     * content 弹出封装默认toast
     * params 网络请求返回数据
     */
    toastError = (res) => {
        toastRequestError(res);
    }

    /**
     * from @zhaojian Tel 15147088209
     * content 弹出toast
     */
    showToast = (msg) => {
        DeviceEventEmitter.emit('showToast', msg);
    }
    showMsgToast = (msg) => {
        DeviceEventEmitter.emit('showMsg', msg);
    }

    componentWillMount() {
        this.mComponentWillMount();
    }
    mComponentWillMount = () => {
        // do something
    }
    componentWillUpdate() {
        this.mComponentWillUpdate();
    }
    mComponentWillUpdate = () => {
        // do something
    }
    componentWillReceiveProps(state) {
        this.mComponentWillReceiveProps(state);
    }
    mComponentWillReceiveProps = () => {
        // do something
    }
    componentWillUnmount() {
        console.log('console log for chrom componentWillUnmount');
        this.mComponentWillUnmount();
    }
    mComponentWillUnmount = () => {
        // do something
    }
    componentDidMount() {
        if (this.props.navigation) {
            console.log('console log for chrom screenName', get(this.props.navigation, 'state.routeName', ''));
            console.log('console log for chrom screenParams', get(this.props.navigation, 'state.params', ''));
        }
        this.mComponentDidMount();
        this.mComponentDidMount();
    }
    mComponentDidMount = () => {
        // do something

    }
    componentDidUpdate() {
        this.mComponentDidUpdate();
    }
    mComponentDidUpdate = () => {
        // do something
    }
    componentDidCatch() {
        this.mComponentDidCatch();
    }
    mComponentDidCatch = () => {
        // do something
    }
}
export default BaseScreen;
