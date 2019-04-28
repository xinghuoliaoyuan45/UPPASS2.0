import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {observer, inject} from 'mobx-react';
import BaseScreen from '../../BaseScreen';
import {remove, Dialog, USERJWTTOKEN} from '../../shared';
/*eslint-disable*/
@inject('rootStore')
@observer
class HomeScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const { MainStore } = this.props.rootStore.mainStore;
        const { LoginStore } = this.props.rootStore.authStore;
        this.MainStore = MainStore;
        this.LoginStore = LoginStore;
    }
   
    render() {
        console.log('console log for chrom HomeScreen', this.props);
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    this.showToast("显示toast");
                }} style={{
                    width: 100, height: 100,
                    backgroundColor: '#999',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>显示toast</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    remove(USERJWTTOKEN);
                    this.props.navigation.navigate('Auth');
                }} style={{
                    width: 100, height: 100,
                    backgroundColor: '#999',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 100
                }}>
                    <Text>退出登录</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{marginVertical:100}}
                    onPress={
                        ()=>{
                            /**
                             * from @marongting Tel 13269798391
                             * content 当子组件中的数据来源于inject时，调用子组件
                             * 的属性时需要使用如下方法：this.refs.子组件ref值
                             * .wrappedInstance.子组件方法
                             */
                            this.refs.Dialog.frameShow()
                        }
                    }>
                    <Text>请点击</Text>
                </TouchableOpacity>

               {/* 
            弹框组件Dialog
             */}
                <Dialog 
                    ref='Dialog'
                    // title='标题'           //弹出框头部内容    
                    // content='不再玩会吗'    //弹出框内容
                    // cancel='狠心离开'        //弹出框左侧选项内容
                    // submit='继续'          //弹出框右侧选项内容
                    isCancel={true}           //弹出框左侧选项控制器
                    isSubmit={true}            //弹出框右侧选项控制器
                    cancelFunc = {            //弹出框左侧选项回调方法
                        ()=>{ 
                            // this.MainStore.isCancelFunc();
                        }
                    }
                    submitFunc = {              //弹出框右侧选项回调方法
                        ()=>{
                            this.MainStore.isSubmitFunc()
                        }
                    }
                    />
                <Text onPress={()=>{
                    this.props.navigation.navigate('Auth');
                }}>返回Splash</Text>
            </View>

        );
    }

}
export default HomeScreen;
