import React, { Component } from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Keyboard,
    ListView
} from 'react-native';
import { Button, Text, Container, Spinner, Input, Item, Header, Content, ListItem, CheckBox, Body, Row } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { logOutNow, SignupNow } from '../store/actions'
import CustomHeader from './header';
// import { Link } from 'react-router-native';
import SyncStorage from 'sync-storage';
// import history from '../history'


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            contact: "",
            donator: true,
            ngo: false,
            flag: false,
        }
    }

    static navigationOptions = {
        header: null
    }


    signup = () => {
        const { username, email, password, contact, donator, ngo } = this.state
        if (username, email, password, contact, donator, ngo) {
            this.setState({
                flag: false
            })
            const obj = {
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                contact: this.state.contact,
                donator: this.state.donator,
                ngo: this.state.ngo
            }
            console.log(obj)
            this.props.SignupNow(obj)
            setTimeout(() => {
                this.setState({
                    flag: true
                })
            }, 5000)
        } else {
            alert('Plz Fill Up Form Correctly')
        }
    }


    Logout = () => {
        this.props.logout()
    }

    // componentWillMount() {
    //     SyncStorage.set('type', 'signup');
    // }

    render() {
        console.log(this.props.signuperror1)
        // const title = "SignUp"
        return (
            <Container style={{ flex: 1 }}>
                <ScrollView>

                    {/* <Header /> */}

                    {this.state.flag ?
                        <View style={styles.container} >
                            <Text style={styles.welcome}>
                                Sign Up
                            </Text>
                            <Item style={styles.item} regular>
                                <Input placeholder='Your Name' style={styles.input} onChangeText={username => this.setState({ username: username.trim() })} />
                            </Item>

                            <Item style={styles.item} regular>
                                <Input placeholder='Email Address' style={styles.input} onChangeText={email => this.setState({ email: email.trim() })} />
                            </Item>

                            <Item style={styles.item} regular>
                                <Input placeholder='Password' style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password: password.trim() })} />
                            </Item>

                            <Item style={styles.item} regular>
                                <Input placeholder='Contact Number' keyboardType='numeric' style={styles.input} onChangeText={contact => this.setState({ contact: contact.trim() })} />
                            </Item>


                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}> User : </Text>
                                <Text>Donator</Text>
                                <CheckBox onPress={() => this.setState({ donator: true, ngo: false })} checked={this.state.donator} />
                                <Text style={{ marginLeft: '5%' }}>NGO</Text>
                                <CheckBox onPress={() => this.setState({ ngo: true, donator: false })} checked={this.state.ngo} />
                            </View>


                            <Text style={{ color: 'red' }}>{this.props.signuperror1}</Text>

                            <Button style={{ marginLeft: '40%', marginTop: '5%' }} onPress={this.signup} primary={true}>
                                <Text>SignUp
                        </Text>
                            </Button >

                            <Text onPress={() => Actions.Signin()} style={{ fontSize: 20, textDecorationLine: "underline", marginTop: '5%' }}>
                                You have account to Login!!
                            </Text>
                        </View >
                        :

                        <Spinner style={{ margin: '50%' }} color='blue' />
                    }
                </ScrollView >
            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 175,
        margin: 8,
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 30,
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
        height: 40,
    },
    item: {
        width: "80%",
        marginBottom: 30,
        borderColor: 'blue',
        borderWidth: 5,
        borderRadius: 7,
    },
    btn: {
        width: 200,
        height: 50,

    },
    flatlist: {
        flex: 1,
        paddingTop: 22
    },
    item12: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    // loader: {
    //     flex: 1,
    //     justifyContent: 'center'
    // }
});


function mapStateToProp(state) {
    return ({
        signuperror1: state.root.signuperror
    })
}


function mapDispatchToProp(dispatch) {
    return {
        SignupNow: (obj) => {
            dispatch(SignupNow(obj))
        },
        logout: () => {
            dispatch(logOutNow())
        }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);