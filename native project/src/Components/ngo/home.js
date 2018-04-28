import React, { Component } from 'react';
import { keyboard, View, ScrollView, StyleSheet, Keyboard } from 'react-native';
import CustomHeader from '../header';
import { Fab, Item, Input, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { commentcomponent, getdatapost, requirmentdata, SiginNow, logOutNow } from '../../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
import PercentageCircle from 'react-native-percentage-circle';


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




    comment = (uid, index) => {
        let comment = this.props.requirmentpostkeys1[index]
        this.props.commentcomponent(uid, comment)
        Actions.comments()
    }

    componentWillMount() {
        this.props.getdata()
    }

    render() {

        // console.log(this.props.signin1)

        return (
            <View style={{ flex: 1 }}>

                <Container style={{ flex: 1, height: 'auto' }}>

                    {this.props.requirmentpost1 ?
                        this.props.requirmentpost1.map((value, index) => {
                            let uid = value.uid
                            let donationCircle = Math.floor((value.donation / value.requirementmoney) * 100);
                            return <Card key={index} style={{ flex: 0 }}>
                                <CardItem>
                                    <Left>
                                        <Icon name='contact' style={{fontSize: 40}}/>
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
                                        <Button transparent>
                                            <Text style={{ fontSize: 15 }}>Likes : {value.likes}</Text>
                                        </Button>
                                    </Left>


                                    <Body>
                                        <Button onPress={() => this.comment(uid, index)} transparent>
                                            <Icon active name="chatbubbles" style={{ marginLeft: '25%' }} />
                                            <Text style={{ fontSize: 13 }}>Comments</Text>
                                        </Button>
                                    </Body>

                                </CardItem>

                            </Card>
                        })
                        : null}


                </Container >
            </View >

        )
    }
}


function mapStateToProp(state) {
    return ({
        // signin1: state.root.signin,
        requirmentpost1: state.root.requirmentpost,
        requirmentpostkeys1: state.root.requirmentpostkeys
    })
}


function mapDispatchToProp(dispatch) {
    return {
        signout: () => { dispatch(logOutNow()) },
        getdata: () => { dispatch(getdatapost()) },
        commentcomponent: (uid, comment) => { dispatch(commentcomponent(uid, comment)) },
        requirmentdata: (obj) => { dispatch(requirmentdata(obj)) }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);