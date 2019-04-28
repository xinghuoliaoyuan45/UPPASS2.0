import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { get } from 'lodash';

import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, BaseHeader, getTitlePixel } from '../../shared';
@inject('rootStore')
@observer
class UploadScreen extends BaseScreen {

    constructor(props) {
        super(props);
        const { UploadStore } = this.props.rootStore.mainStore;
        this.UploadStore = UploadStore;
        const { SegmentedStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
        const {params} = this.props.navigation.state;
        this.UploadStore.changeAccount(get(params,'id'));
    }

    componentDidMount(){
        this.refs.LoginInput.onChangeText(this.UploadStore.account);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { Keyboard.dismiss(); }} activeOpacity={1} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[RkTheme.currentTheme.colors.gradualStart,
                RkTheme.currentTheme.colors.gradualEnd]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={{ flex: 1 }} >
                    <Text style={{
                        marginTop: getTitlePixel(88),
                        color: 'white',
                        marginLeft: getPixel(25),
                        fontWeight: '600',
                        fontSize: getPixel(18)
                    }}>{ext('to_accout')}</Text>
                    <LoginInput ref='LoginInput' placeholder={ext('please_inout_accout')}
                        type='email'
                        onChange={(text) => {
                            this.UploadStore.changeAccount(text);
                        }} />
                    <LoginInput placeholder={ext('please_inout_money')}
                        type='email'
                        onChange={(text) => {
                            this.UploadStore.changeMoney(text);
                        }} />
                    <LoginInput placeholder={ext('please_inout_balance')}
                        type='email'
                        onChange={(text) => {
                            this.UploadStore.changeBlance(text);
                        }} />
                    <LoginInput placeholder={ext('please_inout_pwd')}
                        type='password'
                        onChange={(text) => {
                            this.UploadStore.changePassWord(text);
                        }} />
                    <Text onPress={() => {
                        this.UploadStore.sendMoney(()=>{
                            this.SegmentedStore.getAccountInfo();
                        });
                    }} style={{
                        width: getWidth() - getPixel(25) * 2,
                        marginLeft: getPixel(25),
                        height: getPixel(40),
                        backgroundColor: 'blue',
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: getPixel(40),
                        fontSize: getPixel(15),
                        marginTop: getPixel(40)
                    }}>{ext('confirm')}</Text>
                    <BaseHeader title={ext('send')} leftPress={this.goBack}
                        rightName={ext('send_history')} rightPress={()=>{
                            this.toScreen('SelectSpace');
                        }}/>
                </LinearGradient >
            </TouchableOpacity >
        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default UploadScreen;
