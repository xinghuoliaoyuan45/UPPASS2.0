import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import BaseScreen from '../../BaseScreen';
import {load, USERJWTTOKEN, DefaultTheme, LANGUAGE, initI18nLocale} from '../../shared';
import {RkTheme} from 'react-native-ui-kitten';
class SplashScreen extends BaseScreen {
    mComponentDidMount = async () => {
        RkTheme.setTheme(DefaultTheme);
        const token = await load(USERJWTTOKEN, '');
        const language = await load(LANGUAGE, 'zh');
        initI18nLocale(language);
        if (token) {
            this.toScreen('Main');
            // this.toScreen('Contact');
            // ContactScreen
        } else {
          //  this.toScreen('Login');
          this.toScreen('Main');
        }
    }
    render() {
        return (
            <SafeAreaView style={[StyleSheet.absoluteFill, {flex: 1, backgroundColor: 'white'}]}
                forceInset={{top: 'always', bottom: 'never'}}>
                <View style={{flex: 1}}>
                    <Text onPress={async () => {
                    }}>广告页
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    1
}
export default SplashScreen;
