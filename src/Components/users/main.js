import React, { Component } from 'react';
import { Keyboard, TextInput, BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import CustomHeader from '../header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { View, Text, Container, Button, Header, Content, Card, Footer, FooterTab, CardItem, Icon, Right, Left } from 'native-base';
import { logOutNow, donationmoney } from '../../store/actions'
import Home from './home';
import Ngo from './ngo';
import Contact from './contact';
import About from './about';
import PopupDialog, { slideAnimation } from 'react-native-popup-dialog';


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: true,
            ngo: false,
            about: false,
            contact: false,
            title: 'Home',
            donation: ''
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

    cancel = () => {
        this.popupDialog.dismiss();
        Keyboard.dismiss()
    }

    save = () => {
        let index = this.props.donationmoneyindex1.index
        let pushkey = this.props.requirmentpostkeys1[index]
        let uid = this.props.donationmoneyindex1.uid
        let donation1 = this.state.donation
        console.log(index)
        console.log(this.props.requirmentpostkeys1)
        let currentuser = this.props.signin1.username
        let currentuseruid = this.props.signin1.uid
        if (donation1 !== null) {
            this.props.donationmoney(uid, pushkey, donation1, currentuser, currentuseruid)
        } else {
            alert('Please Donate Some money')
        }
        this.popupDialog.dismiss();
        Keyboard.dismiss()
        this.setState({
            donation: ''
        })
    }


    logOut() {
        this.props.logOutNow()
    }


    showPopup = () => {
        this.popupDialog.show()
        // alert('hello')
    };


    render() {
        console.log(this.props.requirmentpostkeys1)
        return (
            <Container>
                <CustomHeader title={this.state.title} />

                <PopupDialog width={'70%'} height={'35%'}
                    slideFrom='left'
                    dialogAnimation={slideAnimation}
                    dialogStyle={{ borderRadius: -1, marginBottom: 220 }}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Selected Cash Option</Text>
                        <Text style={{ marginTop: '5%', textAlign: 'center' }}>estimated cost 6000, please enter your donation amount</Text>
                        <TextInput style={{ marginTop: '10%' }} value={this.state.donation} keyboardType='numeric' name='donation' placeholder='please enter the amount' onChangeText={donation => this.setState({ donation: donation.trim() })} />
                        <Right>
                            <Button style={{ marginLeft: '65%' }} transparent={true} onPress={this.save}><Text style={{ color: 'black' }}>Save</Text></Button>
                        </Right>
                        <Left>
                            <Button transparent={true} onPress={this.cancel}><Text style={{ color: 'black' }}>Cancel</Text></Button>
                        </Left>
                    </View>
                </PopupDialog>

                <Content>
                    {
                        this.state.home ? <Home showPopup={this.showPopup} /> : null
                    }
                    {
                        this.state.ngo ? <Ngo /> : null
                    }
                    {
                        this.state.about ? <About /> : null
                    }
                    {
                        this.state.contact ? < Contact /> : null
                    }


                </Content>

                <Footer style={{ backgroundColor: '#5CC9FF' }}>
                    <FooterTab>
                        <Button vertical active={this.state.home} onPress={() => this.setState({ title: 'Home', contact: false, home: true, ngo: false, about: false })}>
                            <Icon name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical active={this.state.ngo} onPress={() => this.setState({ title: 'NGOs', contact: false, home: false, ngo: true, about: false })}>
                            <Icon name="contacts" />
                            <Text>NGO's</Text>
                        </Button>
                        <Button vertical active={this.state.about} onPress={() => this.setState({ title: 'About', contact: false, home: false, ngo: false, about: true })}>
                            <Icon name="navigate" />
                            <Text>About</Text>
                        </Button>
                        <Button vertical active={this.state.contact} onPress={() => this.setState({ title: 'Contact', contact: true, home: false, ngo: false, about: false })}>
                            <Icon name="person" />
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    wellcome: {
        fontSize: 18,
        marginLeft: 10
    }
});


function mapStateToProp(state) {
    return ({
        signin1: state.root.signin,
        email: state.root.email,
        donationmoneyindex1: state.root.donationmoneyindex,
        requirmentpostkeys1: state.root.requirmentpostkeys
    })
}
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        },
        donationmoney: (uid, pushkey, donation1, currentuser, currentuseruid) => {
            dispatch(donationmoney(uid, pushkey, donation1, currentuser, currentuseruid))
        }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Main);