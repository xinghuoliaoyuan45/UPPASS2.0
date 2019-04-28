import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,

} from 'react-native';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {getTitlePixel, getFontPixel, getPixel, Svgs} from '../../shared';

export default class NaviagtionView extends Component {
    render() {
        const {
            title, backClick, renderRight, titleStyle,
        } = this.props;
        return (
            <View style={styles.rootStyle}>
                <StatusBar barStyle='default'/>
                <View style={styles.contentStyle}>
                    {
                        backClick && (
                            <TouchableOpacity accessible={1}
                                onPress={backClick}
                                style={styles.leftContainer}>
                                <Svgs icon='back'
                                    color='#1C1C1C'
                                    width={getPixel(10)}
                                    height={getPixel(17)}/>
                            </TouchableOpacity>
                        )
                    }
                    <Text style={[styles.titleStyle, titleStyle && titleStyle]}>{title}</Text>
                    <View style={styles.rightContainer}>
                        {
                            renderRight && renderRight()
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = RkStyleSheet.create(theme => ({

    rootStyle: {
        height: getTitlePixel(64),
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        color: theme.colors.loginHeader,
    },
    contentStyle: {
        marginTop: getPixel(20),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: getPixel(44),
    },
    leftContainer: {
        paddingLeft: getPixel(25),
        left: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: getFontPixel(18),
        color: '#1C1C1C',
    },
    rightContainer: {
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
    },

}));
