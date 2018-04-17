import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import CustomHeader from '../header';
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { commentcomponent, like, getdatapost, logOutNow, SiginNow } from '../../store/actions'
import PercentageCircle from 'react-native-percentage-circle';
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';


class Home extends Component {


    static navigationOptions = {
        header: title = null
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
        // console.log(this.props.requirmentpostkeys1)
        return (
            <View style={{ flex: 1 }}>

                <Container style={{ flex: 1, height: 'auto' }}>

                    {this.props.requirmentpost1 ?
                        this.props.requirmentpost1.map((value, index) => {
                            let uid = value.uid
                            let percentcircle = (value.moneyrequirements * 1000 / value.moneyrequirements)
                            console.log(percentcircle)
                            return <Card key={index} style={{ flex: 0 }}>
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
                                            <PercentageCircle radius={25} percent={percentcircle} color={"#3498db"} ></PercentageCircle>
                                        </View>
                                    </Right>
                                </CardItem>


                                <CardItem>
                                    <Body>
                                        <Text>
                                            {value.requirements}
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
                                        <Button onPress={() => this.comment(uid, index)} transparent style={{ width: '120%' }}>
                                            <Icon active name="chatbubbles" />
                                            <Text>Comments</Text>
                                        </Button>
                                    </Body>

                                    <Right>
                                    </Right>

                                </CardItem>

                            </Card>
                        })
                        : null}

                </Container >
            </View>
        )
    }
}


function mapStateToProp(state) {
    return ({
        signin1: state.root.signin,
        requirmentpost1: state.root.requirmentpost,
        requirmentpostkeys1: state.root.requirmentpostkeys
    })
}
function mapDispatchToProp(dispatch) {
    return {
        signout: () => { dispatch(logOutNow()) },
        getdata: () => { dispatch(getdatapost()) },
        // like: (uid, key, currentuser) => { dispatch(like(uid, key, currentuser)) },
        commentcomponent: (uid, comment) => { dispatch(commentcomponent(uid, comment)) }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);