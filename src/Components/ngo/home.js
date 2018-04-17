import React, { Component } from 'react';
import { keyboard, View, ScrollView, StyleSheet, Keyboard } from 'react-native';
import CustomHeader from '../header';
import { Item, Input, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { getdatapost, requirmentdata, SiginNow, logOutNow } from '../../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
import Post from './post'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            requirments: '',
            moneyrequirments: ''
        }
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
    }

    requirmentdata = () => {
        Keyboard.dismiss();
        let obj = {
            requirements: this.state.requirments,
            uid: this.props.signin1,
            moneyrequirments: this.state.moneyrequirments
        }
        console.log(obj)
        this.props.requirmentdata(obj);
        this.setState({ requirments: "", moneyrequirments: '' });
    }




    render() {
        // console.log(this.props.requirmentpost1)
        // console.log(this.props.signin1)
        return (
            <View>

                <View>
                    <CardItem>
                        <Item>
                            <Icon name='paper' />
                            <Input value={this.state.requirments} style={{ width: '80%' }} name='requirmentinput' placeholder='Type Requirment' onChangeText={requirments => this.setState({ requirments: requirments })} />
                            <Input value={this.state.moneyrequirments} keyboardType='numeric' name='requirmentmoneyinput' placeholder='Money' onChangeText={moneyrequirments => this.setState({ moneyrequirments: moneyrequirments.trim() })} />
                            <Icon name='checkmark-circle' onPress={this.requirmentdata} />
                        </Item>
                    </CardItem>
                </View>

                <ScrollView>
                    <Post />
                </ScrollView>

            </View >

        )
    }
}


function mapStateToProp(state) {
    return ({
        signin1: state.root.signin
    })
}


function mapDispatchToProp(dispatch) {
    return {
        signout: () => { dispatch(logOutNow()) },
        requirmentdata: (obj) => { dispatch(requirmentdata(obj)) },
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);