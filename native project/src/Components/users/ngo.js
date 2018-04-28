import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CustomHeader from '../header';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { ngosdataget, SiginNow } from '../../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';

class Ngo extends Component {

    componentWillMount() {
        this.props.ngosdata()
        console.log('cmpntwlmnt')
    }

    static navigationOptions = {
        header: null
    }


    componentWillMount() {
        SyncStorage.set('type', 'usersngo');
        this.props.ngosdata()
    }


    view = () => {
        console.log('view')
    }


    render() {
        // const title = "NGO's"
        console.log(this.props.ngodata1)
        return (

            <View>

                {
                    this.props.ngodata1 ?
                        this.props.ngodata1.map((value, index) => {
                            return <Card key={index} style={{ flex: 0 }}>
                                <CardItem >
                                    <Left>
                                        <Icon active name="contact" />
                                        <Body>
                                            <Text>{value.username}</Text>
                                            <Text note>{value.contact}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        }) : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 255
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
        fontFamily: "serif",
        marginBottom: 25,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        height: 50,

    },
    item: {
        width: "80%",
        marginBottom: 30,
        borderColor: '#00d084',
        borderWidth: 5,
        borderRadius: 7,


    }

});

function mapStateToProp(state) {
    return ({
        ngodata1: state.root.ngodata
    })
}
function mapDispatchToProp(dispatch) {
    return {
        ngosdata: () => { dispatch(ngosdataget()) },
        signout: () => { dispatch(logOutNow()) }

    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Ngo);