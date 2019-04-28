import React from 'react';

import {
    View,
    Text,
    ScrollView,
    NativeModules,
    NativeEventEmitter,
    TouchableOpacity,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import {toJS} from 'mobx';
import {getTitlePixel, getPixel, getFontPixel, Svgs} from '../../shared';
import NavigationView from '../components/NavigationView';
import {RkStyleSheet} from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import BluetoothCell from '../components/BluetoothCell';
const RNLockBridageManager = NativeModules.RNLockBridageManager;
const LockEmitter = new NativeEventEmitter(RNLockBridageManager);

@inject('rootStore')
@observer
export default class BluetoothScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const {lockStore} = this.props.rootStore.lockStore;
        this.lockStore = lockStore;

        this.state = {
            locksData: [],
        };


        this.LockBluetoothUIEmitter = LockEmitter.addListener(
            'LockUpdateBluetoothUI',
            (data) => {
                console.log('LockBluetoothEmitter  data', data);
            },
        );

        this.LockUIEmitter = LockEmitter.addListener(
            'LockUpdateLockUI',
            (emitterData) => {
                console.log('LockUpdateLockUI  data', emitterData);
                const type = emitterData.type;
                const data = emitterData.data;
                if (type === 1) {
                    this.lockStore.locksBluetoothData = [];
                    const locksArray = [];
                    data.forEach((lockItem) => {
                        lockItem.type = 1;
                        locksArray.push(lockItem);
                    });
                    this.lockStore.locksBluetoothData = locksArray;
                } else if (type !== 0) {
                    const locksArray = [];
                    const locksBluetoothData = toJS(this.lockStore.locksBluetoothData);
                    locksBluetoothData.forEach((lockItem) => {
                        if (lockItem.id === emitterData.lockId) {
                            lockItem.type = type;
                        }
                        locksArray.push(lockItem);
                    });
                    this.lockStore.locksBluetoothData = locksArray;
                }
            },
        );
        this.getlocksData();
    }

    mComponentWillUnmount() {
        this.LockBluetoothUIEmitter.remove();
        this.LockUIEmitter.remove();
    }
    render() {
        return (
            <View style={styles.root}>
                <NavigationView title='蓝牙开门' backClick={() => { console.log('返回'); }}/>
                <ScrollView style={{marginTop: getTitlePixel(64)}}>
                    {
                        toJS(this.lockStore.locksBluetoothData).map((item, index) => (
                            <BluetoothCell key={index}
                                itemData={item}
                                onPress={() => {
                                    // setTimeout(
                                    //     () => {
                                    //        let lockArray= toJS(this.lockStore.locksBluetoothData);
                                    //        lockArray[index].type = 3;
                                    //        this.lockStore.locksBluetoothData = lockArray;
                                    //      },
                                    //     6000
                                    //   );
                                    // console.log(item);
                                    RNLockBridageManager.openLock(item);
                                }}/>
                        ))
                    }
                </ScrollView>
                <TouchableOpacity style={
                    {
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: getPixel(20),
                    }}
                activeOpacity={1}
                onPress={() => {
                    // this.lockStore.locksBluetoothData=[];
                    // setTimeout(
                    //     () => {
                    //         this.getlocksData();
                    //      },
                    //     100
                    //   );
                    RNLockBridageManager.closeLocks();
                    RNLockBridageManager.scanLocks();
                }}>
                    <View style={{
                        marginBottom: getPixel(13),
                        width: getPixel(81),
                        height: getPixel(81),
                        borderRadius: getPixel(40.5),
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Svgs icon='bluetoothScan'
                            width={getPixel(60)}
                            height={getPixel(60)}
                            color='#B5B5B5'/>
                    </View>
                    <Text style={{
                        color: '#BFBFBF',
                        fontSize: getFontPixel(14),
                    }}>继续搜索
                    </Text>
                </TouchableOpacity>
                {this.renderStatusView(this.lockStore.screenStatus)}
            </View>
        );
    }

    getlocksData=() => {
        // this.lockStore.locksBluetoothData = [
        //     {
        //      name:'测试门禁1',
        //      type:1,
        //     },
        //     {
        //         name:'测试门禁2',
        //         type:1,
        //     }
        // ]
        this.lockStore.getLockTypeData('364', (res) => {
            RNLockBridageManager.setLocks(res.data, false);
            RNLockBridageManager.scanLocks();
        });
    }
}

const styles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        alignItems: 'center',
        color: theme.colors.loginHeader,
    },
}));
