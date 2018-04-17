import React, { Component } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import CustomHeader from './header';
import { connect } from 'react-redux';
import { getcomments, commentsend } from '../store/actions';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Button, Footer, FooterTab, Item, Input } from 'native-base';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comment: '',
        };
    };

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        let uid = this.props.postcomment1.uid;
        let pushkey = this.props.postcomment1.pushkey
        this.props.getcomments(uid, pushkey)
    };


    sendComment = () => {
        if (this.props.signin1 === '') {
            alert('Please Login')
        } else {
            if (this.state.comment === null) {
                alert('Please Write Something')
            } else {
                let comment = this.state.comment
                this.setState({
                    comment: ''
                })
                let data = this.props.signin1
                let uid = this.props.postcomment1.uid
                let pushkey = this.props.postcomment1.pushkey
                this.props.commentsend(uid, pushkey, comment, data)
                Keyboard.dismiss()
            }
        }
    }


    render() {
        console.log(this.props.commentdata1)
        return (
            <Container>
                <Content>

                    <Header style={{ height: 60, width: '100%' }}>
                        <Left>
                            <Button style={{ width: '140%' }} transparent>
                                <Text style={{ fontSize: 18 }}>Comments</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Text onPress={() => this.props.navigation.goBack()} style={{ fontSize: 18 }}>x</Text>
                            </Button>
                        </Right>
                    </Header>

                    {this.props.commentcomp1 ?
                        <Content>
                            <Text style={styles.BodyText}>{this.props.commentcomp1.requirements}-</Text>
                        </Content>
                        : null}
                    {
                        this.props.commentdata1 ?
                            this.props.commentdata1.map((value, index) => {
                                return <Content key={index}>
                                    <List>
                                        <ListItem avatar>
                                            <Icon style={{ fontSize: 40 }} name='contact' />
                                            <Body style={{ minHeight: 70, height: 'auto' }}>
                                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                                                    {value.username}
                                                </Text>
                                                <Text>
                                                    {value.comment}
                                                </Text>
                                            </Body>

                                        </ListItem>
                                    </List>
                                </Content>
                            }) : null
                    }
                </Content>
                <Item style={{ width: '100%', height: 70 }} regular>
                    <Input
                        numberOfLines={2} value={this.state.comment}
                        onChangeText={comment => this.setState({ comment: comment })}
                        placeholder='please comment...'
                    />
                    <Text onPress={this.sendComment} style={{ marginRight: 10 }}>
                        SEND
                            <Icon name='paper-plane' />
                    </Text>
                </Item>
            </Container>
        );
    };
};

function mapStateToProp(state) {
    return ({
        commentcomp1: state.root.commentcomp,
        currentuser1: state.root.currentuser,
        postcomment1: state.root.postcomment,
        signin1: state.root.signin,
        commentdata1: state.root.commentdata
    });
};
function mapDispatchToProp(dispatch) {
    return {
        commentsend: (uid, pushkey, comment, data) => { dispatch(commentsend(uid, pushkey, comment, data)) },
        getcomments: (uid, pushkey) => { dispatch(getcomments(uid, pushkey)) }
    };
};

const styles = StyleSheet.create({
    Text: {
        fontSize: 18,
        margin: 5,
        marginLeft: 2,
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 10,
        fontSize: 18,
    },
    BodyText: {
        color: 'rgba(0,0,0,0.5)',
        margin: 12,
    },
});

export default connect(mapStateToProp, mapDispatchToProp)(Comments);