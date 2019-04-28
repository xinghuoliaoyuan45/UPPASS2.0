/** @format */

import {AppRegistry} from 'react-native';
import App from './extensions/Root';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
