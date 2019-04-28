import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';
import BaseScreen from '../../BaseScreen';
import { get } from 'lodash';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import LinearGradient from 'react-native-linear-gradient';

import CommunityRow from '../components/CommunityRow';
import CommunitySpace from '../components/CommunitySpace';
import {
    Svgs, getPixel, getTitlePixel, getWidth, remove, USERJWTTOKEN,
    BaseHeader,
    load,
    USERINFO,
    save,
    ListDialog
} from '../../shared';
import { ext } from '../const';
import { getAccountInfo } from '../connect/request';
import MyItem from '../components/MyItem';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
const options = {
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
@inject('rootStore')
@observer
class MyScreen extends BaseScreen {

    @observable user = { name: '', tel: '' };

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        const { SegmentedStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
    }

    getAccountInfo = async () => {
        let id = await load(USERJWTTOKEN, '');
        let param = new URLSearchParams()
        param.append('id', id)
        getAccountInfo(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                this.user = { name: data.data.userName, tel: data.data.tel };
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    uploadPic = async (base64String) => {
        let userinfo = await load(USERINFO);
        //    console.log('console log for chrom userinfo',userinfo);
        //     // 下面将要把 base64 转换成formdata
        //     // 这里对base64串进行操作，去掉url头，并转换为byte
        //     let bytes = base64String;
        //     let array = [];
        //     for (let i = 0; i < bytes.length; i++) {
        //         array.push(bytes.charCodeAt(i));
        //     }
        //     let blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
        //     // 生成FormData对象
        let fd = new FormData();
        // 注：此处 file 应和后台接收参数匹配
        let file = {
            uri: base64String.uri,
            type: 'multipart/form-data',
            name: `${base64String.fileName}.jpg`,
        };
        fd.append('file', file);
        fd.append('userId', userinfo.user_id);
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let url = 'http://47.74.24.151:8080/set_profile_photo';
        // 加载中
        this.setState({
            loadingShow: true,
            loadingText: '图片上传中...',
        });
        // 添加请求头
        axios.post(url, fd, config)
            .then(response => {
                this.showToast('上传成功');
                this.SegmentedStore.getAccountInfo();
            })
            .catch((error) => {
                this.showToast('上传失败');
            });
    }

    openCamera = () => {
        ImagePicker.launchCamera(options, (response) => {
            this.uploadPic(response);
            // const timestamp = (new Date()).valueOf();
            // const data = get(response, 'data');
            // if (get(response, 'didCancel') !== true) {
            //     this.MineStore.upToken(data, timestamp);
            // }
        })
    }
    openPhotoLiarbry = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            // console.log('console log for chrom response', response);

            // console.log('console log for chrom aaaa', this.dataURLtoBlob(response.data));
            // console.log('console log for chrom bbb', this.blobToFile(this.dataURLtoBlob(response.data)
            //     , response.fileName));
            this.uploadPic(response);
            // const timestamp = (new Date()).valueOf();
            // const data = get(response, 'data');
            // if (get(response, 'didCancel') !== true) {
            //     this.MineStore.upToken(data, timestamp);
            // }
        })
    }

    mComponentDidMount = () => {
        this.getAccountInfo();
    }

    render() {
        return (
            <LinearGradient
                colors={['#E3E5E8',
                    '#E3E5E8']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{ flex: 1 }} >
                <StatusBar barStyle='light-content' />
                <ScrollView style={{
                    flex: 1
                }}>
                    <View style={{
                        width: getWidth(),
                        height: getPixel(265),
                        backgroundColor: '#022047'
                    }}>
                        <FastImage style={{
                            width: getPixel(90),
                            height: getPixel(90),
                            backgroundColor: 'white',
                            borderRadius: 100,
                            borderColor: '#f0a100',
                            borderWidth: 1,
                            position: 'absolute',
                            bottom: getPixel(37),
                            left: getPixel(27)
                        }} source={{ uri: 'http://47.74.24.151:8080' + get(this.SegmentedStore, 'userInfo.profilePhoto', '') }}
                            resizeMode={FastImage.resizeMode.stretch}>
                            <TouchableOpacity onPress={() => {
                                this.refs.listDialog.showListDialog();
                            }} style={{
                                width: getPixel(90),
                                height: getPixel(90),
                            }}>

                            </TouchableOpacity>
                        </FastImage>
                        <View style={{
                            position: 'absolute',
                            left: getPixel(152),
                            bottom: getPixel(61)
                        }}>
                            {this.user.name ? <Text style={{
                                color: 'white',
                                fontSize: getPixel(16),
                                fontWeight: RkTheme.currentTheme.weight.Semibold,
                            }}>{this.user.name}
                            </Text> : null}

                            <Text style={{
                                color: 'white',
                                fontSize: getPixel(14),
                                fontWeight: RkTheme.currentTheme.weight.Semibold,
                                marginTop: getPixel(10)
                            }}>{this.user.tel}
                            </Text>
                        </View>
                    </View>
                    <MyItem navigation={this.props.navigation} />
                </ScrollView>
                <ListDialog
                    ref='listDialog'
                    listData={[ext('goCamera'), ext('goCameraLibrary'), ext('cancel')]}
                    firstRow={this.openCamera}
                    secondRow={this.openPhotoLiarbry}
                    color={true}
                    isBottom={true} />
                <BaseHeader leftName={ext('home')} leftType='back' leftPress={this.goBack}
                    title={ext('my')} />
            </LinearGradient>
        );
    }
}

export default MyScreen;
