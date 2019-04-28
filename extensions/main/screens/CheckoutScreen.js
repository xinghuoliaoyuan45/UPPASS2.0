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
import { RkTheme } from 'react-native-ui-kitten';
import LoginInput from '../components/LoginInput';
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, getPixel, BaseHeader, getTitlePixel } from '../../shared';
@inject('rootStore')
@observer
class CheckoutScreen extends BaseScreen {

    constructor(props) {
        super(props);
        const { CheckoutStore } = this.props.rootStore.mainStore;
        this.CheckoutStore = CheckoutStore;
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
                    }}>{ext('l_to_b')}</Text>
                    <LoginInput placeholder={ext('please_inout_balance')}
                        type='email'
                        onChange={(text) => {
                            this.CheckoutStore.changeBlance(text);
                        }} />
                    <LoginInput placeholder={ext('please_inout_pwd')}
                        type='password'
                        onChange={(text) => {
                            this.CheckoutStore.changePassWord(text);
                        }} />
                    <Text onPress={() => {
                        this.CheckoutStore.checkMoney();
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
                    }}>{ext('look_back')}</Text>
                    <BaseHeader title={ext('credit_check')} leftPress={this.goBack}
                        rightName={ext('check_history')} rightPress={()=>{
                            this.toScreen('SelectSpace3');
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
export default CheckoutScreen;
