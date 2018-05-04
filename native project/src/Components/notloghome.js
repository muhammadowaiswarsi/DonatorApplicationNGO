import React, { Component } from 'react';
import { BackHandler, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Input, Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux'; // New code
import { getdatapost, commentcomponent } from '../store/actions'
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
import PercentageCircle from 'react-native-percentage-circle';


class notloghome extends Component {


    static navigationOptions = {
        header: null
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp();
        });
        this.props.getdata()
    }


    comment = (uid, index) => {
        let comment = this.props.requirmentpostkeys1[index]
        this.props.commentcomponent(uid, comment)
        console.log(uid)
        console.log(comment)
        Actions.comments()
    }


    render() {
        console.log(this.props.requirmentpost1)

        return (
            <View>

                <View>
                    <Header>
                        <Button transparent>
                            <Text style={{ fontSize: 19 }}>Home</Text>
                        </Button>

                        <Right>
                            <Button transparent>
                                <Text onPress={() => Actions.Signin()} note>Sign In</Text>
                            </Button>
                        </Right>
                    </Header>
                </View>


                <ScrollView>

                    <View style={{ marginBottom: '17%' }}>
                        {this.props.requirmentpost1.map((value, index) => {
                            let uid = value.uid
                            let donationCircle = Math.floor((value.donation / value.requirementmoney) * 100);
                            return <Card key={index} style={styles.container}>
                                <CardItem>
                                    <Left>
                                        <Icon name='contact' style={{ fontSize: 40 }} />
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
                                        <Button transparent onPress={() => alert('Please Login')}>
                                            <Icon name="thumbs-up" />
                                            <Text>{value.likes}</Text>
                                        </Button>
                                    </Left>


                                    <Body>
                                        <Button transparent style={{ width: '120%', marginLeft: '-10%' }} onPress={() => this.comment(uid, index)}>
                                            <Icon name="chatbubbles" />
                                            <Text style={{ marginRight: '8%' }}>Comments</Text>
                                        </Button>
                                    </Body>


                                    <Right style={{ marginRight: '-5%' }}>
                                        <Button transparent onPress={() => alert('Please Login')}>
                                            <Text>
                                                Donate
                                        </Text>
                                        </Button>
                                    </Right>
                                </CardItem>

                            </Card>
                        })
                        }
                    </View>


                </ScrollView>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 0, margin: 20, height: 'auto',
    },
});


function mapStateToProp(state) {
    return ({
        requirmentpost1: state.root.requirmentpost,
        requirmentpostkeys1: state.root.requirmentpostkeys,

    })
}
function mapDispatchToProp(dispatch) {
    return {
        commentcomponent: (uid, comment) => { dispatch(commentcomponent(uid, comment)) },
        getdata: () => { dispatch(getdatapost()) },

    };
}

export default connect(mapStateToProp, mapDispatchToProp)(notloghome);