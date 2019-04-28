

import React, {Component} from 'react';
import {FlatList} from 'react-native';

export default class KBFlatList extends Component {
    render() {
        return (
            <FlatList {...this.props}/>
        );
    }
}
