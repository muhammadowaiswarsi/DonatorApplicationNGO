import React, { Component } from 'react';
import {
    BackHandler, ScrollView, ActivityIndicator, View, Image, StyleSheet
} from 'react-native';
import CustomHeader from './header';
// import { Content, Input, Item } from 'native-base';
import { Right, Container, Text, Input, Item, Spinner, Header, Content, Button, ListItem, CheckBox, Body } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { SiginNow } from '../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
// import history from '../history'
// import { Link } from 'react-router-native';


class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            flag: true
        }
    }
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
        });
    }

    signin = () => {
        if (this.state.email === '' || this.state.password) {
            alert('Please Write Correct Email or Password')
        } else {
            this.setState({
                flag: false
            })
            const user = {
                email: this.state.email,
                password: this.state.password,
            }
            this.props.SiginNow(user)
            setTimeout(() => {
                this.setState({
                    flag: true
                })
            }, 5000)
        }
    }


    render() {
        return (
            <Container style={{ flex: 1 }}>
                {this.state.flag ?
                    <View style={styles.container}>

                        <Text style={styles.welcome}>
                            Signin
                        </Text>
                        <Item style={styles.item} regular>
                            <Input placeholder='Email Address' keyboardType='email-address' onChangeText={email => this.setState({ email })} style={styles.input} />
                        </Item>

                        <Item style={styles.item} regular>
                            <Input placeholder='Password' onChangeText={password => this.setState({ password })} style={styles.input} secureTextEntry={true}
                            />
                        </Item>

                        <Text>{this.props.signinerror1}</Text>

                        <View>
                            <Button onPress={this.signin} primary={true}>
                                <Text>
                                    Sign In
                                </Text>
                            </Button >
                        </View>

                        <Text onPress={() => Actions.Signup()} style={{ fontSize: 20, textDecorationLine: "underline", marginTop: '4%' }}>
                            For Signup Click Here!!
                            </Text>
                    </View >

                    :

                    <Spinner style={{ margin: '50%' }} color='blue' />

                }

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
        paddingBottom: 255,
        paddingTop : '20%' 
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
        borderColor: 'blue',
        borderWidth: 5,
        borderRadius: 7,
    }
});

function mapStateToProp(state) {
    return ({
        signinerror1: state.root.signinerror
    })
}
function mapDispatchToProp(dispatch) {
    return {
        SiginNow: (name) => {
            dispatch(SiginNow(name))
        }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);