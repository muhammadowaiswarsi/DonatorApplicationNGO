import React, { Component } from 'react';
import { View, Image, StyleSheet, } from 'react-native';
import CustomHeader from '../header';
// import { Content, Input, Item } from 'native-base';
import { Left, Right, Icon, Container, Button, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { logOutNow, getusers, ngosdataget, SiginNow } from '../../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';

class Users extends Component {

    componentWillMount() {
        this.props.ngosdata()
        console.log('cmpntwlmnt')
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        SyncStorage.set('type', 'ngousers');
        this.props.users()
    }


    view = () => {
        console.log('view')
    }

    render() {
        console.log(this.props.userdata1)
        return (
            <Container>

                {this.props.userdata1 ?
                    this.props.userdata1.map((value, index) => {
                        return <Card key={index} style={{ flex: 0 }}>
                            <CardItem>
                                <Left>
                                    <Icon name='contact' />
                                    <Body>
                                        <Text>{value.username}</Text>
                                        <Text note>{value.contact}</Text>
                                    </Body>
                                    <Button onPress={this.view}>
                                        <Text> View</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                        </Card>
                    })
                    : null}
            </Container>
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
        userdata1: state.root.userdata
    })
}
function mapDispatchToProp(dispatch) {
    return {
        ngosdata: () => { dispatch(ngosdataget()) },
        signout: () => { dispatch(logOutNow()) },
        users: () => { dispatch(getusers()) }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Users);