import React, { Component } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import CustomHeader from '../header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { View, Text, Container, Button, Header, Content, Card, Footer, FooterTab, CardItem, Icon, Right } from 'native-base';
import { logOutNow } from '../../store/actions'
import Home from './home';
import Users from './user';
import Contact from './contact';
import About from './about';


class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            home: true,
            Users: false,
            about: false,
            contact: false,
            title: 'Home',
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

    render() {

        const title = ""

        return (

            <Container>
                <CustomHeader title={this.state.title} />
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
        email: state.root.email
    })
}
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Main);