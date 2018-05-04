import React, { Component } from 'react';
import {Modal, View, TouchableHighlight, ScrollView, StyleSheet, Alert } from 'react-native';
import CustomHeader from '../header';
import { Input, ActionSheet, Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { commentcomponent, like, getdatapost, logOutNow, SiginNow, dontionmoneyindex } from '../../store/actions'
import { connect } from 'react-redux';
import PercentageCircle from 'react-native-percentage-circle';
import SyncStorage from 'sync-storage';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            money: '',
            donation: '',
            modalVisible: false,
            likestate: 'thumbs-up'
        }
    }

    static navigationOptions = {
        header: title = null
    }


    like = (uid, index) => {
        let name = this.props.signin1.username
        let key = this.props.requirmentpostkeys1[index]
        this.props.like(uid, key, name)
    }


    comment = (uid, index) => {
        let comment = this.props.requirmentpostkeys1[index]
        this.props.commentcomponent(uid, comment)
        console.log(uid)
        console.log(comment)
        Actions.comments()
    }



    componentWillMount() {
        this.props.getdata();
    }

    render() {
        var BUTTONS = ['via Product',
            <Text onPress={() => { this.props.showPopup(), CANCEL_INDEX; }}>via Cheque / Cash</Text>,
            'via Online Payment',
            'On Donate Page', "Cancel"];
        var DESTRUCTIVE_INDEX = 3;
        var CANCEL_INDEX = 4;

        return (
            <View >
                <Container style={{ height: 'auto' }}>

                    {this.props.requirmentpost1 ?
                        this.props.requirmentpost1.map((value, index) => {
                            let donationCircle = Math.floor((value.donation / value.requirementmoney) * 100);
                            let uid = value.uid

                            return <Card key={index} style={styles.container}>
                                <CardItem>
                                    <Left>
                                        <Icon name='contact' />
                                        <Body>
                                            <Text>{value.name}</Text>
                                            <Text note>{value.date}</Text>
                                        </Body>
                                    </Left>

                                    <Right>
                                        <View>
                                            <PercentageCircle radius={25} percent={donationCircle} color={"#3498db"} ></PercentageCircle>
                                        </View>
                                    </Right>
                                </CardItem>


                                <CardItem>
                                    <Body>
                                        <Text>
                                            {value.requirement} it is required {value.requirementmoney}
                                        </Text>
                                    </Body>
                                </CardItem>


                                <CardItem>
                                    <Left>
                                        <Button transparent onPress={() => this.like(uid, index)}>
                                            <Icon name={value && value.likedata && value.likedata[this.props.signin1.uid] ? 'thumbs-down' : 'thumbs-up'} />
                                            <Text>{value.likes}</Text>
                                        </Button>
                                    </Left>


                                    <Body>
                                        <Button transparent style={{ width: '120%', marginLeft: '-5%' }} onPress={() => this.comment(uid, index)}>
                                            <Icon active name="chatbubbles" />
                                            <Text>Comments</Text>
                                        </Button>
                                    </Body>


                                    <Right>
                                        <Button transparent style={{ marginRight: '-12%' }}
                                            onPress={() =>
                                                ActionSheet.show(
                                                    {
                                                        options: BUTTONS,
                                                        cancelButtonIndex: CANCEL_INDEX,
                                                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                                        title: "Please Select Option"
                                                    },
                                                    buttonIndex => {
                                                        this.setState({ clicked: BUTTONS[buttonIndex] })
                                                    }, this.props.dontionmoneyindex(uid, index, value.requirementmoney, value.donation), this.setState({ money: value.moneyrequirements, donatedmoney: value.donation })
                                                )}
                                        >
                                            <Text>Donate</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        })
                        : null
                    }


                </Container>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0, margin: 20, height: 'auto'
    },
});


function mapStateToProp(state) {
    return ({
        signin1: state.root.signin,
        requirmentpost1: state.root.requirmentpost,
        requirmentpostkeys1: state.root.requirmentpostkeys,
        donationmoney1: state.root.donationmoney,
        notification1: state.root.notification

    })
}


function mapDispatchToProp(dispatch) {
    return {
        signout: () => { dispatch(logOutNow()) },
        getdata: () => { dispatch(getdatapost()) },
        like: (uid, key, name) => { dispatch(like(uid, key, name)) },
        commentcomponent: (uid, comment) => { dispatch(commentcomponent(uid, comment)) },
        dontionmoneyindex: (uid, index, requirementmoney, donation) => { dispatch(dontionmoneyindex(uid, index, requirementmoney, donation)) },
        // likethumbs: () => { dispatch(likethumbs()) }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);