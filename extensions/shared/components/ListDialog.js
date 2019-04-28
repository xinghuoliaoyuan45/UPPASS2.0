import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {getPixel, getWidth, getBottomPixel} from '..';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {RkTheme} from 'react-native-ui-kitten';
import {ext} from '../const';
const {width, height} = Dimensions.get('window');
@observer
export class ListDialog extends Component {
    @observable show = false;
    showListDialog = () => {
        this.show = !this.show;
    }
    renderItemNodes = () => {
        const {listData, color} = this.props;
        if (listData) {
            this.data = listData;
        } else {
            this.data = [ext('allHasRead'), ext('deleteHasRead'), ext('cancel')];
        }
        const itemNodes = this.data.map((data, index) => {
            if (index === this.data.length - 2 && color) {
                this.dataColor = RkTheme.currentTheme.colors.deleteMessage;
            } else {
                this.dataColor = RkTheme.currentTheme.colors.spaceNumber;
            }
            return (
                <TouchableOpacity style={[{
                    width: getWidth(),
                    height: getPixel(53),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, index !== (this.data.length - 1) && {
                    borderBottomColor: RkTheme.currentTheme.colors.searchHeaderBottomBorder,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                },
                ]}
                activeOpacity={1}
                onPress={() => { this.click(index); }}
                key={index}>
                    <Text style={{
                        color: this.dataColor,
                        fontSize: getPixel(18),
                        fontWeight: RkTheme.currentTheme.weight.Light,
                    }}>{data}
                    </Text>
                </TouchableOpacity>
            );
        });
        return (
            <View>
                {itemNodes}
            </View>

        );
    }

    click = (index) => {
        this.show = !this.show;
        if (index === 0) {
            const {firstRow} = this.props;
            if (firstRow) {
                firstRow();
            }
        } else if (index === 1) {
            const {secondRow} = this.props;
            if (secondRow) {
                secondRow();
            }
        } else if (index === 2) {
            const {thirdRow} = this.props;
            if (thirdRow) {
                thirdRow();
            }
        }
    }
    render() {
        const {isBottom} = this.props;
        return (
            <View style={{
                position: 'absolute',
            }}>
                {
                    this.show &&
                    <TouchableOpacity style={{
                        width,
                        height,
                        backgroundColor: RkTheme.currentTheme.colors.blackTransparent,
                        justifyContent: 'flex-end',
                    }}
                    onPress={() => { this.show = false; }}>
                        <View style={[{
                            width: getWidth(),
                            backgroundColor: RkTheme.currentTheme.colors.allBackground,
                            alignItems: 'center',
                        }, isBottom ? {paddingBottom: 0} :
                            {paddingBottom: getBottomPixel(20)}]}>
                            {
                                this.renderItemNodes()
                            }
                        </View>
                    </TouchableOpacity>

                }
            </View>

        );
    }
}
