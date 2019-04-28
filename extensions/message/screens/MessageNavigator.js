import {createStackNavigator} from 'react-navigation';
import MessageListScreen from './MessageListScreen';
import {Animated, Easing} from 'react-native';


const MessageNavigator = createStackNavigator({
    MessageList: MessageListScreen,
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
export default (MessageNavigator);
