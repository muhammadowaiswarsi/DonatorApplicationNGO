import React, { Component } from 'react';
import { TextInput, BackHandler, StyleSheet, Keyboard } from 'react-native';
import CustomHeader from '../header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Left, Fab, View, Text, Container, Button, Header, Content, Card, Footer, FooterTab, CardItem, Icon, Right } from 'native-base';
import { logOutNow, requirmentdata } from '../../store/actions'
import Home from './home';
import Users from './user';
import Contact from './contact';
import About from './about';
import PopupDialog, { slideAnimation } from 'react-native-popup-dialog';



class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: true,
            Users: false,
            about: false,
            contact: false,
            title: 'Home',
            requirementmoney: '',
            requirement: ''
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


    logOut() {
        this.props.logOutNow()
    }

    cancel = () => {
        this.popupDialog.dismiss();
        Keyboard.dismiss()
    }

    save = () => {
        this.popupDialog.dismiss();
        Keyboard.dismiss()
        if (this.state.requirement === '' || this.state.requirementmoney === '') {
            alert('Please Write requirements Which You Need')
        }
        else {
            let obj = {
                requirement: this.state.requirement,
                uid: this.props.signin1.uid,
                username: this.props.signin1.username,
                requirementmoney: this.state.requirementmoney
            }
            this.props.requirmentdata(obj);
            this.setState({ requirement: "", requirementmoney: '' });
        }
    }


    render() {
        // console.log(this.props.signin1)
        return (

            <Container>
                <CustomHeader title={this.state.title} />

                <PopupDialog width={'70%'} height={'33%'}
                    slideFrom='left'
                    dialogAnimation={slideAnimation}
                    dialogStyle={{ borderRadius: -1, marginBottom: 220 }}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Post From Here...</Text>
                        <TextInput style={{ marginTop: '3%' }} value={this.state.requirement} name='requirement' placeholder='Write Requirements You Need' onChangeText={requirement => this.setState({ requirement: requirement })} />
                        <TextInput style={{ marginTop: '3%' }} keyboardType='numeric' value={this.state.requirementmoney} name='requirementmoney' placeholder='Write Money You Need' onChangeText={requirementmoney => this.setState({ requirementmoney: requirementmoney.trim() })} />
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
                        this.state.home ? <Home /> : null
                    }
                    {
                        this.state.Users ? <Users /> : null
                    }
                    {
                        this.state.about ? <About /> : null
                    }
                    {
                        this.state.contact ? < Contact /> : null
                    }


                </Content>

                <View>
                    <Fab
                        direction="up"
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.popupDialog.show()}>
                        <Icon name="add" />
                    </Fab>
                </View>



                <Footer style={{ backgroundColor: '#5CC9FF' }}>
                    <FooterTab>
                        <Button vertical active={this.state.home} onPress={() => this.setState({ title: 'Home', contact: false, home: true, Users: false, about: false })}>
                            <Icon name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical active={this.state.Users} onPress={() => this.setState({ title: 'Users', contact: false, home: false, Users: true, about: false })}>
                            <Icon name="contacts" />
                            <Text>Users</Text>
                        </Button>
                        <Button vertical active={this.state.about} onPress={() => this.setState({ title: 'About', contact: false, home: false, Users: false, about: true })}>
                            <Icon name="navigate" />
                            <Text>About</Text>
                        </Button>
                        <Button vertical active={this.state.contact} onPress={() => this.setState({ title: 'Contact', contact: true, home: false, Users: false, about: false })}>
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
        userName: state.root.userName,
        email: state.root.email,
        signin1: state.root.signin
    })
}
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        },
        requirmentdata: (obj) => { dispatch(requirmentdata(obj)) },
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Main);