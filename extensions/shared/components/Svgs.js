import React, {Component} from 'react';
import SvgUri from 'react-native-svg-uri';
import svgs from '../assets/svg/Svg';
import {TouchableOpacity} from 'react-native';

export class Svgs extends Component<SvgProperties, void> {
    onPress = () => {
        const {onPress} = this.props;
        onPress && onPress();
    }

    render() {
        const {
            icon,
            color,
            size,
            style,
            onPress,
        } = this.props;
        const svgXmlData = svgs[icon];
        if (!svgXmlData) {
            const errMsg = `没有"${icon}"这个icon，请下载最新的icomoo并 npm run build-js`;
            throw new Error(errMsg);
        }
        if (onPress) {
            return (
                <TouchableOpacity onPress={this.onPress} activeOpacity={1}>
                    <SvgUri
                        width={size}
                        height={size}
                        svgXmlData={svgXmlData}
                        fill={color}
                        style={style}/>
                </TouchableOpacity>
            );
        }
        return (
            <SvgUri
                width={size}
                height={size}
                svgXmlData={svgXmlData}
                fill={color}
                style={style}/>
        );
    }
}

