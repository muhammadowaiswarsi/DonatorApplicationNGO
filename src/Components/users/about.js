import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import CustomHeader from '../header';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { SiginNow } from '../../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';


class About extends Component {


    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        // SyncStorage.set('type', 'usersabout');
    }

    render() {
        return (
            <Container>
                <Text style={styles.welcome}>
                    About
            </Text>
            </Container >
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

    })
}
function mapDispatchToProp(dispatch) {
    return {
        signout: () => { dispatch(logOutNow()) }

    };
}

export default connect(mapStateToProp, mapDispatchToProp)(About);