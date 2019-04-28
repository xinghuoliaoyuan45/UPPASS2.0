import React, {Component} from 'react';
import {TabView, Theme} from 'teaset';
import {StyleSheet} from 'react-native';
import {observer, inject} from 'mobx-react';
import {SafeAreaView} from 'react-navigation';
import ScanScreen from './ScanScreen';
import BluetoothScreen from './BluetoothScreen';
import QRcodeScreen from './QRcodeScreen';
import BoorPasswordScreen from './BoorPasswordScreen';
import {ext} from '../const';
import {screenWidth, getFontPixel, getPixel, Svgs} from '../../shared';
/*eslint-disable*/
@inject('rootStore')
@observer
class LockNavigationTabBar extends Component {
    constructor(props) {
        super(props);
        const { lockStore } = this.props.rootStore.lockStore;
        this.lockStore = lockStore;

        Theme.set({
            tvBarBtnWidth:screenWidth/this.lockStore.tabList.lengt,
            tvBarBtnActiveTitleColor:'#1C1C1C',
            tvBarBtnTitleColor:'#B5B5B5',
            tvBarBtnTextFontSize:getFontPixel(13),
            tvBarBtnActiveTextFontSize:getFontPixel(13)
        })
    }

    

    render() {
        let itemList = [];
        this.lockStore.tabList.forEach(element => {
            itemList.push(
            <TabView.Sheet
                key={element.name}
                title={ext(element.name)}
                icon={
                        <Svgs   icon={element.icon} 
                                width={getPixel(element.iconSize.width)} 
                                height={getPixel(element.iconSize.height)} 
                                color='#B5B5B5'/>
                    }
                activeIcon={
                        <Svgs   
                                icon={element.activeIcon} 
                                width={getPixel(element.iconSize.width)} 
                                height={getPixel(element.iconSize.height)} 
                                color='#1C1C1C'/>}
                titleStyle={{color:'#B5B5B5'}}
                activeTitleStyle={{color:'#1C1C1C'}}
            >
                {this.getPage(element.name)}
            </TabView.Sheet>);
        });
        return (
            <SafeAreaView style={[StyleSheet.absoluteFill, { flex: 1,backgroundColor:'#F7F7F7' }]}
                forceInset={{ top: 'never', bottom: 'always' }}>              
             <TabView style={{flex:1}} type='projector' 
                            barStyle={{backgroundColor:'#F7F7F7',borderTopColor: '#F7F7F7',}}>
                    {itemList}
                </TabView>
            </SafeAreaView>
            
        );
    }

    getPage = (name) => {
        if (name === 'Scan') {
            return (<ScanScreen/>);
        }
        if (name === 'Bluetooth') {
            return (<BluetoothScreen />);
        }
        if (name === 'QRcode') {
            return (<QRcodeScreen />);
        }
        if (name === 'Open_door_password') {
            return (<BoorPasswordScreen />);
        }
        
    }

}
export default LockNavigationTabBar;
