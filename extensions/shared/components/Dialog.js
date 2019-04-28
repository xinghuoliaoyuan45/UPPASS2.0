import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {getPixel} from '..';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {RkTheme} from 'react-native-ui-kitten';
import {ext} from '../../main/const';
/*eslint-disable*/
//  @inject('rootStore')
@observer
export class Dialog extends Component{

    /**
     * from @marongting Tel 13269798391
     * content 弹窗是否出现控制器
     */
    @observable isFrameShow = false;

    constructor(props){
        super(props);
       
    }
    
    frameShow =() =>{
        this.isFrameShow = !this.isFrameShow;
    }
    render(){
        const {title,content,isCancel,isSubmit,cancel,submit} = this.props;
        return(
            <View style={{
                position:'absolute'}}>
                {
                    this.isFrameShow && 
                    <View style={{width:width,height:height,
                        backgroundColor:RkTheme.currentTheme.colors.blackTransparent,
                        position:'absolute',
                        alignItems:'center',
                        justifyContent:'center'}}>
                        <View style={{
                            borderRadius:getPixel(10),
                            backgroundColor:RkTheme.currentTheme.colors.allBackground}}>
                            <View style={{
                                alignItems:'center',
                                justifyContent:'center',
                                borderBottomWidth:StyleSheet.hairlineWidth,
                                borderBottomColor:'#cdcdcd',
                               
                            }}>
                                <Text allowFontScaling={false} style={{
                                fontSize:getPixel(18),
                                fontWeight:'bold',
                                lineHeight:getPixel(20),
                                marginHorizontal:getPixel(100),
                                marginTop:getPixel(20)
                            }}>
                            {
                             title ? title : ext('tip')
                            }
                            
                            </Text>
                            <Text allowFontScaling={false} style={{
                                fontSize:getPixel(16),
                                lineHeight:getPixel(20),
                                marginVertical:getPixel(15),
                                marginHorizontal:getPixel(20),
                                maxWidth:getPixel(250),
                                textAlign:'center'
                            }}>
                            {
                                content ? content :ext('tipContent')
                            }
                            
                            </Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                }}>
                            {
                                isCancel &&
                                <TouchableOpacity style={{
                                    flex:1,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }} 
                                onPress={
                                    ()=>{
                                        this.isFrameShow = false;
                                        this.props.cancelFunc && this.props.cancelFunc()
                                    }
                                }>
                                <Text style={{
                                    fontSize:getPixel(20),
                                    color:'#1982FF',
                                    lineHeight:getPixel(45)
                                }}>
                                {
                                    cancel ? cancel :ext('cancel')
                                }
                                    
                                </Text>
                                </TouchableOpacity>
                            }
                            {
                                isCancel && isSubmit &&
                                <View style={{
                                    width:StyleSheet.hairlineWidth,
                                    height:getPixel(45),
                                    backgroundColor:'#cdcdcd'
                                }}></View>
                            }
                           {
                               isSubmit &&
                               <TouchableOpacity style={{
                                alignItems:'center',
                                justifyContent:'center',
                                flex:1,
                            }} onPress={
                                ()=>{
                                    this.isFrameShow = false;
                                    this.props.submitFunc && this.props.submitFunc();
                                }
                            }>
                            <Text style={{
                                fontSize:getPixel(20),
                                color:'#1982FF',
                                lineHeight:getPixel(45)
                            }}>
                            {
                                submit ? submit : ext('confirm')
                            }
                            </Text>
                            </TouchableOpacity>
                           }
                            
                            </View>
                        </View>
                  </View>
                }
            </View>
           
        )
    }
}