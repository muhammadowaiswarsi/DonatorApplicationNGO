import React, { Component } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import { spinner, Spinner } from 'native-base'
import donator from '../img/donation1.jpg';
import { Actions } from 'react-native-router-flux';
import { LOGIN } from '../store/actions';
import { connect } from 'react-redux';

class Front extends Component {
    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        setTimeout(() => {
            this.props.LOGIN();
        }, 2000);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground
                    style={{ width: '100%', height: '100%' }}
                    source={donator}
                >
                    <View style={{ marginTop: '110%' }}>
                        <Spinner color='blue'/>
                        <Text style={{ color: 'blue', alignSelf: 'center', margin: 12, fontSize: 20, fontWeight: 'bold' }}>
                            Please wait...
                    </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };
};
function mapStateToProp(state) {
    return ({
        // users: state.root.users,             
    });
};
function mapDispatchToProp(dispatch) {
    return {
        LOGIN: () => {
            dispatch(LOGIN())
        },
    };
};
const styles = StyleSheet.create({
    spinner: {
        // marginTop: '50%',
        // flex: 1,
        // flexDirection: 'center',
    },
});

export default connect(mapStateToProp, mapDispatchToProp)(Front);