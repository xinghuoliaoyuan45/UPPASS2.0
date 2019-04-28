import React from 'react';
import {
    StatusBar,
    Keyboard,
    TouchableOpacity,
    View,
    Text,
    ScrollView
} from 'react-native';
import { observer, inject } from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import { ext } from '../const';
import { RkTheme } from 'react-native-ui-kitten';
import LoginHeader from '../components/LoginHeader';
import LoginInput from '../components/RegistInput';
import LoginNext from '../components/LoginNext';
import LoginOther from '../components/RegistOther';
import xieyi from './xieyi.json'
import xieyihan from './xieyihan.json'
import LinearGradient from 'react-native-linear-gradient';
import { getWidth, BaseHeader, getTitlePixel, getPixel, getHeight, load, LANGUAGE } from '../../shared';
@inject('rootStore')
@observer
class RegistScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state={
            language:'zh'
        }
    }
    mComponentWillMount = async() => {
        let language = await load(LANGUAGE,'zh');
        this.setState({
            language:language
        });
    }

    changeContent = (text) => {

    }

    changeCode = (text) => {

    }


    getSmsCode = () => {
        // this.RegistStore.getSmsCode();
    }

    registBtnAction = () => {
        this.RegistStore.postRegistInfo(() => {
            this.toScreen('Main');
        });
    }

    clickServiceAgreement() {

    }

    clickTermAndConditions() {

    }

    render() {
        let file = null;
        if(this.state.language=='zh'){
            console.log('console log for chrom this.state.language',this.state.language);
            file=xieyi;
        }else{
            file=xieyihan;
        }
        return (
            <LinearGradient colors={[RkTheme.currentTheme.colors.gradualEnd,
            RkTheme.currentTheme.colors.gradualEnd]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{ flex: 1 }} >
                <StatusBar barStyle='light-content' />
                <ScrollView style={{
                    flex: 1,
                    marginTop:getTitlePixel(64)
                }}>
                    <Text style={{
                        fontSize: getPixel(16),
                        color: 'white',
                        width: getWidth() - getPixel(40),
                        marginLeft: getPixel(20),
                        lineHeight: getPixel(25)
                    }}>
                        {file.value + file.valuebottom}
                    </Text>
                </ScrollView>
                <BaseHeader
                    title={ext('kubanAgreement')}
                    leftType='back'
                    leftPress={this.goBack} />
            </LinearGradient >

        );
    }
}
// const styles = RkStyleSheet.create(theme => ({
//     root: {
//         backgroundColor: theme.colors.gradualStart
//     }
// }));
export default RegistScreen;
