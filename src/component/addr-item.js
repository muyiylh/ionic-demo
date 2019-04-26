import React, {Component, Fragment} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {List, Modal, Radio, Icon} from '@ant-design/react-native';
import {MapView} from 'react-native-amap3d';
import PropTypes from 'prop-types';
import ListView from './ListView';
import {deviceHeight, deviceWidth, scaleSize} from '../utils/ScreenUtil';
import isEqual from 'lodash/isEqual'


const Item = List.Item;

class NavBar extends Component {
    render() {
        const {onLeftPress} = this.props;
        return(
            <View style={styles.navbar}>
                <TouchableOpacity onPress={onLeftPress} style={styles.navbarLeft}>
                    <Icon name="left" color="#fff"/>
                    <Text style={styles.navbarTitle}>选择地图</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class AddrItem extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        center: PropTypes.object,
        onMapClick: PropTypes.func,
        pois: PropTypes.array,
        loading: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            center: {},
            isUpdCenter: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState({ address: value });
        }
        if ('center' in nextProps) {
            const {center} = nextProps;
            const {isUpdCenter} = this.state;
            const {center: oldCenter} = this.props;
            console.log('11111', center, oldCenter,isEqual(oldCenter, center))
            if(!isUpdCenter){
                this.setState({ center, isUpdCenter: true });
            }

        }
    }
    showMap = () => {
        this.setState({visible: true});
    };
    onBack = () => {
        this.setState({visible: false});
    };
    /**
     * 地图点击事件
     * @param event
     */
    onMapPress = (e) => {
        const {nativeEvent} = e;
        // console.warn('onMapPress', nativeEvent);

        this.getPois({
            latitude: nativeEvent.latitude,
            longitude: nativeEvent.longitude,
        });
    };
    onPressItem = (address) => {
        this.setState({selectAddress: address});
        let location = address.location.split(',');
        const addr = {
            longitude: parseFloat(location[0]),
            latitude: parseFloat(location[1]),
            address: address.address
        };
        this.setState({address: addr, visible: false});
        this.props.onChange(addr);
    };
    renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.addrItem} onPress={()=>this.onPressItem(item)}>
                <View>
                    <Text style={styles.addrName}>{item.name}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        const {children, pois, loading} = this.props;
        const {address, visible, center} = this.state;
        let extra = '请选择地址';
        if (address instanceof Object) {
            extra = address.address
        }
        // console.log('aaaa', center)
        return (
            <Fragment>
                <Item extra={extra} arrow="horizontal" onClick={this.showMap}>{children}</Item>
                <Modal
                    popup
                    visible={visible}
                    transparent={false}
                    onClose={this.onClose}
                    animationType="slide-up"
                >
                    <View style={styles.wrapper}>
                        <NavBar onLeftPress={this.onBack}/>
                            <MapView
                                style={styles.map}
                                ref={ref => this.mapView = ref}
                                coordinate={{
                                    latitude: center.latitude,
                                    longitude: center.longitude
                                }}
                                onPress={this.onMapPress}
                                zoomLevel={16}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: center.latitude,
                                        longitude: center.longitude,
                                    }}
                                />
                            </MapView>
                        <View style={styles.addrList}>
                            <ListView
                                data={pois}
                                extraData={this.state}
                                keyExtractor={(item, index) => item.id}
                                renderItem={this.renderItem}
                                loading={loading}
                            />
                        </View>
                    </View>
                </Modal>
            </Fragment>
        )
    }
    getPois = ({latitude, longitude}) => {
        const param = {
            key: '4df6d0cb1f0229ff4fcb552c57ed6afb',
            location: `${longitude},${latitude}`,
            offset: 10
        };
        this.mapView.animateTo({
            coordinate: {
                latitude,
                longitude,
            },
        });
        this.setState({
            selectAddress: {},
            center: {latitude,longitude}
        });
        const {onMapClick} = this.props;
        onMapClick && onMapClick(param)
    };
    componentDidMount(){
        const {center, onMapClick} = this.props;
        const param = {
            key: '4df6d0cb1f0229ff4fcb552c57ed6afb',
            location: `${center.longitude},${center.latitude}`,
            offset: 10
        };
        onMapClick && onMapClick(param)
    }
}

const styles = StyleSheet.create({
    wrapper:{
        width: deviceWidth,
        height: deviceHeight,

    },
    navbar: {
        height: 40,
        backgroundColor: '#44cbe6',
        color: '#fff',
    },
    navbarLeft: {
        padding: 10,
        flexDirection: 'row',
        alignItems:'center',
    },
    navbarTitle: {
        color: '#fff',
        fontSize: 16
    },
    map:{ 
        height: 300,
    },
    addrList:{
        flex:1,
        backgroundColor: '#fff',
    },
    addrItem: {
        padding: 10
    },
    addrName: {
        fontSize: scaleSize(34),
        color: '#333'
    },
    address: {
        fontSize: scaleSize(26),
        color: '#999'
    },
});
export default AddrItem;
