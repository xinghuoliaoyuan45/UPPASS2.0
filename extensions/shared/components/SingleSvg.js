import React,{Component} from 'react';
import {Dimensions} from 'react-native';
import Svg,{Path,Circle}from 'react-native-svg';
const { width, height } = Dimensions.get('window');
export default class SingleSvg extends Component{
render(){
    return(
        <Svg height={height * 0.5} width={width * 0.5} viewBox="0 0 100 100">
          <Path
            fill={this.props.pathColor} 
            class="cls-1" 
            d="M8.41,19.22H3.89a2.64,2.64,0,0,1-2.82-2.77V4.53a2.79,2.79,0,0,1,2.79-3H20.15a2.82,2.82,0,0,1,2,.89,2.72,2.72,0,0,1,.75,2V16.41a2.67,2.67,0,0,1-2.78,2.81H15.64L13,21.83a1.39,1.39,0,0,1-.95.4,1.34,1.34,0,0,1-.94-.39ZM3.86,2.66A1.68,1.68,0,0,0,2.17,4.49v12a1.56,1.56,0,0,0,.45,1.2,1.58,1.58,0,0,0,1.24.45h5l.16.16,2.86,2.78a.23.23,0,0,0,.17.07.25.25,0,0,0,.18-.08l3-2.93h5a1.56,1.56,0,0,0,1.19-.45,1.6,1.6,0,0,0,.45-1.23v-12a1.7,1.7,0,0,0-.45-1.27,1.68,1.68,0,0,0-1.23-.53Z"
          />
           <Circle
            fill={this.props.circleColor}  
             class="cls-2"
             cx="19.5" 
             cy="4.5" 
             r="4.5"
          />
        </Svg>
    )
}
}
