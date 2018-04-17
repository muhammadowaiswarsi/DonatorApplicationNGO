import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Body, Header, Content, Button, Text, Right } from 'native-base';
import { logOutNow } from '../store/actions'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'; // New code


// login = () => {
//     Actions.Signin()
//     alert('login')
// }


class CustomHeader extends Component {
    render() {
        console.log(this.props.signin1)
        return (
            <Header>
                <Button transparent>
                    <Text style={{ fontSize: 19 }}>{this.props.title}</Text>
                </Button>

                <Right>
                    <Button transparent>
                        <Text onPress={this.props.signout} note>Sign Out </Text>
                    </Button>
                </Right>

            </Header>
        );
    };
};
CustomHeader.propTypes = {
    title: PropTypes.string
}


const styles = StyleSheet.create({
    Text: {
        color: "#fff",
        fontSize: 20,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    // Text1: {
    //     color: "#fff",
    //     fontSize: 24,
    //     margin: 8,
    //     alignSelf: 'flex-end',
    //     alignItems: "right"

    // }
})



function mapStateToProp(state) {
    return ({
        signin1: state.root.signin
    })
}


function mapDispatchToProp(dispatch) {
    return {
        signout: () => { dispatch(logOutNow()) },
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(CustomHeader);