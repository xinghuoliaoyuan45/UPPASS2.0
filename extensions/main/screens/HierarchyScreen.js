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
    toastRequestError
} from '../../shared';
import { ext } from '../const';
import { getHierarchy } from '../connect/request';
import HierarchyItem from '../components/HierarchyItem';
import HierarchyItem1 from '../components/HierarchyItem1';

@inject('rootStore')
@observer
class HierarchyScreen extends BaseScreen {

    @observable topList = null;
    @observable bottomList = null;
    @observable bottomList1 = null;
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        const { SegmentedStore } = this.props.rootStore.mainStore;
        this.SegmentedStore = SegmentedStore;
    }

    getHierarchy = () => {
        let param = new URLSearchParams()
        param.append('userId', 4)
        getHierarchy(param).then((res) => {
            let data = get(res, 'data');
            let rspCode = get(data, 'rspCode');
            if (rspCode === '000000') {
                let topItem = [];
                let bottomItem = [];
                let bottomItem1 = [];
                topItem.push(data.data.up_lv1);
                topItem.push(data.data.up_lv2);
                bottomItem.push(...data.data.down_lv1);
                bottomItem1.push(...data.data.down_lv2);
                this.topList = topItem;
                this.bottomList = bottomItem;
                this.bottomList1 = bottomItem1;
            } else {
                toastRequestError(data);
            }
        }).catch();
    }

    mComponentDidMount = () => {
        this.getHierarchy();
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
                    flex: 1,
                    marginTop: getTitlePixel(64)
                }}>
                    <View style={{
                        width: getWidth() - getPixel(40),
                        marginLeft: getPixel(20),
                        marginTop: getPixel(20)
                    }}>
                        <View style={{
                            width: getWidth() - getPixel(40),
                            backgroundColor: '#4674c1',
                            height: getPixel(40),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: getPixel(14),
                            }}>{ext('wodeshouru')}</Text>
                        </View>
                        <View style={{
                            width: getWidth() - getPixel(40),
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            paddingTop: getPixel(10)
                        }}>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>{ext('zongshouru')}</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPP</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPS</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPS</Text>
                            </View>
                        </View>
                        <View style={{
                            width: getWidth() - getPixel(40),
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            marginTop: getPixel(10)
                        }}>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>{ext('yidai')}</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>{get(this.bottomList,'length',0)+ext('ming')}</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPS</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPS</Text>
                            </View>


                        </View>
                        <View style={{
                            width: getWidth() - getPixel(40),
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            marginTop: getPixel(10)
                        }}>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>{ext('erdai')}</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>{get(this.bottomList1,'length',0)+ext('ming')}</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPS</Text>
                            </View>
                            <View style={{
                                width: (getWidth() - getPixel(40)) / 4 - getPixel(10),
                                backgroundColor: '#4674c1',
                                height: getPixel(40),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: getPixel(14),
                                }}>0UPS</Text>
                            </View>


                        </View>
                    </View>
                    <View style={{
                        marginTop: getPixel(37),
                        width: getPixel(103),
                        height: getPixel(34),
                        borderTopRightRadius: getPixel(5),
                        borderBottomRightRadius: getPixel(5),
                        backgroundColor: '#e59b2b',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(16),
                            fontWeight: 'bold'
                        }}>{ext('shangjiynghu')}</Text>
                    </View>
                    <View
                        style={{
                            width: getWidth(),
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: getPixel(47),
                        }}>
                        <View style={{
                            width: getPixel(110),
                            height: getPixel(47),
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>

                        </View>
                        <View style={{
                            width: getPixel(110),
                            height: getPixel(47),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'rgba(0,0,0,0.6)',
                                marginLeft: getPixel(23)
                            }}>{ext('yonghuming')}</Text>
                        </View>
                        <View style={{
                            width: getWidth() - getPixel(220),
                            height: getPixel(47),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'rgba(0,0,0,0.6)',
                                marginLeft: getPixel(23)
                            }}>{ext('shijian')}</Text>
                        </View>
                    </View>
                    {this.topList ?
                        <HierarchyItem topList={this.topList} /> : null}

                    <View style={{
                        marginTop: getPixel(42),
                        width: getPixel(103),
                        height: getPixel(34),
                        borderTopRightRadius: getPixel(5),
                        borderBottomRightRadius: getPixel(5),
                        backgroundColor: '#e59b2b',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: getPixel(16),
                            fontWeight: 'bold'
                        }}>{ext('xiajiyonghu')}</Text>
                    </View>
                    <View
                        style={{
                            width: getWidth(),
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: getPixel(47),
                        }}>
                        <View style={{
                            width: getPixel(110),
                            height: getPixel(47),
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>

                        </View>
                        <View style={{
                            width: getPixel(110),
                            height: getPixel(47),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'rgba(0,0,0,0.6)',
                                marginLeft: getPixel(23)
                            }}>{ext('yonghuming')}</Text>
                        </View>
                        <View style={{
                            width: getWidth() - getPixel(220),
                            height: getPixel(47),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: getPixel(14),
                                color: 'rgba(0,0,0,0.6)',
                                marginLeft: getPixel(23)
                            }}>{ext('shijian')}</Text>
                        </View>
                    </View>
                    {this.bottomList && this.bottomList1 ?
                        <HierarchyItem1 bottomList={this.bottomList}
                            bottomList1={this.bottomList1} /> : null}
                </ScrollView>
                <BaseHeader linearColor={['#022047', '#022047']} leftType='back' leftPress={this.goBack}
                    title={ext('hierarchy')} />
            </LinearGradient>
        );
    }
}

export default HierarchyScreen;
