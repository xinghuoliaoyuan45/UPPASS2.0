import {createStackNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen';
import PhoneCodeScreen from './PhoneCodeScreen';
import EmailLoginScreen from './EmailLoginScreen';
import RegistScreen from './RegistScreen';
import XieYiScreen from './XieYiScreen';
import ForgetScreen from './ForgetScreen';

import ForgetEmailPwdScreen from './ForgetEmailPwdScreen';
import {Animated, Easing} from 'react-native';
const AuthNavigator = createStackNavigator({
    
    Login: LoginScreen,
    PhoneCode: PhoneCodeScreen,
    EmailLogin: EmailLoginScreen,
    Regist: RegistScreen,
    ForgetPwd: ForgetScreen,
    XieYi:XieYiScreen
}, {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig,
});
function transitionConfig() {
    return {
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        },
    };
}
export default AuthNavigator;
