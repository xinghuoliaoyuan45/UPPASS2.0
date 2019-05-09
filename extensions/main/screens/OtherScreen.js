import React from 'react';
import { Platform, View, Text, TouchableOpacity, StatusBar, 
    DeviceEventEmitter,ScrollView } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import { get } from 'lodash';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import LinearGradient from 'react-native-linear-gradient';
import JPushModule from 'jpush-react-native';
import CommunityRow from '../components/CommunityRow';
import CommunitySpace from '../components/CommunitySpace';
import {
    Svgs, getPixel, getTitlePixel,
    getWidth, remove, USERJWTTOKEN,
    getHeight, HomeHeader, load
} from '../../shared';
import { ext } from '../const';
import { SET_REG_ID, getGameInfo } from '../connect/request';
@inject('rootStore')
@observer
class OtherScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        const { SegmentedStore,OtherStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
        this.OtherStore = OtherStore;
    }

    mComponentDidMount = async () => {
        this.OtherStore.getOtherData();
        let userId = await load(USERJWTTOKEN, '');
        JPushModule.getRegistrationID((registrationId) => {
            let param = new URLSearchParams()
            param.append('userId', userId);
            param.append('regId', registrationId);
            SET_REG_ID(param).then((res) => {
                console.log('console log for chrom res', res);
            }).catch();
            // this.MainStore.setDeviceTokens(registrationId, Platform.OS);
        })
        if (Platform.OS === 'android') {
            JPushModule.notifyJSDidLoad((resultCode) => {
                if (resultCode === 0) { }
            });
        }
        // 接收推送通知
        JPushModule.addReceiveNotificationListener((map) => {
            // this.MsgData = JSON.parse(map.extras);
            // // this.parseJpushMessage(this.MsgData);
            // console.log('console log for chrom 111111111', map.extras);
            // console.log('console log for chrom this.MsgData', this.MsgData);
            // let id = get(this.MsgData, 'id', 0);
            // if (!id) {
            //     this.toScreen('GameResultList', {
            //         game: { data: { instance: { id: get(this.MsgData, 'gameId', 0) } } }
            //     });
            // } else {
            //     this.toScreen('BecarefulInfo', { id: get(this.MsgData, 'id', 0) });
            // }
            console.log('console log for chrom notification .......', map);
            if (Platform.OS === 'android') {
                this.MsgData = JSON.parse(map.extras);
            } else {
                this.MsgData = map.extras;
            }
            console.log('console log for chrom notification .......', this.MsgData);
            this.parseJpushMessage(this.MsgData);
        });
        // 打开通知
        JPushModule.addReceiveOpenNotificationListener((map) => {
            // this.toMsgScreen(JSON.parse(map.extras));
            // this.MsgData = JSON.parse(map.extras);
            // let id = get(this.MsgData, 'id', 0);
            // if (!id) {
            //     this.toScreen('GameResultList', {
            //         game: { data: { instance: { id: get(this.MsgData, 'gameId', 0) } } }
            //     });
            // } else {
            //     this.toScreen('BecarefulInfo', { id: get(this.MsgData, 'id', 0) });
            // }
            if (Platform.OS === 'android') {
                this.MsgData = JSON.parse(map.extras);
            } else {
                this.MsgData = map.extras;
            }
            this.toMsgScreen(this.MsgData);
        });
        this.listener = DeviceEventEmitter.addListener('clickMsgToast', (msg) => {
            this.toMsgScreen(this.MsgData);
        });
    }

    parseJpushMessage = (data) => {
        this.showMsgToast(data.title);
    }
    toMsgScreen = (data) => {
        let type = get(data,'type','');
        let id = get(data, 'id', 0);
        if (type === '2') {
            let param = new URLSearchParams()
            param.append('id', get(data, 'gameId', ''))
            getGameInfo(param).then((res) => {
                let data = get(res, 'data');
                let rspCode = get(data, 'rspCode');
                if (rspCode === '000000') {
                    this.game = data;
                    this.loading = '';
                    this.toScreen('GameResultList', {
                        game: this.game
                    });
                } else {
                    toastRequestError(data);
                    this.loading = '';
                }
            }).catch();

        } else if(type === '1') {
            this.toScreen('BecarefulInfo', { id: get(data, 'id', 0) });
        }else if(type === '3'){
           // this.toScreen('GameList')
           let param = new URLSearchParams()
            param.append('id', get(data, 'gameId', ''))
            getGameInfo(param).then((res) => {
                let data = get(res, 'data');
                let rspCode = get(data, 'rspCode');
                if (rspCode === '000000') {
                    this.game = data;
                    this.loading = '';
                    this.toScreen('GameInfo', {
                         ispart:0,
                    });
                } else {
                    toastRequestError(data);
                    this.loading = '';
                }
            }).catch();
        }
    }
    
    checkdata = (data,number) =>{
        if(data){
            data = data.toFixed(number);
        }else{
            data = 0;
        }
        return data;
    }
    getTitleItems = () =>{
        let array = [];
        let frbcMultiply = this.checkdata(get(this.OtherStore.otherData,'frbcMultiply',null),2);
        let ethMultiply = this.checkdata(get(this.OtherStore.otherData,'ethMultiply',null),2);
        let btcMultiply = this.checkdata(get(this.OtherStore.otherData,'btcMultiply',null),2);
        let frbcPrice = this.checkdata(get(this.OtherStore.otherData,'frbcPrice',null),2);
        let ethPrice = this.checkdata(get(this.OtherStore.otherData,'ethPprice',null),2);
        let btcPrice = this.checkdata(get(this.OtherStore.otherData,'btcPrice',null),2);
        let btcNumber = this.checkdata(get(this.OtherStore.otherData,'btcNumber',null),8);
        let ethNumber = this.checkdata(get(this.OtherStore.otherData,'ethNumber',null),8);
        let frbcNumber = this.checkdata(get(this.OtherStore.otherData,'frbcNumber',null),8);
        let otherData = [
            {
                name:'FRBC',
                price:frbcPrice,
                number:frbcNumber,
                mulity:frbcMultiply
            },{
                name:'BTC',
                price:btcPrice,
                number:btcNumber,
                mulity:btcMultiply

            },{
                name:'ETH',
                price:ethPrice,
                number:ethNumber,
                mulity:ethMultiply

            }
        ]
        console.log('console log for chrom otherData',toJS(otherData));
        for(let i = 0;i<otherData.length;i++){
           array.push(
            <TouchableOpacity style={[{
                width:getWidth()-getPixel(69),
                marginLeft:getPixel(36),
               backgroundColor:'rgba(22, 44, 87, 1)',
               marginTop:getPixel(3)
           },i===0 && {marginTop:getPixel(11)}]} 
           activeOpacity={1} onPress={()=>{
            this.toScreen('AssetConfirm',{
               data:otherData[i]
            });
           }}>
           <View style={{
                width:getWidth()-getPixel(69),
               marginTop:getPixel(10),
               flexDirection:'row',
               justifyContent:'space-between',
               alignItems:'center',
               paddingHorizontal:getPixel(17)
           }}>
           <Text style={{
               color:'white',
               fontSize:getPixel(10),
               fontWeight:RkTheme.currentTheme.weight.Regular
           }}>{get(otherData[i],'name')}</Text>
            <Text style={{
               color:'white',
               fontSize:getPixel(10),
               fontWeight:RkTheme.currentTheme.weight.Regular
           }}>{get(otherData[i],'number')}</Text>
           </View>
           <View style={{
                width:getWidth()-getPixel(69),
               marginBottom:getPixel(10),
               marginTop:getPixel(6),
               flexDirection:'row',
               justifyContent:'space-between',
               alignItems:'center',
               paddingHorizontal:getPixel(17)
           }}>
           <Text style={{
               color:'#8F8F8D',
               fontSize:getPixel(10),
               fontWeight:RkTheme.currentTheme.weight.Regular
           }}>{`= $${get(otherData[i],'price')}`}</Text>
            <Text style={{
               color:'#8F8F8D',
               fontSize:getPixel(10),
               fontWeight:RkTheme.currentTheme.weight.Regular
           }}>{`= $${get(otherData[i],'mulity')}`}</Text>
           </View>
           </TouchableOpacity>
           )
        }
        return array;
    }

    render() {
        let itemList = [];
        let data = [ext('from_history'),
        ext('get_history'),
        ext('check_history'),
        ext('Share'),
        ext('contact'),
        ext('Becareful'),
        // ext('setting'),
        ext('logout')];
        let allMoney = get(this.OtherStore.otherData,'allMoney',null);
        if(allMoney){
            allMoney = allMoney.toFixed(2);
        }
        data.forEach((item) => {
            itemList.push(
                <TouchableOpacity onPress={() => {
                    this.setState({
                        show: false
                    });
                    if (item == ext('logout')) {
                        remove(USERJWTTOKEN);
                        this.toScreen('Login');
                    }
                    if (item == ext('from_history')) {
                        this.toScreen('SelectSpace2');
                    }
                    if (item == ext('get_history')) {
                        this.toScreen('SelectSpace1');
                    }
                    if (item == ext('check_history')) {
                        this.toScreen('SelectSpace3');
                    }
                    if (item == ext('Share')) {
                        this.toScreen('Share');
                    }
                    if (item == ext('contact')) {
                        this.toScreen('Contact');
                    }
                    if (item == ext('Becareful')) {
                        this.toScreen('Becareful');
                    }
                    // if (item == ext('setting')) {
                    //     this.toScreen('Setting');
                    // }
                }} style={{
                    height: getPixel(40), flex: 1,
                    justifyContent: 'center',
                    paddingLeft: getPixel(10),
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray'
                }}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            );
        });
        return (
            <View
                style={{ flex: 1, backgroundColor: RkTheme.currentTheme.colors.gradualStart }} >
                <StatusBar barStyle='light-content' />

                <ScrollView style={{
                    flex: 1,
                    marginTop: getTitlePixel(40),

                }}>
                    <View style={{
                        width: getWidth()
                    }}>
                        <View style={{
                            // marginTop: getTitlePixel(44),
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between', width: getWidth(),
                            paddingHorizontal: getPixel(20), overflow: 'visible',

                        }}>
                            <Svgs onPress={() => {
                                this.toScreen('My');
                            }} style={{ marginRight: getPixel(10) }}
                                icon={'icon_mineTop'} color={'white'} size={getPixel(24)} />
                            <Svgs onPress={() => {
                                this.setState({
                                    show: !this.state.show
                                });
                            }} icon={'menue'} size={getPixel(24)} />
                        </View>
                        <View style={{
                            width:getWidth()-getPixel(69),
                            height:getPixel(77),
                            marginLeft:getPixel(36),
                            borderColor:'white',
                            borderWidth:getPixel(5),
                            marginTop:getPixel(23)
                        }}>
                        <View style={{
                            position:'absolute',
                           width:(getWidth()-getPixel(69))/3,
                           height:getPixel(8),
                           backgroundColor:RkTheme.currentTheme.colors.gradualStart,
                           top:getPixel(-5),
                           left:(getWidth()-getPixel(69))/3
                        }} />
                         <View style={{
                            position:'absolute',
                           width:(getWidth()-getPixel(69))/3,
                           height:getPixel(8),
                           backgroundColor:RkTheme.currentTheme.colors.gradualStart,
                           bottom:getPixel(-5),
                           left:(getWidth()-getPixel(69))/3
                        }} />
                        <View style={{
                            position:'absolute',
                           width:getPixel(8),
                           height:getPixel(77)/3,
                           backgroundColor:RkTheme.currentTheme.colors.gradualStart,
                           bottom:getPixel(77)/3,
                           left:getPixel(-5)
                        }} />
                        <View style={{
                            position:'absolute',
                           width:getPixel(8),
                           height:getPixel(77)/3,
                           backgroundColor:RkTheme.currentTheme.colors.gradualStart,
                           bottom:getPixel(77)/3,
                           right:getPixel(-5)
                        }} />
                        <Text style={{
                            flex:1,
                            lineHeight:getPixel(38),
                            fontSize:getPixel(11),
                            color:'white',
                            paddingLeft:getPixel(17),
                            fontWeight:RkTheme.currentTheme.weight.Regular,
                            textAlign:'left'
                        }}>{ext('zongzichan')}</Text>
                         <Text style={{
                            flex:1,
                            lineHeight:getPixel(38),
                            fontSize:getPixel(13),
                            color:'white',
                            fontWeight:RkTheme.currentTheme.weight.Regular,
                            paddingHorizontal:getPixel(14),
                            textAlign:'right'
                        }}>{`= $${allMoney}`} </Text>
                        </View>
                        {this.getTitleItems()}
                    </View>

                    <CommunitySpace navigation={this.props.navigation} />
                    {this.state.show ? <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                show: false
                            })
                        }}
                        activeOpacity={1} style={{
                            position: 'absolute',
                            width: getWidth(),
                            backgroundColor: '#00000000',
                            height: getHeight(),

                        }}>
                        <View style={{
                            position: 'absolute',
                            width: getPixel(120),
                            backgroundColor: 'white',
                            top: getPixel(50),
                            right: getPixel(10),
                            borderRadius: getPixel(4)
                        }}>
                            {itemList}
                        </View>
                    </TouchableOpacity> : null}
                </ScrollView>
                <HomeHeader leftType='none' />
            </View>
        );
    }
}

export default OtherScreen;
