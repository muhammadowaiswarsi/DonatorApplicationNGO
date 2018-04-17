import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
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
                                            <PercentageCircle radius={25} percent={50} color={"#3498db"} ></PercentageCircle>
                                        </View>
                                    </Right>
                                </CardItem>


                                <CardItem>
                                    <Body>
                                        <Text>
                                            {value.requirements} it is required {value.moneyrequirements}
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
                                            <Text>Comments</Text>
                                        </Button>
                                    </Body>


                                    <Right>
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
        signin1: state.root.signin,
        requirmentpost1: state.root.requirmentpost,
        requirmentpostkeys1: state.root.requirmentpostkeys,

    })
}
function mapDispatchToProp(dispatch) {
    return {
        // signout: () => { dispatch(logOutNow()) }
        commentcomponent: (uid, comment) => { dispatch(commentcomponent(uid, comment)) },
        getdata: () => { dispatch(getdatapost()) },

    };
}

export default connect(mapStateToProp, mapDispatchToProp)(notloghome);